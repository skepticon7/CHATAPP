const Conversation = require("../MODELS/conversation.model");
const Message = require("../MODELS/message.model");
const User = require("../MODELS/user.model.js");
const mongoose = require("mongoose");
const{ GetSocketId , io} = require("../SOCKET/socket.js");

async function SendMessage(req, res) {
    const { message, ReceiverId } = req.body;
    const SenderId = req.user._id;
    try {
        if (mongoose.Types.ObjectId.isValid(SenderId) && mongoose.Types.ObjectId.isValid(ReceiverId)) {
            const conversation = await Conversation.findOne({ senderId: SenderId , receiverId:ReceiverId});

            if (!conversation) {
                const NewMsg = new Message({
                    senderId: SenderId,
                    receiverId: ReceiverId,
                    message: message,
                    status : "Sent"
                });
                await NewMsg.save();
                const NewConv = new Conversation({
                    senderId : SenderId,
                    receiverId: ReceiverId,
                    messages: [NewMsg._id.toString()]
                });
                const NewConv1 =  new Conversation({
                    senderId : ReceiverId,
                    receiverId: SenderId,
                    messages: [NewMsg._id.toString()]
                    
                })
                await Promise.all([NewConv.save(), NewConv1.save()]);
                const ReceiverSocketId = GetSocketId(ReceiverId);

                io.to(ReceiverSocketId).emit("newMessage",NewMsg);
                io.to(ReceiverSocketId).emit("unseenMessages",unseen.friends);
                return res.status(200).json({ NewMsg });
            }
            else {
                const NewMsg = new Message({
                    senderId: SenderId,
                    receiverId: ReceiverId,
                    message: message,
                    status : "Sent"
                });
                await NewMsg.save();
                if (NewMsg) {
                    await Conversation.updateOne({ receiverId : ReceiverId,  senderId :SenderId  }, { $push: { messages: NewMsg._id.toString() } });
                    await Conversation.updateOne({receiverId : SenderId , senderId : ReceiverId} , {$push : { messages : NewMsg._id.toString()}});
                    await User.updateOne(
                        {_id: ReceiverId,  "friends.friendId": SenderId},
                        {$inc : {"friends.$.unseenMessages":  1}}
                      );
                    const ReceiverSocketId = GetSocketId(ReceiverId);
                    if(ReceiverSocketId) {
                        const unseen = await User.findOne({_id: ReceiverId}).populate("friends.friendId");
                        io.to(ReceiverSocketId).emit("newMessage",NewMsg);
                        io.to(ReceiverSocketId).emit("unseenMessages",unseen.friends);
        
                    }

                    return res.status(200).json({ NewMsg });

                }
            }

        }


    } catch (error) {
        console.log("error in send message contoller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

}

const getMessage = async (req,res)=>{
   try {
    const UserTochatToID = req.query.friend;
    const SenderId = req.user._id;
    console.log(UserTochatToID);
    if(mongoose.Types.ObjectId.isValid(UserTochatToID) && mongoose.Types.ObjectId.isValid(SenderId)){
         const conversation = await Conversation.findOne({senderId : SenderId , receiverId: UserTochatToID}).populate("messages");
        if(conversation)
            return res.status(200).json(conversation.messages);
        return res.status(200).json([]);    
    }
    return res.status(200).json([]);
        
        
   } catch (error) {
        console.log("error in get message contoller",error.message);
        res.status(500).json({error:"Internal server error"});
   }


}


const numberNotSeen = async(req,res)=>{
    
    const ReceiverId = req.query.ReceiverId;
    const SenderId = req.user._id;
    try{
        data = await Conversation.find({sendeId:ReceiverId, receiverId : SenderId});
        if(data) return res.status(200).json(data.notSeen);
    }catch {
        console.log("number of not seen contoller failed");
        return res.status(500).json({error:"internal server error"});
    }
    
}



module.exports = {SendMessage , getMessage , numberNotSeen }