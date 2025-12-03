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

export const logout = async (req:Request, res:Response, next:NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.session.destroy((err) => {
            if (err) return next(err);
            res.clearCookie("connect.sid");
            res.redirect("/")
        })
    })
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (req.isAuthenticated()) return res.redirect("/")
        res.render("login")
    } catch (err) {
        next(err)
    }
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (req.isAuthenticated()) return res.redirect("/")
        res.render("signup")
    } catch (err) {
        next(err)
    }
}


