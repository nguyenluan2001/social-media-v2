const userResolver=require("./user")
const postResovler=require("./post")
const likeResolver=require("./like")
const { PubSub } = require('graphql-subscriptions')
const { withFilter } =require('graphql-subscriptions');
const { subscribe } = require("graphql");

// const pubsub=new PubSub()
const resolvers={
    Subscription:{
        newUser:{
            subscribe:(_,args,context)=>{
                return  context.pubsub.asyncIterator(["NEW_USER"])
            }
        },
        newFriend:{
            subscribe:(_,args,{pubsub})=>{
                return pubsub.asyncIterator("NEW_FRIEND")
            }
        },
        newPost:{
           
            subscribe:(_,args,{userHelper,pubsub})=>{
                return  pubsub.asyncIterator(["NEW_POST"])
            }
        },
        newLike:{
           
            subscribe:(_,args,{pubsub})=>{
                return  pubsub.asyncIterator("NEW_LIKE")
            }
        },
        newLikeProfile:{
            subscribe:(_,args,{pubsub})=>{
                return pubsub.asyncIterator("NEW_LIKE_PROFILE")
            }
        },
        newComment:{
            subscribe:(_,args,{pubsub})=>{
                return pubsub.asyncIterator("NEW_COMMENT")
            }
        },
        deletePost:{
           
            subscribe:(_,args,{pubsub})=>{
                return  pubsub.asyncIterator(["DELETE_POST"])
            }
        },

    },
    User:{...userResolver.User},
    Friend:{...userResolver.Friend},
   Post:{...postResovler.Post},
   Like:{...likeResolver.Like},
   Comment:{...postResovler.Comment},
    Query:{
        ...userResolver.Query,
        ...postResovler.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResovler.Mutation
    },
 
}
module.exports=resolvers