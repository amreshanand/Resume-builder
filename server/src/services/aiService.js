const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');
const buildFormPrompt = require('../prompts/formGeneration');
const { buildImprovePrompt, buildSuggestAchievementsPrompt } = require('../prompts/contentImprove');
const buildATSPrompt = require('../prompts/atsScoring');
const fallbackSchemas = require('../prompts/fallbackSchemas');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Validate form schema structure
function validateFormSchema(schema) {
    if (!schema || !Array.isArray(schema.sections)) return false;
    return schema.sections.every(
        (s) => s.id && s.title && Array.isArray(s.fields) && s.fields.length > 0
    );
}

// Parse AI JSON response safely
function parseAIResponse(text) {
    // Remove markdown code fences if present
    let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
}

// Generate form schema with retry and fallback
async function generateFormSchema(templateType, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const prompt = buildFormPrompt(templateType);
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                },
            });

            const parsed = parseAIResponse(result.response.text());
            if (validateFormSchema(parsed)) {
                return { source: 'ai', schema: parsed };
            }
            throw new Error('Invalid schema structure from AI');
        } catch (err) {
            console.warn(`⚠️ AI form generation attempt ${attempt + 1} failed: ${err.message}`);
            if (attempt === retries) {
                console.error('❌ All AI attempts failed, using fallback schema');
                return { source: 'fallback', schema: fallbackSchemas[templateType] };
            }
            // Exponential backoff
            await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        }
    }
}

// Improve content (bullet points, summary, etc.)
async function improveContent(text, context = '') {
    const prompt = buildImprovePrompt(text, context);
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.8,
            maxOutputTokens: 1024,
        },
    });
    return parseAIResponse(result.response.text());
}

// Suggest quantified achievements
async function suggestAchievements(role, company, description) {
    const prompt = buildSuggestAchievementsPrompt(role, company, description);
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.9,
            maxOutputTokens: 1024,
        },
    });
    return parseAIResponse(result.response.text());
}

// ATS scoring
async function scoreATS(resumeData, targetRole) {
    const prompt = buildATSPrompt(resumeData, targetRole);
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.5,
            maxOutputTokens: 2048,
        },
    });
    return parseAIResponse(result.response.text());
}

module.exports = {
    generateFormSchema,
    improveContent,
    suggestAchievements,
    scoreATS,
};
