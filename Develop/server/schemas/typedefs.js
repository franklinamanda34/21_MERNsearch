// schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID
username: String
email: String
# Add other fields as needed
}
type Auth {
 token: ID!
    user: User
  }

  type Book {
    # Define your Book type fields
  }

  # Define your other types as needed

  type Query {
    getSingleUser(user: UserInput, params: ParamsInput): User
    # Add other queries
  }

  type Mutation {
    createUser(body: UserInput): Auth
    login(body: LoginInput): Auth
    saveBook(user: UserInput, body: BookInput): User
    deleteBook(user: UserInput, params: ParamsInput): User
    # Add other mutations
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    username: String
    email: String
    password: String
  }

  input BookInput {
    # Define your BookInput fields
  }

  input ParamsInput {
    id: ID
    username: String
    # Add other input fields as needed
  }
`;

module.exports = typeDefs;