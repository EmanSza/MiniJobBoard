import { body, param, validationResult, matchedData } from "express-validator";
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

const validateUpdateJob = () => {
    return [
        body("id")
            .isMongoId()
            .withMessage("id must be a valid MongoDB ObjectId"),

        body("content")
            .isObject({ strict: true })
            .withMessage("content must be a plain object")
            .custom((val) => {
                if (Object.keys(val).length === 0)
                    throw new Error("content must not be empty");
                return true;
            }),

        body("content.title")
            .optional()
            .isString()
            .customSanitizer(stripAllHtml)
            .trim()
            .escape()
            .isLength({ min: 1, max: 64 })
            .withMessage("title must be between 1 and 64 characters"),

        body("content.content")
            .optional()
            .isString()
            .customSanitizer(stripAllHtml)
            .trim()
            .escape()
            .isLength({ min: 1, max: 5000 })
            .withMessage("content field must be between 1 and 5000 characters"),

        body("content.category")
            .optional()
            .isString()
            .customSanitizer(stripAllHtml)
            .trim()
            .escape()
            .notEmpty()
            .withMessage("category must not be empty"),

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

const validateDeleteJob = () => {
    return [
        param("identifier")
            .isString()
            .trim()
            .notEmpty()
            .isLength({ max: 128 })
            .withMessage("identifier must be a non-empty string up to 128 characters"),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array().map((e) => ({
                        field: e.path,
                        message: e.msg,
                    })),
                });
            next();
        },
    ];
};

export { validateJobPost, validateUpdateJob, validateDeleteJob };
