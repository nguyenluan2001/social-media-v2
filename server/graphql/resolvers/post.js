const User = require("../../models/User")

const postResovler={
    Post:{
        id:async (parent,args)=>{
            return parent._id
        },
        user:async (parent,args,{userHelper})=>{
            return await userHelper.getUser(parent.userID)
        },
        likes:async (parent,args,{userHelper})=>{
            return await userHelper.getListUsers(parent.likes)
        }
    },
    Comment:{
        user:async (parent,args)=>{
            console.log(parent)
            return await User.findOne({_id:parent.userID})
        }
    },
    Query:{
        getPosts:async (parent,args,{postHelper})=>{
            return await postHelper.getAllPosts()
        }
    },
    Mutation:{
        createPost:async (parent,{body},{postHelper,req})=>{
            return await postHelper.createPost(body,req)
        },
        likePost:async (parent,{postID},{postHelper,req})=>{
            return await postHelper.likePost(req,postID)
        },
        commentPost:async (parent,{content,postID},{postHelper,req})=>{
            return await postHelper.commentPost(postID,content,req)
        },
        editPost:async (_,{postID,body},{postHelper,req})=>{
            return await postHelper.editPost(postID,body,req)
        },
        deletePost:async(_,{postID},{postHelper,req})=>{
            return await postHelper.deletePost(postID,req)
        }
    }
}
module.exports=postResovler