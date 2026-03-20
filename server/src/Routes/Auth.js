import { Router } from "express";
const router = Router();

import { loginUser, registerUser } from "../Controllers/Authentication.js";
import { loginValidation, registerValidation, isAuthenicated, isNotAuthenicated } from "../Middleware/ValidateAuth.js";
router.post("/register", isNotAuthenicated(), registerValidation(), registerUser);
router.post("/login", isNotAuthenicated(), loginValidation(), loginUser);

// TODO: Improve These Routes and call to out Controller
router.delete("/logout",isAuthenicated(), (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "successfully logged out" });
    });
});
router.get("/me", isAuthenicated(), (req, res) => {
    if (req.user) return res.status(200).json(req.user)
    else return res.status(401).json({message: "Unauthorized"})
});

export default router;
