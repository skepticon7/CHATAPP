const User = require("../MODELS/user.model");
const bcrypt = require("bcrypt");
const BoyPic = "https://avatar.iran.liara.run/public/boy?username=Scott";
const GirlPic = "https://avatar.iran.liara.run/public/girl?username=Maria";
const GenTokenAndSetCookie = require("../UTILS/GenTokenAndSetCookie");
const login = async (req,res) => {
    const {username , password} = req.body;
    try {
        const user = await User.findOne({username: username});
        if(user){
            const PswCompare = await bcrypt.compare(password , user.password);
            if(!PswCompare)
                return res.status(400).json({error:"error,Invalid password"});
            GenTokenAndSetCookie(user._id,res);
            return res.status(200).json({msg:"token added" , id:user._id });
        }
        return res.status(400).json({error:"error,invalid username"});
    } catch (error) {
        console.log("login controlled failed");
        return res.status(500).json({error:"Internal Server Error"});
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
           profilePicture : gender === 'male' ? BoyPic : GirlPic
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
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({msg:"Token removed"});
    } catch (error) {
        console.log("logout controller failure");
        return res.status(500).json({error:"Internal Server Error"});
    }
}


module.exports = { login , signup , logout};