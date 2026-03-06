import { Strategy as LocalStrategy } from "passport-local";

function InitializePassport(passport) {
    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                // TODO: find user by email, compare password with bcrypt, return done(null, user)
            }
        )
    );
}
