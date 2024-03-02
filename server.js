//const { PublicClientApplication } = require("@azure/msal-node");
const express = require("express");
const path = require("path");


const app = express();





app.use("/static", express.static(path.resolve(__dirname, "shell-app","static")))


app.get("/login", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"shell-app", "login.html")); 
})


app.get("/*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"shell-app", "index.html")); 
})


app.listen( process.env.PORT || 5000, ()=> console.log("Server running...."));
