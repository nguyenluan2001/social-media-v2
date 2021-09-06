const User=require("../models/User")
const jwt=require("jsonwebtoken")
const md5=require("md5")
const checkAuthHelper=require("../helper/checkAuthHelper")
require("dotenv").config()
const register =async (args) => {
    let {username,email,password,gender}=args
    let hashedPassword=md5(password)
    let user=new User({username,email,password:hashedPassword,gender})
    return await user.save()
 
}
const login=async (args)=>{
    let {email,password}=args
    password=md5(password)
    let user=await User.findOne({email,password})
    if(user)
    {
        let token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)
        return {
            ...user._doc,
            token:token
        }
    }
    else
    {
        throw new Error("Email or password wrong")
    }
}
const checkAuth=async (req)=>{
    try
    {
        // let token=req.headers.authorization.split(" ")[1]
        // let {id}=jwt.verify(token,process.env.JWT_SECRET)
        // let user=await User.findOne({_id:id})
        let user=await checkAuthHelper(req)
        console.log(user)
        if(user)
        {
            console.log(11111)
            return {
                ...user._doc,
                id:user._id,

            }
        }
        else
        {
            throw new Error("Authenticated fail")
        }
    }
    catch(error)
    {
        throw new Error(error.message)
    }


}
const getUser=async (userID)=>{
    return await User.findOne({_id:userID})
}
module.exports = { register,login,checkAuth,getUser }