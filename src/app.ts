import express from "express";
import session from "express-session";
import path from "node:path";
import passport from "./config/passportConfig";
import "dotenv/config";

import {router as login} from "./auth/auth.router";
import {router as fileRouter} from "./entity/file/file.router";

const app = express();

const port = 3000;

app.set('views', path.join(__dirname, "../src/views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "../public")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", login)
app.use("/", fileRouter)

app.use((req, res) => {
    if (!req.isAuthenticated()) {
        res.status(404).send("404 page not found.")
    } else {
        res.redirect("/login")
    }
})

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`)
})
