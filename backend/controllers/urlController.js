/**
     * @desc This function is responsible for creating a new short url, validate the long url and save it into database
     * @route POST /api/shorten
     * @access Public
     */
module.exports.shortenUrl = async(req,res) => {
    res.status(200).json({success:true,message:"Controller is connected!"});
};