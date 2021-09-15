const { ApolloServer } = require("apollo-server-express")
const { PubSub } = require('graphql-subscriptions')
const { SubscriptionServer }=require('subscriptions-transport-ws') ;
const { makeExecutableSchema } =require('@graphql-tools/schema') ;
const { execute, subscribe }=require('graphql');
const { createServer }=require('http');
const express = require("express")
const app = express()
const database = require("./config/database")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers/index")
const userHelper=require("./database/userHelper")
const postHelper=require("./database/postHelper");
const { connect } = require("http2");
database.connect()
const pubsub = new PubSub()
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        // console.log(pubsub)
        return {
            req,
            userHelper,
            postHelper,
            pubsub
        }
    },
    plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }],
})
const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams,webSocket,context) {
      return {
        pubsub,
        userHelper,
        postHelper}
      }
 }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
 });
console.log(server.graphqlPath)
async function serverStart() {
    await server.start();
    server.applyMiddleware({ app })
}
serverStart()
httpServer.listen(5000, () => {
    console.log("server listen at prot 5000")
})