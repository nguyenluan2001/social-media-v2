const gql = require("graphql-tag")

const typeDefs = gql`
    type User{
        id:ID
        username:String
        email:String
        gender:String
        posts:[Post]
        friends:[Friend]
        token:String
    }
    type Friend{
        id:ID
        username:String
    }
    type Post{
        id:ID
        body:String
        user:User
        likes:[Like]
        comments:[Comment]
        createdAt:String
    }
    type Like{
        user:User,
        postID:ID
        status:String
    }
    type Comment{
        user:User
        content:String,
        postID:ID
    }
    type Subscription{
        newUser:User,
        newPost:Post,
        newLike:Like,
        newComment:Comment,
        deletePost:ID
    }
    type Query{
        # ====== User ======
      getUser(userID:ID):User
      checkAuth:User
    #   ========= Post ======
     getPosts:[Post]
    }
    type Mutation{
    #    ====== User =======
        register(username:String,email:String,password:String,gender:String):User
        login(email:String,password:String):User
        addFriend(userID:ID):Friend
        # ======== Post ======
        createPost(body:String):Post
        likePost(postID:ID):Like
        commentPost(postID:ID,content:String):Comment
        editPost(postID:ID,body:String):Boolean
        deletePost(postID:ID):Boolean
        
    }
`
module.exports = typeDefs