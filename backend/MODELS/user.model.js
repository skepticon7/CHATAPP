const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    unseenMessages: {
        type: Number,
        default: 0
    }
});

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
    friends : [FriendSchema]
});

const User = mongoose.model('User' , UserSchema);
module.exports = User;