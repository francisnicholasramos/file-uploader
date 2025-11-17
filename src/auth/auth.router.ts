import {Router} from "express";
import {isAuthenticated} from "../middleware/isAuthenticated";
import {postLogin,
        postSignup
} from "./auth.controller";

export const router = Router();

router.route("/login")
      .get((req, res) => res.render("login"))
      .post(postLogin)

router.get("/", isAuthenticated, (req, res) => res.render("index"))

router.route("/signup")
      .get((req, res) => res.render("signup"))
      .post(postSignup)
