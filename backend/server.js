const express = require("express");
const dotenv = require("dotenv");
const ConnectToDb = require("./DB/ConnectToDb");
const authRoutes = require("./ROUTES/auth.routes.js");
const MessageRoute = require("./ROUTES/messages.routes.js");
const UserRoute  = require("./ROUTES/user.routes.js");
const cookieParser = require("cookie-parser"); 
const {app, server} = require("./SOCKET/socket.js");
const path = require("path");

dotenv.config();

ConnectToDb();


app.use(express.static(path.join(__dirname ,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname , "frontend" ,"dist" , "index.html"));
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