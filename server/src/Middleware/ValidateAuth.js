/**
 * Validates login request body before passing to passport.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Missing Credentials" });

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.length > 32)
        return res.status(400).json({ message: "Invalid Email Format" });

    if (
        password.length < 8 ||
        !password.match(/[^A-Za-z0-9]+/g) ||
        !password.match(/[0-9]+/g)
    )
        return res.status(400).json({ message: "Invalid Credentials" });

    next();
};
