const jwt = require('jsonwebtoken');

/**
 * @desc this middleware function verifies the JWT sent by the client
 * If token existed and also correct it sends payload to req.user
 * if not then it give 401 unauthorized response
 */

const auth = async (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token){
        next();
    }

    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded.user

        next();
    } catch (error) {
        console.log("Token verification failed: ",error.message);
        res.status(401).json({success:false,message:"Token is not valid!"});
    }
}

module.exports = auth;