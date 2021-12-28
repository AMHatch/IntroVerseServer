import { Router, Request, Response } from 'express';
import db from '../models'
import Sequelize from "sequelize"
const Op = Sequelize.Op;

const router: Router = Router();

router.get('/route', async (req: Request, res: Response): Promise<Response> => {
    let result: object = await db.users.findAll()
    return res.send(result);
}
);

router.post('/registration', async (req,res) => {
        let {email, password, introvertRating, homeCity, state} = req.body
        await db.users.create({
            email: email, 
            password: password, 
            roleName: "Basic",
            introvertRating: 0,
            homeCity: homeCity,
            state: state
        })
        res.redirect('/route')
});

module.exports = router