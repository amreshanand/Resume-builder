const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/env');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, plan: user.plan, aiCredits: user.aiCredits },
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        // Reset AI credits if new day
        user.checkAndResetCredits();
        await user.save();

        const token = generateToken(user);

        res.json({
            success: true,
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, plan: user.plan, aiCredits: user.aiCredits },
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        user.checkAndResetCredits();
        await user.save();

        res.json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email, plan: user.plan, aiCredits: user.aiCredits },
        });
    } catch (error) {
        next(error);
    }
};
