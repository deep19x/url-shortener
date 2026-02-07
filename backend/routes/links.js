const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const linksController = require('../controllers/linksController');

/**
 * @route GET /api/links/my-links
 * @desc Get all links created by logged-in user
 * @access Private
 */
router.get('/my-links',auth,linksController.getMyLinks);

module.exports = router;