const checkAuthHelper=require("../helper/checkAuthHelper")
const Post=require("../models/Post")
const createPost=async (body,req)=>{
    let user=await checkAuthHelper(req)
    let post=new Post({body:body,userID:user._id})
    return await post.save()
}
const getAllPosts=async ()=>{
    return await Post.find({}).sort({createdAt:"desc"})
}

module.exports={createPost,getAllPosts}