const Invite = require("../MODELS/invitation");
const User = require("../MODELS/user.model");
const{ GetSocketId , io} = require("../SOCKET/socket.js");
// const User = require("../MODELS/user.model");
const SendInvites = async  (req,res)=>{
    const senderId = req.user._id;
    const ReceiverId = req.body.ReceiverId;
    try {
        const data = await Invite.findOne({senderId: senderId , receiverId: ReceiverId});
        if(!data) { 
            const NewInvite = new Invite({
                senderId : senderId,
                receiverId: ReceiverId,
            });
            await NewInvite.save();
            const ReceiverSocketId = GetSocketId(ReceiverId);
            if(ReceiverSocketId) {
                const NewInvite = await User.findOne({_id:senderId});
                const data = await Invite.find({ receiverId: ReceiverId}).populate("senderId");
                console.log(data);
                io.to(ReceiverSocketId).emit("newInviteData",data);
                io.to(ReceiverSocketId).emit("newInvite",NewInvite.fullName);
            }
            return res.status(200).json({success : "friend request sent"});
        }
        return res.status(400).json({ failure : "request already exists"});
    } catch (error) {
        console.log("send invites controller failed");
        return res.status(500).json({error:"Internal Server Error"});
    }
}

const GetInvites = async (req,res)=>{
        const ReceiverId = req.user._id.toString();
        try {
            const data = await Invite.find({ receiverId: ReceiverId}).populate("senderId");
           
            if(data){
                // const ReceiverSocketId = GetSocketId(ReceiverId);
                // if(ReceiverSocketId) {
                //     console.log("socket : "+ data)
                //     io.to(ReceiverSocketId).emit("newInviteData",data);
                // }
                return res.status(200).json(data);
            }
                
            return res.status(200).json([]);
        } catch (error) {
            console.log("get invites controller failed");
            return res.status(500).json({error : "internal server error"});
        }
}

const acceptInvite = async (req,res)=>{
    const receiverId = req.user._id;
    const senderId = req.body.senderId;
    console.log("receivver"+receiverId);
    console.log("sender"+senderId);
    try {
        const acceptance1 = await User.updateOne({_id : receiverId}, {$push : {friends:{friendId : senderId}}});
        const acceptance2 = await User.updateOne({_id : senderId}, {$push : {friends :{friendId:receiverId}}});
        const deletion = await Invite.deleteOne({senderId : senderId , receiverId : receiverId});
        // console.log(acceptance1);
        // console.log(acceptance2);
        // console.log(deletion);
        await Promise.all([acceptance1 , acceptance2 , deletion])
        .then(async ()=>{
            console.log("accepted and deleted successfully");
            const SenderSocketId = GetSocketId(senderId);
            const ReceiverSocketId = GetSocketId(receiverId);
            if(SenderSocketId) {
                const name = await User.findOne({_id : receiverId });
                const msg = name.fullName + " has accepted your invite";
                const foundUser = await User.findOne({ _id:receiverId});
                const data = await Invite.find({ receiverId: receiverId}).populate("senderId");
                const friend = await User.findOne({
                    _id: senderId,
                    'friends.friendId': foundUser._id
                });
                const invite = await Invite.findOne({senderId : senderId , receiverId : foundUser._id.toString() });
                const isInvited = invite ? true : false;
                const bool = friend ? true : false;
                const  AllUsersSender = await User.findOne({_id:senderId}).populate("friends.friendId");
                const  AllUsersReceiver = await User.findOne({_id:receiverId}).populate("friends.friendId");
                io.to(ReceiverSocketId).emit("users",AllUsersReceiver.friends);
                io.to(SenderSocketId).emit("users",AllUsersSender.friends);
                io.to(SenderSocketId).emit("searchedUser",{foundUser : foundUser , bool : bool ,invited : isInvited});
                io.to(ReceiverSocketId).emit("newInviteData",data);
                io.to(SenderSocketId).emit("inviteAccepted",msg);
            }
            return res.status(200).json({msg : "accepted successfully"});

        }).catch(error=>{
            console.log("acceptance and deletion failed"+error.message);
            return res.status(400).json({error : "acceptance failed"});
        })
    } catch (error) {
        console.log("accept invite controlller failed"+error);
        return res.status(500).json({error : "internal server error"});
    }
}

const rejectInvite = async (req,res)=>{
    const receiverId = req.user._id;
    const senderId = req.body.senderId;
    try {
        await Invite.deleteOne({senderId : senderId , receiverId : receiverId}).then(async ()=>{
            console.log("successfully rejected");
            const SenderSocketId = GetSocketId(senderId);
            const ReceiverSocketId = GetSocketId(receiverId);
            if(SenderSocketId) {
                const name = await User.findOne({_id : receiverId });
                const msg = name.fullName + " has rejected your invite";
                const data = await Invite.find({ receiverId: receiverId}).populate("senderId");
                io.to(ReceiverSocketId).emit("newInviteData",data);
                io.to(SenderSocketId).emit("inviteRejected",msg);
            }
            return res.status(200).json({msg : "successfully rejected"});
        })
    } catch (error) {
        console.log("rejection controller failed");
        return res.status(500).json({error : "internal server error"});
    }
}

module.exports = {SendInvites ,GetInvites , acceptInvite , rejectInvite };