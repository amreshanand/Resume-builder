const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');
const { JWT_SECRET } = require('../config/env');
const { getSystemSettings } = require('../utils/systemSettings');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const settings = await getSystemSettings();
        if (!settings.allowRegistration) {
            return res.status(403).json({ success: false, error: 'Registration is currently disabled.' });
        }

        // Check existing user
        const { data: existing } = await supabase
            .from('users')
            .select('id')
            .eq('email', email.toLowerCase())
            .single();

        if (existing) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const { data: user, error } = await supabase
            .from('users')
            .insert({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            })
            .select('id, name, email, plan, ai_credits, is_admin')
            .single();

        if (error) throw error;

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    plan: user.plan,
                    aiCredits: user.ai_credits,
                    isAdmin: user.is_admin,
                },
            },
        });
    } catch (error) {
        console.error('Registration controller error:', error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

        if (!user || error) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        // Reset AI credits if new day
        const now = new Date();
        const lastReset = user.ai_credits_reset_at ? new Date(user.ai_credits_reset_at) : new Date(0);
        
        if (now.toDateString() !== lastReset.toDateString()) {
            const newCredits = user.plan === 'pro' ? 100 : 10;
            const { error: updateError } = await supabase
                .from('users')
                .update({ 
                    ai_credits: newCredits, 
                    ai_credits_reset_at: now.toISOString() 
                })
                .eq('id', user.id);
            
            if (updateError) {
                console.error('⚠️ Failed to reset AI credits:', updateError.message);
            } else {
                user.ai_credits = newCredits;
            }
        }

        const token = generateToken(user);

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    plan: user.plan,
                    aiCredits: user.ai_credits,
                    isAdmin: user.is_admin,
                },
            },
        });
    } catch (error) {
        console.error('Login controller error:', error);
        if (error.name === 'JsonWebTokenError' || error.message?.includes('secretOrPrivateKey')) {
            return res.status(500).json({ success: false, error: 'Server configuration error (JWT_SECRET might be missing)' });
        }
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, plan, ai_credits, ai_credits_reset_at, is_admin')
            .eq('id', req.user.id)
            .single();

        if (!user || error) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Reset AI credits if new day
        const now = new Date();
        const lastReset = new Date(user.ai_credits_reset_at);
        if (now.toDateString() !== lastReset.toDateString()) {
            const newCredits = user.plan === 'pro' ? 100 : 10;
            await supabase
                .from('users')
                .update({ ai_credits: newCredits, ai_credits_reset_at: now.toISOString() })
                .eq('id', user.id);
            user.ai_credits = newCredits;
        }

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                aiCredits: user.ai_credits,
                isAdmin: user.is_admin,
            },
        });
    } catch (error) {
        next(error);
    }
};
