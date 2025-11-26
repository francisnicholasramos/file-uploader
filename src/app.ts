import "module-alias/register";

import express from "express";
import session from "express-session";
import path from "node:path";
import passport from "./config/passportConfig";
import {isAuthenticated} from "./middleware/isAuthenticated";
import "dotenv/config";

import login from "./auth/auth.router";
import fileRouter from "./entity/file/file.router";
import folderRouter from "./entity/folder/folder.router";

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
app.use("/", isAuthenticated, folderRouter)
app.use("/", isAuthenticated, fileRouter)

// mispelled endpoints
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
