import { Router, Request, Response } from 'express';
import db from '../models'
import Sequelize from "sequelize"
import passport from "passport"
import { secrets } from '../secrets';
import jwt from "jwt-simple"
import bcrypt from "bcryptjs";
import { UserAttributes } from '../models/users';
const Op = Sequelize.Op;
const router: Router = Router();
require('../auth/passAuth');


router.use(passport.initialize());

//middleware function - gatekeeper
let requireLogin = passport.authenticate('local', {session: false})
let requireJwt = passport.authenticate('jwt', {session: false})

type JwtPayload = {
    sub: number;
    iat: number;
}
const token = (user: UserAttributes) => {
    let timestamp = new Date().getTime(); //current time
    return jwt.encode({sub:user.id, iat:timestamp}, secrets.secrets) //encode take {data} and secret
}

router.get('/route', async (req: Request, res: Response): Promise<Response> => {
    let result = await db.users.findAll()
    return res.json(result);
}
);

router.post('/register', async (req: Request, res: Response) => {
    console.log('in register server')
        let {email, password, homeCity, homeState, username} = req.body
        try{
            //determine if email already exists in our db
            let search = await db.users.findAll({where: {email}})
            if(search.length === 0){
                //email wasnt found in db
                //encrypt password
                password = bcrypt.hashSync(password, 8)
                //create new record
                let user = await db.users.create({
                    email: email, 
                    password: password, 
                    roleName: "Basic",
                    introvertRating: 0,
                    homeCity: homeCity,
                    state: homeState,
                    username: username
                })
                let jwtToken = token(user)
                return res.json({
                    token: jwtToken,
                    username: user.username,
                    introvertRating: user.introvertRating,
                    homeCity: user.homeCity,
                    homeState: user.state,
                })
            } else {
                //email was found
    
                //return error with a status code
                return res.status(422).json({error: 'Email already exists'})
            }
        }catch(err){
            console.log(err);
            return res.status(423).json({error: `Can't access database`})
        }
});

router.post('/login', requireLogin, (req: Request, res: Response) => {
    let user =  req.user as UserAttributes
    return res.json({
        token: token(user),
        username: user.username,
        introvertRating: user.introvertRating,
        homeCity: user.homeCity,
        homeState: user.state,
    })
})

router.get('/protected', requireJwt, (req: Request, res: Response) => {
    return res.json({isValid: true})
})

router.put('/introvertrating/:introvertRating', requireJwt, async (req: Request, res: Response) => {
    let introvertRating: number = parseInt(req.params.introvertRating)
    let { id } = req.user as UserAttributes
    await db.users.update({introvertRating: introvertRating}, {where: {id: id}})
})

module.exports = router