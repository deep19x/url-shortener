const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @route POST /api/auth/register
 * @desc Register a new User
 * @access Public
 */
router.post('/register',authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Authenticate a User and give token
 * @access Public
 */
router.post('/login',authController.loginUser);

module.exports = router;