const mongoose = require("mongoose");
const ConnectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("conneted successfully to the DB");
        })
    } catch (error) {
        console.log("error connecting to the DB",error);
    }
}


module.exports = ConnectToDb;