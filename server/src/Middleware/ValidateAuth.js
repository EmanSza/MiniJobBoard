import { body, validationResult, matchedData } from "express-validator";

const loginValidation = () => {
    return [
        body("email")
            .customSanitizer((value) => String(value))
            .isEmail()
            .withMessage("Email must be a valid email address")
            .isLength({ min: 6, max: 64 })
            .withMessage("Email must be 6-64 characters long")
            .normalizeEmail({
                all_lowercase: true,
                gmail_remove_dots: false,
                gmail_remove_subaddress: false,
                gmail_convert_googlemaildotcom: true,
                outlookdotcom_remove_subaddress: false,
                yahoo_remove_subaddress: false,
                icloud_remove_subaddress: false,
            })
            .trim()
            .escape(),
        body("password")
            .customSanitizer((value) => String(value))
            .isLength({ min: 8, max: 64 })
            .withMessage("Password must be 8-64 characters long")
            .matches(/^(?=.*[^\w])(?=.*\d)/)
            .withMessage(
                "Password must contain at least one special character and one digit"
            )
            .trim()
            .escape(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array().map((e) => ({
                        field: e.path,
                        message: e.msg,
                    })),
                });
            req.validatedData = matchedData(req);
            next();
        },
    ];
};
// We want the user to be Authenicated
const isAuthenicated = () => {
    return (req, res, next) => {
        // The user needs to be authenticated in order to access the route
        if (!req.isAuthenticated())
            return res.status(401).json({ message: "Unauthorized" });
        next();
    };
};
// We do not want the user to be Authenicated
const isNotAuthenicated = () => {
    return (req, res, next) => {
        // The user needs to be unauthenticated in order to access the route
        if (req.isAuthenticated())
            return res.status(500).json({ message: "Bad Request" });
        next();
    };
};

export { loginValidation, isAuthenicated, isNotAuthenicated };
