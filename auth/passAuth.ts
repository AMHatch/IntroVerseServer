import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import {ExtractJwt, Strategy as JwtStrategy, VerifiedCallback} from "passport-jwt";
var secret = process.env.SECRETS!
import db from "../models";

//local strategy
let options  = {usernameField: 'email'}
export const localLogin = new LocalStrategy(options, async (email, password, done) => {
    try{
        //check to see if email is in our db
        let records = await db.users.findAll({where: {email}})
        if(records !== null){
            //email found
            // check password
            bcrypt.compare(password, records[0].password, (err, isMatch)=>{
                //check if error
                if(err){
                    return done(err)
                }
                //mismatch passwords
                if(!isMatch){
                    return done(null, false)
                }
                //valid user - send back user on session
                return done(null, records[0])
            })
        } else {
            //no email found
            //exit with error
            return done(null, false)
        }
    } catch(err){
        return done(err)
    }
})

//jwt strategy

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
    passReqToCallback: true
}

export const jwtLogin = new JwtStrategy(jwtOptions, async (req: Request, payload: any, done: VerifiedCallback) => {
    //payload.sub == primary key
    try {
        //check if user in db
        let user = await db.users.findByPk(payload.sub)
        if(user){
            //success
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch(err){
        //error in reading db
        return done(err)
    }
})
