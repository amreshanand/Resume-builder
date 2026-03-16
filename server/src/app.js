const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');
const { getSystemSettings } = require('./utils/systemSettings');

// Route imports
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const templateRoutes = require('./routes/templateRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { getPublicResume } = require('./controllers/resumeController');
const { getPublicSettings } = require('./controllers/publicController');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Maintenance mode (admin can still access admin + login)
app.use(async (req, res, next) => {
    try {
        // allow health always
        if (req.path === '/api/health') return next();

        const settings = await getSystemSettings();
        if (!settings.maintenanceMode) return next();

        const allowPaths = [
            '/api/auth/login',
            '/api/public/settings',
            '/api/admin',
        ];

        const allowed = allowPaths.some((p) => req.path === p || req.path.startsWith(`${p}/`));
        if (allowed) return next();

        return res.status(503).json({
            success: false,
            error: 'Maintenance mode enabled. Please try again later.',
        });
    } catch (err) {
        // fail open (don’t block traffic if settings table is unreachable)
        return next();
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/admin', adminRoutes);

// Public routes (no auth)
app.get('/api/public/resume/:username/:id', getPublicResume);
app.get('/api/public/settings', getPublicSettings);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Start server (using Supabase — no MongoDB required)
if (require.main === module) {
    const startServer = async () => {
        console.log('🔗 Using Supabase as database backend');
        const server = app.listen(PORT);
        await server;
        console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
    };

    startServer().catch(err => {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    });
}

module.exports = app;

