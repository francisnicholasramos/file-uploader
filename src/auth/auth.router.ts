import {Router} from "express";
import {postLogin,
        postSignup
} from "./auth.controller";


const router = Router();

router.route("/login")
      .get((req, res) => res.render("login"))
      .post(postLogin)

router.route("/signup")
      .get((req, res) => res.render("signup"))
      .post(postSignup)

export default router;
