const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Template name is required'],
            trim: true,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: 500,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['fresher', 'developer', 'data', 'business', 'finance', 'creative', 'marketing', 'operations', 'healthcare', 'academia'],
        },
        thumbnail: {
            type: String, // URL or base64
            default: '',
        },
        previewImage: {
            type: String, // Full preview image URL
            default: '',
        },
        color: {
            type: String, // Tailwind gradient classes e.g., "from-blue-500 to-indigo-600"
            default: 'from-indigo-500 to-purple-600',
        },
        sections: [{
            type: String,
            enum: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'publications', 'languages', 'interests', 'references', 'portfolio', 'achievements', 'internships', 'volunteer', 'courses'],
        }],
        layout: {
            type: String,
            enum: ['single-column', 'two-column', 'sidebar-left', 'sidebar-right'],
            default: 'single-column',
        },
        styles: {
            primaryColor: { type: String, default: '#4F46E5' },
            secondaryColor: { type: String, default: '#818CF8' },
            fontFamily: { type: String, default: 'Inter' },
            fontSize: { type: String, default: 'medium' },
            headerStyle: { type: String, default: 'centered' },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        usageCount: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Generate slug from name before saving
templateSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Index for faster queries
templateSchema.index({ category: 1, isActive: 1 });
templateSchema.index({ slug: 1 });

module.exports = mongoose.model('Template', templateSchema);
