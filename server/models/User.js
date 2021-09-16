const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    friends:Array,
    avatar:String,
    background:String,
    savedPosts:Array,
    gender:String
})
module.exports=mongoose.model("User",userSchema)