const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const {
    getStats,
    getUsers,
    updateUser,
    deleteUser,
    getResumes,
    deleteResume,
    getRecentActivity,
    getSettings,
    updateSettings
} = require('../controllers/adminController');

// All routes here should require auth and admin privileges
router.use(auth, adminOnly);

router.get('/stats', getStats);
router.get('/activity', getRecentActivity);
router.route('/settings').get(getSettings).put(updateSettings);

router.route('/users').get(getUsers);
router.route('/users/:id').put(updateUser).delete(deleteUser);
router.route('/resumes').get(getResumes);
router.route('/resumes/:id').delete(deleteResume);

module.exports = router;
