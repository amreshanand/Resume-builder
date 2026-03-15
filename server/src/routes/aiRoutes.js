const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const { validateFormGeneration, validateImproveContent, validateATSScore } = require('../middleware/validate');
const { generateForm, improveContent, suggestAchievements, atsScore } = require('../controllers/aiController');

router.use(auth);      // All AI routes require auth
router.use(aiLimiter);  // Rate limit all AI routes

router.post('/generate-form', validateFormGeneration, generateForm);
router.post('/improve-content', validateImproveContent, improveContent);
router.post('/suggest-achievements', suggestAchievements);
router.post('/ats-score', validateATSScore, atsScore);

module.exports = router;
