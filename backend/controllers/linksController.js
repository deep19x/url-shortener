const Url = require('../models/url');

/**
 * @desc    Get all links created by the currently logged-in user.
 * @route   GET /api/links/my-links
 * @access  Private
 */
module.exports.getMyLinks = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorized to access this route" });
        }
        const links = (await Url.find({ user: req.user.id })).toSorted({ date: -1 });

        res.status(200).json({
            success: true,
            count: links.length,
            data: links,
        });

    } catch (error) {
        console.error('Error fetching user links:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
}