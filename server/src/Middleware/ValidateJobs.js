import { body, validationResult, matchedData } from "express-validator";
import sanitizeHtml from "sanitize-html";
// TODO: Catch Categorys in Memory to validate Job posting?

const stripAllHtml = (value) =>
    sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });

const validateJobPost = () => {
    return [
        body("title")
            .isString()
            .customSanitizer(stripAllHtml)
            .trim()
            .escape()
            .isLength({ min: 1, max: 64 })
            .withMessage("Title must be between 1 and 64 characters"),

        body("category")
            .isString()
            .customSanitizer(stripAllHtml)
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Invalid category"),
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
