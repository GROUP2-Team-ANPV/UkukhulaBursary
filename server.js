const express = require("express");
const path = require("path");


const app = express();

app.use("/static", express.static(path.resolve(__dirname, "shell-app","static")))

app.get("/*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"shell-app", "index.html")); // everything is going to go back to indexhtml
})


app.listen( process.env.PORT || 5000, ()=> console.log("Server running...."));
