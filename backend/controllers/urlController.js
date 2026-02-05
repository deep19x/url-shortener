const validUrl = require('valid-url');
const Url = require('../models/url');
const {nanoid} = require('nanoid');

/**
     * @desc This function is responsible for creating a new short url, validate the long url and save it into database
     * @route POST /api/shorten
     * @access Public
     */
module.exports.shortenUrl = async(req,res) => {

    const { longUrl } = req.body;

    console.log("Received Long Url: ",longUrl);

    if(!longUrl){
        return res.status(400).json({success:false,message:"Please provide url"});
    }

    if(!validUrl.isUri(longUrl)){
        return res.status(400).json({success:false,message:"Invalid Url format provided!"});
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

        res.status(201).json({success:true,data:url});

    } catch (error) {
        console.log("Database Error: ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }

    res.status(200).json({success:true,message:"Controller is connected!",data:{receivedUrl : longUrl}});
};


/**
 * @desc Find a URL by its short Code and redirect the user
 * @route GET /:code
 * @access Public
 */

module.exports.redirectToUrl = async(req,res) => {
    try {
        const url = await Url.findOne({urlCode:req.params.code});
        if(url){
            url.clicks++;
            await url.save();
            return res.redirect(301,url.longUrl);
        } else {
            return res.status(404).json({
                success:false,
                message:"No Url Found",
            });
        }

    } catch (error) {
        console.log("Server Error on redirect",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};