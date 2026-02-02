import {Request, Response, NextFunction} from "express";
import passport from "../config/passportConfig";
import {createUser} from "../users/local-users.repository";
import {SignUpSchema} from "../models/schemas";
import bcrypt from "bcrypt";
import {ZodError} from "zod";
import {defaultError} from "../utils/errorMessages";

export const postLogin = passport.authenticate('local', {
    failureMessage: true,
    successRedirect: "/",
    failureRedirect: "/login"
})

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = await SignUpSchema.parseAsync(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);
        res.redirect("/");
    } catch (error) {
        let signUpFeedback = defaultError;
        
        if (error instanceof ZodError && error.issues.length > 0) {
            signUpFeedback = error.issues[0].message;
        }
        
        req.signUpFeedback = signUpFeedback;  
        res.render("signup", { 
            signUpFeedback,         
            hasError: true 
        });
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

        // default to empty array (no message)
        const message = req.session?.messages || [];

        // clear messages so they don't persist
        req.session!.messages = [];

        res.render("login", {message})
    } catch (err) {
        next(err)
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) return res.redirect("/");
        
        const signUpFeedback = req.signUpFeedback; 
        
        res.render("signup", {
            signUpFeedback,
            hasError: !!signUpFeedback
        });
    } catch (err) {
        next(err);
    }
}
