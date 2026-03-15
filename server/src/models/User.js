const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            select: false, // Don't include password in queries by default
        },
        plan: {
            type: String,
            enum: ['free', 'pro'],
            default: 'free',
        },
        aiCredits: {
            type: Number,
            default: 10,
        },
        aiCreditsResetAt: {
            type: Date,
            default: Date.now,
        },
        resumeCount: {
            type: Number,
            default: 0,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Reset AI credits daily
userSchema.methods.checkAndResetCredits = function () {
    const now = new Date();
    const lastReset = new Date(this.aiCreditsResetAt);
    if (now.toDateString() !== lastReset.toDateString()) {
        this.aiCredits = this.plan === 'pro' ? 100 : 10;
        this.aiCreditsResetAt = now;
    }
};

module.exports = mongoose.model('User', userSchema);
