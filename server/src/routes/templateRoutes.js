const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const {
    getTemplates,
    getTemplatesByCategory,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getAdminTemplates,
    toggleTemplateStatus,
} = require('../controllers/templateController');

// Public routes
router.get('/', getTemplates);
router.get('/by-category', getTemplatesByCategory);
router.get('/:slug', getTemplate);

// Admin routes (protected)
router.get('/admin/all', auth, adminOnly, getAdminTemplates);
router.post('/', auth, adminOnly, createTemplate);
router.put('/:id', auth, adminOnly, updateTemplate);
router.delete('/:id', auth, adminOnly, deleteTemplate);
router.patch('/:id/toggle', auth, adminOnly, toggleTemplateStatus);

module.exports = router;
