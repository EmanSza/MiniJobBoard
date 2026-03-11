import { Router } from "express";
const router = Router();

import { loginUser, registerUser } from "../Controllers/Authentication.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

// TODO: Improve These Routes and call to out Controller
router.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "successfully logged out" });
    });
});
router.get("/get", (req, res) => {
    return res.status(200).json(req.user || {});
});

export default router;
