const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const supabase = require('../config/supabase');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, plan, ai_credits, is_admin')
            .eq('id', decoded.id)
            .single();

        if (!user || error) {
            return res.status(401).json({ success: false, error: 'User not found.' });
        }

        // Map snake_case to camelCase for compatibility
        req.user = {
            id: user.id,
            _id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            aiCredits: user.ai_credits,
            isAdmin: user.is_admin,
        };
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid or expired token.' });
    }
};

// Admin middleware - must be used after auth middleware
const adminOnly = async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            error: 'Access denied. Admin privileges required.'
        });
    }
    next();
};

module.exports = { auth, adminOnly };
