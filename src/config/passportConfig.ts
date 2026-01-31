import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcrypt";
import prisma from "../db/prismaClient";

passport.use(new LocalStrategy (async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({where: {username} as any})

    if (!user) {
      return done(null, false, {message: "User does not exist."})
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, {message: "Password is incorrect."})
    }

    return done(null, user);
  } catch (error) {
    return done(error)
  }
    
  })
);

passport.serializeUser((user: any, done: (err: any, id?: number) => void) => done(null, user.id));

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique( {where: {id} } );
    done(null, user);
  } catch (error) {
    return done(error)
  }
})

export default passport;
