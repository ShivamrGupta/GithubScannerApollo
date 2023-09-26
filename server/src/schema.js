const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Repository {
    name: String
    size: Int
    owner: String
  }
  type Query {
    repositories: [Repository]
    repositoryDetails(owner: String!, name: String!): Repository
  }
`;

module.exports = typeDefs;
