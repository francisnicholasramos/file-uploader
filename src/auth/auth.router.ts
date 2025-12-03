import {Router} from "express";
import {postLogin,
        postSignup,
        signup,
        login,
        logout
} from "./auth.controller";

const router = Router();

router.route("/login")
      .get(login)
      .post(postLogin)

router.route("/signup")
      .get(signup)
      .post(postSignup)

router.get("/logout", logout)

export default router;
