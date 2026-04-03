import { Strategy as LocalStrategy } from "passport-local";
import UserRepository from "../Repository/UserRepository.js";
import bcrypt from "bcrypt";


let userRepository = new UserRepository();
let authenicateLocalUser = async (email, password, done) => {
    let user = await userRepository.findOne({ email: email });

    if (user == null)
        return done(null, false, { message: "No user with that email" });

    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, {
                _id: user._id,
                email: user.email,
                username: user.username,
                isAdministrator: user.isAdministrator,
            });
        } else return done(null, false, "Login information incorrect");
    } catch (err) {
        return done(err);
    }
};

async function InitializePassport(passport) {
    passport.use(
        "local-login",
        new LocalStrategy({ usernameField: "email" }, authenicateLocalUser)
    );

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const user = await userRepository.findById(id);
        if (!user) return done(null, false);
        done(null, {
            _id: user._id,
            email: user.email,
            username: user.username,
            isAdministrator: user.isAdministrator
        });
    });
}

export default InitializePassport;
