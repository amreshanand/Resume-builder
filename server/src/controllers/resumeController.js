const Resume = require('../models/Resume');
const { nanoid } = require('nanoid');

exports.createResume = async (req, res, next) => {
    try {
        const { title, templateType, templateId } = req.body;
        const resume = await Resume.create({
            userId: req.user.id,
            title,
            templateType,
            templateId: templateId || templateType,
        });

        res.status(201).json({ success: true, data: resume });
    } catch (error) {
        next(error);
    }
};

exports.getResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id })
            .sort({ updatedAt: -1 })
            .select('title templateType status atsScore updatedAt');

        res.json({ success: true, data: resumes });
    } catch (error) {
        next(error);
    }
};

exports.getResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }
        res.json({ success: true, data: resume });
    } catch (error) {
        next(error);
    }
};

exports.updateResume = async (req, res, next) => {
    try {
        const { sections, title, status, formSchema } = req.body;
        const update = {};
        if (sections) update.sections = sections;
        if (title) update.title = title;
        if (status) update.status = status;
        if (formSchema) update.formSchema = formSchema;

        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            update,
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        res.json({ success: true, data: resume });
    } catch (error) {
        next(error);
    }
};

exports.deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }
        res.json({ success: true, message: 'Resume deleted' });
    } catch (error) {
        next(error);
    }
};

exports.shareResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        if (!resume.shareSlug) {
            resume.shareSlug = nanoid(10);
            await resume.save();
        }

        res.json({
            success: true,
            data: { shareSlug: resume.shareSlug, shareUrl: `/r/${resume.shareSlug}` },
        });
    } catch (error) {
        next(error);
    }
};

exports.getPublicResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({ shareSlug: req.params.slug });
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }
        res.json({ success: true, data: resume.toPublicJSON() });
    } catch (error) {
        next(error);
    }
};
