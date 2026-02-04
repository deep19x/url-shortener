const validUrl = require('valid-url');
const Url = require('../models/url');
const nanoid = require('nanoid');

/**
     * @desc This function is responsible for creating a new short url, validate the long url and save it into database
     * @route POST /api/shorten
     * @access Public
     */
module.exports.shortenUrl = async(req,res) => {

    const { longUrl } = req.body;

    console.log("Received Long Url: ",longUrl);

    if(!longUrl){
        res.status(400).json({success:false,message:"Please provide url"});
    }

    if(!validUrl.isUri(longUrl)){
        res.status(400).json({success:false,message:"Invalid Url format provided!"});
    }

    try {
        const url = await Url.findOne({longUrl:longUrl});

        if(url){
            return res.status(200).json({success:true,data:url});
        }

        const urlCode = nanoid(7);

        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

        url = await Url.create({
            longUrl,
            shortUrl,
            urlCode,
        });

        res.status(200).json({success:true,data:url});

    } catch (error) {
        console.log("Database Error: ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }

    res.status(200).json({success:true,message:"Controller is connected!",data:{receivedUrl : longUrl}});
};