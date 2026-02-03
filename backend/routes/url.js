const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

/**
 * @route POST api/shorten
 * @desc Create a new short URL
 * @access Public
 */
router.post('/shorten',urlController.shortenUrl);

module.exports = router;