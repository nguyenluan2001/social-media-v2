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
const getListUsers=async (listUsers)=>{
    console.log(listUsers)
    return await User.find({_id:{$in:listUsers}})
}
const addFriend=async (userID,req)=>{
    let user=await checkAuthHelper(req)
    let makeFriendUser=await User.findOne({_id:userID})// user that auth user want to make friend
    console.log(user)
    if(user)
    {
       let friendsOfAuthUser=user.friends?user.friends:[]
       let friendsOfMakeFriendUser=makeFriendUser.friends?makeFriendUser.friends:[]
       if(friendsOfAuthUser.findIndex(item=>item==userID)!=-1)
       {
           let index1=friendsOfAuthUser.findIndex(item=>item==userID)
           friendsOfAuthUser.splice(index1,1)
            let index2=friendsOfMakeFriendUser.findIndex(item=>item==user._id)
            friendsOfMakeFriendUser.splice(index2,1)
       }
       else
       {
           friendsOfAuthUser.push(userID)
           friendsOfMakeFriendUser.push(user._id)
       }
       await User.updateOne({_id:user._id},{friends:friendsOfAuthUser})
       await User.updateOne({_id:userID},{friends:friendsOfMakeFriendUser})
       return user._id
    }
    else
    {
        throw new Error("Authenticated fail")
    }
}
module.exports = { register,login,checkAuth,getUser,getListUsers,addFriend }