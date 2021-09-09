const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    friends:Array,
    gender:String
})
module.exports=mongoose.model("User",userSchema)