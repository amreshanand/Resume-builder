const router = require('express').Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const {
    createResume, getResumes, getResume, updateResume, deleteResume, shareResume, getPublicResume, uploadAndParseResume
} = require('../controllers/resumeController');

// Multer configuration for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Public Routes
router.post('/upload', upload.single('resume'), uploadAndParseResume);

router.use(auth); // All other resume routes require auth
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
