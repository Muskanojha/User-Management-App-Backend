const express = require("express")
const mongoose = require("mongoose")
const route = require("./Routes/route")

const app = express()

app.use(express.json())   //Middleware
app.use("/", route)   //Middleware

//Database Connection

mongoose.connect("mongodb+srv://muskanojha2004:CcNEjthuZtiwXo95@cluster0.sshrhzv.mongodb.net/userManagement")
.then(() => console.log("database connected"))
. catch(() => console.log("database not connected"))

//Server Connection


app.get("/",(req,res) => {
    res.send("Hello from express js")
})

const PORT = 4000;
app.listen(4000,(err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Server is running at port 4000");
        
    }
})