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
const getPostByUserID=async (userID)=>{
    return await Post.find({userID:userID}).sort({"createdAt":'desc'})
}
const likePost=async (req,postID)=>{
    console.log(postID)
    let user=await checkAuthHelper(req)
    let post=await Post.findOne({_id:postID})
    let newLikes=post.likes?post.likes:[]
    if(newLikes.includes(user._id))
    {
        let index=newLikes.findIndex(item=>item==user._id)
        newLikes.splice(index,1)
    }
    else
    {
        newLikes.push(user._id)
    }
    await Post.updateOne({_id:postID},{likes:newLikes})
    return true
}
const commentPost=async (postID,content,req)=>{
    let user=await checkAuthHelper(req)
    let post=await Post.findOne({_id:postID})

    let newComments=post.comments?post.comments:[]
    newComments.push({
        userID:user._id,
        content:content
    })
    await Post.updateOne({
        _id:postID
    },{
        comments:newComments
    })
    console.log(content)
    console.log(postID)
    return true
}
const editPost=async (postID,body,req)=>{
    let user=await checkAuthHelper(req)
    console.log(user)
    if(user)
    {
        await Post.updateOne({
            _id:postID,
            userID:user._id
        },{
            body:body
        })
      
       return true
    }
    else
    {
        throw new Error("Authenticated fail")
    }
}
const deletePost=async (postID,req)=>{
    let user=await checkAuthHelper(req)
    console.log(user)
    if(user)
    {

        await Post.deleteOne({
            _id:postID,
            userID:user._id
        })
       return true
    }
    else
    {
        throw new Error("Authenticated fail")
    }
}
module.exports={createPost,
    getAllPosts,likePost,
    commentPost,getPostByUserID,
    editPost,deletePost}