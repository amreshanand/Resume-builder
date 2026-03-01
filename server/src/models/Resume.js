const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            default: 'Untitled Resume',
            maxlength: 200,
        },
        templateType: {
            type: String,
            enum: ['fresher', 'developer', 'corporate', 'creative'],
            required: true,
        },
        templateId: {
            type: String,
            required: true,
        },

        // Structured resume data
        sections: {
            personalInfo: {
                fullName: String,
                email: String,
                phone: String,
                location: String,
                linkedin: String,
                portfolio: String,
                summary: String,
            },
            experience: [
                {
                    company: String,
                    role: String,
                    startDate: String,
                    endDate: String,
                    current: { type: Boolean, default: false },
                    bullets: [String],
                    improved: { type: Boolean, default: false },
                },
            ],
            education: [
                {
                    institution: String,
                    degree: String,
                    field: String,
                    startDate: String,
                    endDate: String,
                    gpa: String,
                },
            ],
            skills: {
                technical: [String],
                soft: [String],
                tools: [String],
            },
            projects: [
                {
                    name: String,
                    description: String,
                    techStack: [String],
                    link: String,
                },
            ],
            certifications: [
                {
                    name: String,
                    issuer: String,
                    date: String,
                    link: String,
                },
            ],
            customSections: [
                {
                    title: String,
                    content: String,
                },
            ],
        },

        // AI metadata
        atsScore: { type: Number, default: null },
        atsFeedback: { type: [String], default: [] },
        formSchema: { type: mongoose.Schema.Types.Mixed },

        status: {
            type: String,
            enum: ['draft', 'complete'],
            default: 'draft',
        },
        shareSlug: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

// Index for efficient querying
resumeSchema.index({ userId: 1, createdAt: -1 });

// Public JSON (for shared links — hide userId)
resumeSchema.methods.toPublicJSON = function () {
    const obj = this.toObject();
    delete obj.userId;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model('Resume', resumeSchema);
