const mongoose=require("mongoose")
const schemaOptions = {
    timestamps: true,
  };
const postSchema=mongoose.Schema({
    body:String,
    userID:String,
},schemaOptions)
module.exports=mongoose.model("Post",postSchema)