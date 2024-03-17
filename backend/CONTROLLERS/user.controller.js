const User = require("../MODELS/user.model");
const mongoose = require("mongoose");
const GetUsers =async  (req,res)=>{
    try {
        
        const LoggedUser = req.user._id;
        if(mongoose.Types.ObjectId.isValid(LoggedUser)){
            const  AllUsers = await User.find({_id:{$ne:LoggedUser}});
            return res.status(200).json(AllUsers);
        }
        
        
    } catch (error) {
        console.log("error in user controller ",error.message);
        return res.status(500).json("internal server error , Couldn't retrieve data!!");
    }

}

module.exports = GetUsers;