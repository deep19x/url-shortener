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
        match:["/.+@.+/..+/","Please provide valid email"]
    },
    password:{
        type:String,
        required:[true,"Provide your password"],
        minlength:6,
        select:false,    //cant returned in queries
    },
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);