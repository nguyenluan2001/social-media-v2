const checkAuthHelper=require("../helper/checkAuthHelper")
const Post=require("../models/Post")
const User=require("../models/User")
const createPost=async (body,media,req,pubusb)=>{
    let user=await checkAuthHelper(req)
    let post=new Post({body:body,media:media,userID:user._id})
    post=await post.save()
    pubusb.publish("NEW_POST",{
        newPost:post
    })
    return post
}
const getAllPosts=async ()=>{
    return await Post.find({}).sort({createdAt:"desc"})
}
const getPostByUserID=async (userID)=>{
    return await Post.find({userID:userID}).sort({"createdAt":'desc'})
}
const likePost=async (req,postID,pubsub)=>{
    let user=await checkAuthHelper(req)
    let post=await Post.findOne({_id:postID})
    let newLikes=post.likes?post.likes:[]
    if(newLikes.includes(user._id))
    {
        let index=newLikes.findIndex(item=>item==user._id)
        newLikes.splice(index,1)
        pubsub.publish("NEW_LIKE",{
            newLike:{
                ...user._doc,
                id:user._id,
                postID:postID,
                status:"unlike"
               
            }
        })
    }
    else
    {
        newLikes.push(user._id)
        pubsub.publish("NEW_LIKE",{
            newLike:{
                ...user._doc,
                id:user._id,
                postID:postID,
                status:"like"
               
            }
        })
        console.log(111)
    }
    await Post.updateOne({_id:postID},{likes:newLikes})
    pubsub.publish("NEW_LIKE",{
        newLike:{
            ...user._doc,
            id:user._id,
            postID:postID
           
        }
    })
    return {
        ...user._doc,
        id:user._id,
        postID:postID

    }
}
const commentPost=async (postID,content,req,pubsub)=>{
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
    pubsub.publish("NEW_COMMENT",{
        newComment:{
            postID:postID,
            content:content,
            ...user._doc,
            userID:user._id
        }
    })
    return {
        content:content,
        ...user._doc,
        userID:user._id

    }
}
const editPost=async (postID,body,req)=>{
    let user=await checkAuthHelper(req)
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
const deletePost=async (postID,req,pubsub)=>{
    let user=await checkAuthHelper(req)
    if(user)
    {
        pubsub.publish("DELETE_POST",{
            deletePost:postID
        })

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
const savePost=async (postID,req)=>{
    let user=await checkAuthHelper(req)
    if(user)
    {
        let currentUser=await User.findOne({_id:user._id})
       let savedPosts=currentUser.savedPosts?currentUser.savedPosts:[]
       savedPosts.push(postID)
       await User.updateOne({_id:user._id},{
           savedPosts
       })
       return true
    }
    else {
        throw new Error("Authenticated fail")
    }
}
module.exports={createPost,
    getAllPosts,likePost,
    commentPost,getPostByUserID,
    editPost,deletePost,savePost}