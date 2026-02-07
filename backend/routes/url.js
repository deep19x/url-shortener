const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const auth = require('../middleware/auth');

/**
 * @route POST api/shorten
 * @desc Create a new short URL
 * @access Public
 */
router.post('/shorten',auth,urlController.shortenUrl);

module.exports = router;