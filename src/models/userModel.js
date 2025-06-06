const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type :String ,
        require : true , 
        trim : true
    },

    userEmail : {
        type : String,
        require : true , 
        trim : true ,
    },
    userContact :{
       type : Number , 
       require :true,
       trim : true ,
       },
    userAddress : {
        type : String ,
        require : true ,
        trim: true,
       },
    gender : {
        type : String ,
        require : true ,
        trim :true,
    },
    age : {
        type:Number,
        require : true , 
        trim : true,
    },

},{timestamps:true})

module.exports = new mongoose.model("user" , userSchema)