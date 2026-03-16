const { NODE_ENV } = require('../config/env');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || (err.isOperational ? err.message : 'Internal server error');

    console.error(`❌ [${req.method}] ${req.path} — ${err.message}`);
    if (NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(NODE_ENV === 'development' && { stack: err.stack }),
    });
};

// Custom error class for operational errors
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { errorHandler, AppError };
