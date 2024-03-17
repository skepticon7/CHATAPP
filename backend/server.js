const express = require("express");
const dotenv = require("dotenv");
const ConnectToDb = require("./DB/ConnectToDb");
const authRoutes = require("./ROUTES/auth.routes.js");
const MessageRoute = require("./ROUTES/messages.routes.js");
const UserRoute  = require("./ROUTES/user.routes.js");
const RouterProtection = require("./MIDDLWARE/ProtectionMiddlware.js");
const cookieParser = require("cookie-parser"); 



dotenv.config({path : "../.env"});
const app = express();
ConnectToDb();
app.use(express.json());
app.use(cookieParser());
app.use("/api",authRoutes);
app.use("/api",MessageRoute);
app.use("/api",UserRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    
    console.log("listening on port "+PORT);
})