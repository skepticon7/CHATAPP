const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true
    },
    username : {
        type:String,
        require:true
    },
    password : {
        type:String,
        required : true,
        minLength:6
    },
    gender : {
        type : String,
        required : true,
        enum  :['male' , 'female']
    },
    profilePicture : {
        type:String,
        default:""
    },
    friends :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : []
    }]
});

const User = mongoose.model('User' , UserSchema);
module.exports = User;