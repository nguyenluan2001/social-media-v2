const jwt=require("jsonwebtoken")
const User=require("../models/User")
require("dotenv").config()
const checkAuthHelper=async(req)=>{
    let token=req.headers.authorization.split(" ")[1]
    let {id}=jwt.verify(token,process.env.JWT_SECRET)
    let user=await User.findOne({_id:id})
    return user
}
module.exports=checkAuthHelper