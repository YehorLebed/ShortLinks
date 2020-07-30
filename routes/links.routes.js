const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const linkControllers = require('../controllers/link.controllers');
const router = Router();

// /api/links/generate
router.post('/generate', authMiddleware, linkControllers.generate);

// /api/links/
router.get('/', authMiddleware, linkControllers.getAll);

// /api/links/:id
router.get('/:id', authMiddleware, linkControllers.getById);

module.exports = router;