const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid or expired token.' });
    }
};

module.exports = auth;
