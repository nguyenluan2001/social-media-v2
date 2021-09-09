const userResolver=require("./user")
const postResovler=require("./post")
const resolvers={
    User:{...userResolver.User},
    Friend:{...userResolver.Friend},
   Post:{...postResovler.Post},
   Comment:{...postResovler.Comment},
    Query:{
        ...userResolver.Query,
        ...postResovler.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResovler.Mutation
    }
}
module.exports=resolvers