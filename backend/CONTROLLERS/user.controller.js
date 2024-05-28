const User = require("../MODELS/user.model");
const mongoose = require("mongoose");

const GetUsers = async (req, res) => {
    try {
        const LoggedUser = req.user._id; 
        console.log("reached");
        if (mongoose.Types.ObjectId.isValid(LoggedUser)) {
            // Find the logged-in user and populate the friendId in the friends array
            const userWithFriends = await User.findOne({ _id: LoggedUser }).populate("friends.friendId");
            
            if (userWithFriends) {
                
                return res.status(200).json({data :userWithFriends.friends });
            }
            
            return res.status(404).json("User not found");
        } else {
            return res.status(400).json("Invalid user ID");
        }
    } catch (error) {
        console.log("error in user controller", error.message);
        return res.status(500).json("Internal server error, couldn't retrieve data!!");
    }
}

module.exports = GetUsers;


