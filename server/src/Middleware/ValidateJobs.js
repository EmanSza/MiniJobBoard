import { body, validationResult, matchedData } from "express-validator";

// TODO: Catch Categorys in Memory to validate Job posting?

const validateJobPost = () => {
    return [
        body("title")
            .isString()
            .isLength({ min: 1, max: 64 })
            .withMessage("Title must be between1 and 64 characters")
            .trim()
            .escape(),
        body("category").isString().withMessage("Invalid category"),
        // requires isMongoId() when we implement categorys
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

export { validateJobPost };
