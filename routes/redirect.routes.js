const { Router } = require('express');
const Links = require('../models/Links');
const linkController = require('../controllers/link.controllers');

const router = Router();

router.get('/:code', linkController.redirect);

module.exports = router;