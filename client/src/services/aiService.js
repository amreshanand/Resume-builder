import api from './api';

export const aiService = {
    generateForm: (templateType) =>
        api.post('/ai/generate-form', { templateType }).then((r) => r.data),

    improveContent: (text, context = '') =>
        api.post('/ai/improve-content', { text, context }).then((r) => r.data),

    suggestAchievements: (role, company, description) =>
        api.post('/ai/suggest-achievements', { role, company, description }).then((r) => r.data),

    atsScore: (resumeData, targetRole) =>
        api.post('/ai/ats-score', { resumeData, targetRole }).then((r) => r.data),
};

export default aiService;
