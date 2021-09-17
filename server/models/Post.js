const mongoose=require("mongoose")
const schemaOptions = {
    timestamps: true,
  };
const postSchema=mongoose.Schema({
    body:String,
    media:String,
    userID:String,
    likes:Array,
    comments:Array
},schemaOptions)
module.exports=mongoose.model("Post",postSchema)