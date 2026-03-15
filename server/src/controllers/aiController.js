const supabase = require('../config/supabase');
const aiService = require('../services/aiService');
const { AppError } = require('../middleware/errorHandler');

// Check and deduct AI credits
async function checkCredits(userId) {
    const { data: user, error } = await supabase
        .from('users')
        .select('id, ai_credits, ai_credits_reset_at, plan')
        .eq('id', userId)
        .single();

    if (!user || error) throw new AppError('User not found', 404);

    // Reset credits if new day
    const now = new Date();
    const lastReset = new Date(user.ai_credits_reset_at);
    let credits = user.ai_credits;

    if (now.toDateString() !== lastReset.toDateString()) {
        credits = user.plan === 'pro' ? 100 : 10;
    }

    if (credits <= 0) {
        throw new AppError('No AI credits remaining. Credits reset daily.', 429);
    }

    credits -= 1;

    await supabase
        .from('users')
        .update({ ai_credits: credits, ai_credits_reset_at: now.toISOString() })
        .eq('id', userId);

    return credits;
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
