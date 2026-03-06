import * as userService from "../Services/Authentication.js";

let registerUser =  async (req, res, next) => {
    // TODO: Check if passwords are the same in the middleware.
    const { email, username, password, tos_agreement } = req.body;

    let user = await userService.registerUser(email, username, password);

    res.status(200).json({message: "User successfully created"});
};

export { registerUser };
