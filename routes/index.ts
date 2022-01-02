import { Router, Request, Response } from 'express';
import db from '../models'
import Sequelize from "sequelize"
import passport from "passport"
import { secrets } from '../secrets';
import jwt from "jwt-simple"
import bcrypt from "bcryptjs";
import { UserAttributes } from '../models/users';
import { localLogin, jwtLogin } from '../auth/passAuth';
const Op = Sequelize.Op;
const router: Router = Router();

passport.use(localLogin)
passport.use(jwtLogin)
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
        let {email, password, homeCity, state} = req.body
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
                    state: state
                })
                let jwtToken = token(user)
                console.log(jwtToken)
                return res.json({token: jwtToken})
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
    res.json({token: token(user)})
})

module.exports = router