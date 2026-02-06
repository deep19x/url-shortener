const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Provide your name"],
    },
    email:{
        type:String,
        required:[true,"Provide your email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Provide your password"],
        minlength:6,
        select:false,    //cant returned in queries
    },
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);