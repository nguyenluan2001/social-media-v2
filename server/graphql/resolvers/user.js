const Post=require("../../models/Post")
const userResolver={
    User:{
        posts:async (parent,args,{postHelper})=>{
            return await postHelper.getPostByUserID(parent._id)
        },
        savedPosts:async (parent,args,context)=>{
            console.log("savedposts",parent.savedPosts)
            return await Post.find({_id:{$in:parent.savedPosts}})
        }
    },
    Friend:{
        avatar:async (parent,args,{userHelper})=>{
            let user=await userHelper.getUser(parent.id)
            return user.avatar
        }
    },
    Query:{
        getUser:async (parents,{userID},{userHelper})=>{
            return  await userHelper.getUser(userID)
        },
        checkAuth:async (_,args,{userHelper,req})=>{
            return userHelper.checkAuth(req)
        }
    },
    Mutation:{
        register:async (parent,args,{userHelper,pubsub})=>{
            // const user={
            //     username:args.username,
            //     email:args.email,
            //     password:args.password,
            //     gender:args.gender
            // }
            // pubsub.publish("NEW_USER",{
            //     newUser:{
            //         username:args.username,
            //         email:args.email,
            //         password:args.password,
            //         gender:args.gender
            //     }
            // })
            return userHelper.register(args,pubsub)
           
        },
        login:async (_,args,{userHelper})=>{
            return userHelper.login(args)
        },
        addFriend:async (_,{userID},{userHelper,req,pubsub})=>{
            return await userHelper.addFriend(userID,req,pubsub)
        },
        updateProfile:async (_,{avatar,background},{req,userHelper})=>{
            return userHelper.updateProfile(avatar,background,req)
        }
    }
}
module.exports=userResolver