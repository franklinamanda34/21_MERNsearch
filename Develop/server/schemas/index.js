const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const { typeDefs } = require('./typedefs.js');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 3001;
const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./userTypeDefs');
const typeDefsArray = [userTypeDefs];

module.exports = { typeDefs };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-search-engine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
