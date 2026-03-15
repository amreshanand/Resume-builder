const router = require('express').Router();
const { auth } = require('../middleware/auth');
const {
    createResume, getResumes, getResume, updateResume, deleteResume, shareResume, getPublicResume,
} = require('../controllers/resumeController');

router.use(auth); // All resume routes require auth

router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.post('/:id/share', shareResume);

// Public route (no auth) — must be mounted separately
module.exports = router;
module.exports.publicRoutes = (publicRouter) => {
    publicRouter.get('/r/:slug', getPublicResume);
};
