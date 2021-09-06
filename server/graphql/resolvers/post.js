const postResovler={
    Post:{
        user:async (parent,args,{userHelper})=>{
            return await userHelper.getUser(parent.userID)
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
        }
    }
}
module.exports=postResovler