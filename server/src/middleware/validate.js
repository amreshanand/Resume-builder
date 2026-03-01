const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Sanitize string — strip all HTML
const sanitize = (str) =>
    sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} });

// Middleware: check validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

// Auth validators
const validateRegister = [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    handleValidationErrors,
];

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    handleValidationErrors,
];

// AI content validators
const validateImproveContent = [
    body('text')
        .trim()
        .isLength({ min: 5, max: 2000 })
        .withMessage('Text must be 5-2000 characters')
        .customSanitizer(sanitize),
    body('context')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .customSanitizer(sanitize),
    handleValidationErrors,
];

const validateATSScore = [
    body('resumeData').isObject().withMessage('Resume data must be an object'),
    body('targetRole')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .customSanitizer(sanitize),
    handleValidationErrors,
];

const validateFormGeneration = [
    body('templateType')
        .isIn(['fresher', 'developer', 'corporate', 'creative'])
        .withMessage('Invalid template type'),
    handleValidationErrors,
];

module.exports = {
    validateRegister,
    validateLogin,
    validateImproveContent,
    validateATSScore,
    validateFormGeneration,
    sanitize,
};
