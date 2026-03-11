import * as userService from "../Services/Authentication.js";
import passport from "passport";

let registerUser = async (req, res, next) => {
    // TODO: Check if passwords are the same in the middleware.
    const { email, username, password, tos_agreement } = req.body;

    let user = await userService.registerUser(email, username, password);

    res.status(200).json({ message: "User successfully created" });
};

let loginUser = async (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (err)
            return res.status(500).json({ message: "Internal Server Error" });
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.logIn(user, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
            }
            return res.status(200).send({ message: "Success", user: user });
        });
    })(req, res, next);
};

export { registerUser, loginUser };
