// const Invite = require("../MODELS/invitation");
// const User = require("../MODELS/user.model");
// const{ GetSocketId , io} = require("../SOCKET/socket.js");
// const GetSpecificUser = async (req,res) => { 
//     const searchedUser = req.query.searchedUser;
//     const senderId = req.user._id;
//     try {
//         const foundUser = await User.findOne({username : searchedUser , _id:{$ne:senderId}});
//         if(foundUser) {
//             const friend = await User.findOne({_id:senderId , friends : {friendId : {"$in":[foundUser._id.toString()]}}});
//             const invite = await Invite.findOne({senderId : senderId , receiverId : foundUser._id.toString() });
//             const isInvited = invite ? true : false;
//             const bool = friend ? true : false;
//             return res.status(200).json({foundUser : foundUser , bool : bool ,invited : isInvited});
//         }
//         return res.status(200).json([]);
//         } catch (error) {
//         console.log("error in getSpeficUser controller");
//         return res.status(500).json({error:"Internal Server Error"});
//     }
// }

// module.exports = GetSpecificUser;
const Invite = require("../MODELS/invitation");
const User = require("../MODELS/user.model");
const { GetSocketId, io } = require("../SOCKET/socket.js");

const GetSpecificUser = async (req, res) => {
    const searchedUser = req.query.searchedUser;
    const senderId = req.user._id;

    try {
        // Find the user being searched, excluding the sender themselves
        const foundUser = await User.findOne({ username: searchedUser, _id: { $ne: senderId } });

        if (foundUser) {
            // Check if the foundUser is already a friend of the sender
            const friend = await User.findOne({ 
                _id: senderId, 
                'friends.friendId': foundUser._id 
            });

            // Check if an invite has been sent
            const invite = await Invite.findOne({ senderId: senderId, receiverId: foundUser._id });

            const isInvited = !!invite; // Boolean to check if an invite exists
            const bool = !!friend; // Boolean to check if the user is a friend

            return res.status(200).json({ foundUser,bool, invited: isInvited });
        }

        return res.status(200).json([]);
    } catch (error) {
        console.log("error in GetSpecificUser controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = GetSpecificUser;
