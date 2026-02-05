const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

/**
 * @route GET /:code
 * @desc Redirect to the long/original URL
 * @access Public
 */

router.get('/:code',urlController.redirectToUrl);


module.exports = router;