const Conversation = require("../MODELS/conversation.model");
const Message = require("../MODELS/message.model");
const mongoose = require("mongoose");
const SendMessage = async (req,res)=>{
    const {message,ReceiverId} = req.body;
    const SenderId = req.user._id;
    try {
        if(mongoose.Types.ObjectId.isValid(SenderId) && mongoose.Types.ObjectId.isValid(ReceiverId)){
            const conversation = await Conversation.findOne({participants:[ReceiverId,SenderId]});
            console.log(conversation);
            if(!conversation){
                const NewMsg = new Message({
                    senderId : SenderId,
                    receiverId:ReceiverId,
                    message:message
                });
                await NewMsg.save();
                const NewConv = new Conversation({
                    participants:[ReceiverId,SenderId],
                    messages :[NewMsg._id.toString()],
                })
                await NewConv.save()
                return res.status(200).json({msg : "successfully added a conversation and a message"});
            }
            else{
                const NewMsg = new Message({
                    senderId : SenderId,
                    receiverId:ReceiverId,
                    message:message
                });
                await NewMsg.save();
                if(NewMsg){
                    await Conversation.updateOne({$push:{messages : NewMsg._id.toString()}}).then(()=>{
                        console.log("updated successfully");
                    }).catch((err)=>{
                        console.log(err.message);
                    });
                    console.log(NewMsg._id);
                    return res.status(200).json({msg:"successfully sent a message"});
                }
            }
            
        }
        

    } catch (error) {
        console.log("error in send message contoller",error.message);
        return res.status(500).json({error:"Internal server error3"});
    }
   
}

const getMessage = async (req,res)=>{
   try {
    const UserTochatToID = req.query.friend;
    const SenderId = req.user._id;
    if(mongoose.Types.ObjectId.isValid(UserTochatToID) && mongoose.Types.ObjectId.isValid(SenderId)){
         const conversation = await Conversation.findOne({participants:{$all:[SenderId , UserTochatToID]}}).populate("messages");
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

module.exports = {SendMessage , getMessage};