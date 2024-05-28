const User = require("../MODELS/user.model");
const bcrypt = require("bcrypt");
const GenTokenAndSetCookie = require("../UTILS/GenTokenAndSetCookie");
const jwt = require("jsonwebtoken");
const  AvatarGenerator = require("../UTILS/AvatarGen.js");
const login = async (req,res) => {
    const {username , password} = req.body;
    try {
        const user = await User.findOne({username: username});
        if(user){
            const PswCompare = await bcrypt.compare(password , user.password);
            if(!PswCompare)
                return res.status(400).json({error:"error,Invalid password"});
            GenTokenAndSetCookie(user._id,res);
            return res.status(200).json({msg:"token added" , id:user._id , profilePicture : user.profilePicture });
        }
        return res.status(400).json({error:"error,invalid username"});
    } catch (error) {
        console.log("login controlled failed" + error);
        return res.status(500).json({error:"Internal Server Error" + error});
    }
}

const signup = async (req,res)=>{
   
    const {fullname ,username , gender , password  , confirmedPassword} = req.body;

    try {
        
        if(password !== confirmedPassword) 
            return res.status(400).json({error : "password don't match"});

        const user = await User.findOne({username});
        if(user) 
            return res.status(400).json({error : "user already exists"});

        const hashedpsw = await bcrypt.hash(password , 10);

        const NewUser = new User({
           fullName : fullname,
           username : username,
           gender :gender,
           password : hashedpsw,
           profilePicture : AvatarGenerator(gender)
        });
        await NewUser.save().then(()=>{
            console.log("user successfully saved to the DB");
        }).catch(()=>{
            return res.status(500).json({error:"Failed to save user to the DB"});
        })

        return res.status(200).json({
            _id:NewUser.id,
            fullname : NewUser.fullName,
            username:NewUser.username,
            gender : NewUser.gender
        });
    } catch (error) {
        console.log("signup controller failure");
        return res.status(500).json({error:"Internal Server Error"});
    }
}


const logout = (req,res)=>{
    try {
        console.log("logout controller reached");
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({msg:"Token removed"});
    } catch (error) {
        console.log("logout controller failure" + error);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

const verifyCookie = (req,res)=>{
    const token  = req.cookies.jwt;
    const UserId = req.query.UserId;
    console.log(token , UserId);
    try {
        if(!token)
            return res.status(401).json({error : "Anauthorized , No Token provided"});
        const decoded = jwt.verify(token , process.env.TOKEN_SECRET);
        if(decoded.userId!==UserId)
            return res.status(401).json({error: "Unauthorized , wrong token provided"});
        return res.status(200).json({success:true});
    } catch (error) {
        console.log("error in token controller");
        return  res.status(500).json({error: "Internal Server Error"});
    }
}


module.exports = { login , signup , logout ,verifyCookie};