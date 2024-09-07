const mongoose = require('mongoose');

const UserSchema  = mongoose.Schema({
    ProfileImage:{
        type:String
    },
    userName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('users',UserSchema)