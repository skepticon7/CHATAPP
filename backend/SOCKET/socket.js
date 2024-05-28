const {Server} = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const Message = require("../MODELS/message.model");
const User = require("../MODELS/user.model");
const Conversation = require("../MODELS/conversation.model");
const server = http.createServer(app);
const io = new Server(server,{
    cors:["https://chatify-pod8.onrender.com"],
    methods :["GET" , "POST"]
});

const UserSocket = {};

 const GetSocketId = (ReceiverID) =>{
    return UserSocket[ReceiverID];
}

io.on("connection" , async socket =>{
    console.log("connection : ",socket.id);
    const userId = socket.handshake.query.UserId;
    if(userId!=="undefined") {
        UserSocket[userId] = socket.id;
    }
    io.emit("getOnlineUsers" , Object.keys(UserSocket));

    socket.on("ToBeSeen" ,async ({onlineUserId , selectedUserId})=>{
        try{
            await Message.updateMany({senderId : selectedUserId , receiverId : onlineUserId , status : "Sent"} , {status : "Seen"}).then(async ()=>{
                console.log(UserSocket[selectedUserId]);
                const cnv = await Conversation.findOne({senderId : selectedUserId , receiverId: onlineUserId}).populate("messages");
                 io.to(UserSocket[selectedUserId]).emit("MessageSeen",cnv.messages)
                
            }).catch(error=>{
                console.log(error.message);
            })
        }catch(error){
            console.log(error);
        }
    })

    socket.on("toZero" , async({SenderId,ReceiverId})=>{
        try {
            await User.updateOne(
                { _id: SenderId, "friends.friendId": ReceiverId },
                { $set: { "friends.$.unseenMessages": 0 } }
            ).then(async () => {
                const conversation = await User.findOne({_id:SenderId}).populate("friends.friendId");
                io.to(UserSocket[SenderId]).emit("toZeroSocket",conversation.friends);
            }).catch((e) => {
                console.log("error: " + e);
            }); 
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("disconnect" , ()=>{
        console.log("disconnected:: " + socket.id);
        delete UserSocket[userId];
        io.emit("getOnlineUsers" , Object.keys(UserSocket));
    })
})

module.exports = {app,server,GetSocketId ,io};