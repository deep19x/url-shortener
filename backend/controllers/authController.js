const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


/**
 * @desc Register a new User
 * @route POST /api/auth/register
 * @access Private
 */
module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide name,email and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "A user with email already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(200).json({
            success: true,
            message: "User Registered Successfully!",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.log("Registration Error", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


/**
 * @desc Authenticate User and give token
 * @route POST /api/auth/login
 * @access Public
 */
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please,provide email and password" });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user._id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h', // The token will be valid for 1 hour.
        });

        res.status(200).json({
            success: true,
            token: token,
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}