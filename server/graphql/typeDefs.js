const gql = require("graphql-tag")

const typeDefs = gql`
    type User{
        id:ID
        username:String
        email:String
        gender:String
        token:String
    }
    type Post{
        body:String
        user:User
        createdAt:String
    }
    type Query{
        # ====== User ======
      getUser(id:ID):User
      checkAuth:User
    #   ========= Post ======
     getPosts:[Post]
    }
    type Mutation{
    #    ====== User =======
        register(username:String,email:String,password:String,gender:String):User
        login(email:String,password:String):User
        # ======== Post ======
        createPost(body:String):Post
        
    }
`
module.exports = typeDefs