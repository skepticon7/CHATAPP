const jwt  = require("jsonwebtoken");
const User = require("../MODELS/user.model");

const ProtectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        console.log("token is : " + token);
        if(!token)
            return res.status(401).json({error : "Unauthorized access : no token provided"});
        
        const decoded  = jwt.verify(token , process.env.TOKEN_SECRET);
        if(!decoded)
            return res.status(401).json({error : "Unauthorized access : Token is invalid"});
        
        const user = await User.findById(decoded.userId);
        if(!user)
            return res.status(404).json({error:"User not found!"});
        req.user = user;
        next();
    } catch (error) {
        console.log("error in route protection middlware : " + error.message);
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports = ProtectRoute;