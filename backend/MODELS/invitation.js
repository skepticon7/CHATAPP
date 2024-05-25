const mongoose = require("mongoose");


const InvitSchema = new mongoose.Schema({
    senderId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status :{
        type:String,
        required:true,
        default:"Pending"
    }
});

const Invite = mongoose.model("Invite" , InvitSchema);

module.exports = Invite;