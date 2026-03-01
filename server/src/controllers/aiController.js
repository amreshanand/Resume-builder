const User = require('../models/User');
const aiService = require('../services/aiService');
const { AppError } = require('../middleware/errorHandler');

// Check and deduct AI credits
async function checkCredits(userId) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    user.checkAndResetCredits();

    if (user.aiCredits <= 0) {
        throw new AppError('No AI credits remaining. Credits reset daily.', 429);
    }

    user.aiCredits -= 1;
    await user.save();
    return user.aiCredits;
}

exports.generateForm = async (req, res, next) => {
    try {
        const remainingCredits = await checkCredits(req.user.id);
        const { templateType } = req.body;

        const result = await aiService.generateFormSchema(templateType);

        res.json({
            success: true,
            data: {
                ...result,
                remainingCredits,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.improveContent = async (req, res, next) => {
    try {
        const remainingCredits = await checkCredits(req.user.id);
        const { text, context } = req.body;

        const result = await aiService.improveContent(text, context);

        res.json({
            success: true,
            data: { ...result, remainingCredits },
        });
    } catch (error) {
        next(error);
    }
};

exports.suggestAchievements = async (req, res, next) => {
    try {
        const remainingCredits = await checkCredits(req.user.id);
        const { role, company, description } = req.body;

        const result = await aiService.suggestAchievements(role, company, description);

        res.json({
            success: true,
            data: { ...result, remainingCredits },
        });
    } catch (error) {
        next(error);
    }
};

exports.atsScore = async (req, res, next) => {
    try {
        const remainingCredits = await checkCredits(req.user.id);
        const { resumeData, targetRole } = req.body;

        const result = await aiService.scoreATS(resumeData, targetRole);

        res.json({
            success: true,
            data: { ...result, remainingCredits },
        });
    } catch (error) {
        next(error);
    }
};
