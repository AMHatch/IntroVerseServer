import { Router, Request, Response } from 'express';
const db = require("../models");
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

const router: Router = Router();

router.get('/route', async (req: Request, res: Response): Promise<Response> => {
    return res.send("Hello World!");
}
);

module.exports = router