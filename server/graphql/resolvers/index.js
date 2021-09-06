const userResolver=require("./user")
const postResovler=require("./post")
const resolvers={
   Post:{...postResovler.Post},
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