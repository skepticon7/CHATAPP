const express = require("express");
const dotenv = require("dotenv");
const ConnectToDb = require("./DB/ConnectToDb");
const authRoutes = require("./ROUTES/auth.routes.js");
const MessageRoute = require("./ROUTES/messages.routes.js");
const UserRoute  = require("./ROUTES/user.routes.js");
const cookieParser = require("cookie-parser"); 
const {app, server} = require("./SOCKET/socket.js");
const path = require("path");
const cors = require('cors');

app.use(cors({
  origin: 'https://chatify-pod8.onrender.com',
  credentials: true,
}));
dotenv.config();

ConnectToDb();

const dirname = path.resolve();
app.use(express.static(path.join(dirname ,"/frontend/my-chat-app/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(dirname , "frontend" ,"my-chat-app" , "dist"   , "index.html"));
})

app.use(express.json());
app.use(cookieParser());
app.use("/api",authRoutes);
app.use("/api",MessageRoute);
app.use("/api",UserRoute);


const PORT = process.env.PORT || 3000;

server.listen(PORT , ()=>{
    
    console.log("listening on port "+PORT);
})