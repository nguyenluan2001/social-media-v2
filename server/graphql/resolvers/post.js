const User = require("../../models/User")
const userHelper=require("../../database/userHelper")
const postResovler={
    Post:{
        id:async (parent,args)=>{
            return parent._id
        },
        user:async (parent,args,{userHelper})=>{
            return await userHelper.getUser(parent.userID)
            // return {
            //     id:"123456",
            //     username:"luannguyen"

            // }
        },
        likes:async (parent,args,{userHelper})=>{
            return await userHelper.getListUsers(parent.likes)
        }
    },
    Comment:{
        user:async (parent,args)=>{
            return await User.findOne({_id:parent.userID})
        }
    },
    Query:{
        getPosts:async (parent,args,{postHelper,name,pubsub})=>{
            return await postHelper.getAllPosts()
        }
    },
    Mutation:{
        createPost:async (parent,{body},{postHelper,req,pubsub})=>{
            return await postHelper.createPost(body,req,pubsub)
        },
        likePost:async (parent,{postID},{postHelper,req,pubsub})=>{
            return await postHelper.likePost(req,postID,pubsub)
        },
        commentPost:async (parent,{content,postID},{postHelper,req,pubsub})=>{
            return await postHelper.commentPost(postID,content,req,pubsub)
        },
        editPost:async (_,{postID,body},{postHelper,req})=>{
            return await postHelper.editPost(postID,body,req)
        },
        deletePost:async(_,{postID},{postHelper,req,pubsub})=>{
            return await postHelper.deletePost(postID,req,pubsub)
        },
        savePost:async (_,{postID},{postHelper,req})=>{
            return await postHelper.savePost(postID,req)
        }

    }
}
module.exports=postResovler