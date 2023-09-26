const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const resolvers = require("./src/resolver")
const typeDefs = require("./src/schema")

async function startApolloServer() {
  
  const server = new ApolloServer({
    typeDefs, resolvers,  
    
  });

  
  const app = express();

  
  await server.start();

   server.applyMiddleware({ app });


  
  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}


startApolloServer();
