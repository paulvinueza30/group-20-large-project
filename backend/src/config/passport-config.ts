import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    try {
      const user = await User.findOne({ userName });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
