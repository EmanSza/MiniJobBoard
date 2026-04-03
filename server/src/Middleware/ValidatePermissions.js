import { body, validationResult, matchedData } from "express-validator";


// We want the user to be both loggedin, and have the isAdministrator bool
const hasPermission = () => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) return res.status(401).json({message: "Not Logged in"})
        
        if (!req.user.isAdministrator) return res.status(401).json({message: "Not Authorized"})


        next();
    };
};

export { hasPermission };
