import {Request, Response, NextFunction} from "express";
import passport from "../config/passportConfig";
import {createUser} from "../users/local-users.repository";
import {SignUpSchema} from "../models/schemas";
import bcrypt from "bcrypt";

export const postLogin = passport.authenticate('local', {
    failureMessage: true,
    successRedirect: "/",
    failureRedirect: "/login"
})

export const postSignup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {username, password} = await SignUpSchema.parseAsync(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(username, hashedPassword);
        
        res.redirect("/");
    } catch (error) {
        return next(error)
    }
}
