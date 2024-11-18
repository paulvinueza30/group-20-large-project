import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel";
import bcrypt from "bcrypt";
// Utility function to check if the login input is an email
const isEmail = (login) => /\S+@\S+\.\S+/.test(login);
passport.use(new LocalStrategy({
    usernameField: "login",
    passwordField: "password",
}, async (login, password, done) => {
    try {
        const query = isEmail(login) ? { email: login } : { userName: login };
        const user = await User.findOne(query);
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
export default passport;
