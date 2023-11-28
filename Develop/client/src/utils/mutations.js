import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
// Define mutation 
export const LOGIN_USER = gql`
mutation LoginUser($body: LoginInput) {
loginUser(body: $body) {
token
user {
_id
username
email
# Add other user fields as needed
}
}
}
`;

export const ADD_USER = gql`
mutation AddUser($body: UserInput) {
addUser(body: $body) {
token
user {
_id
username
email
# Add other user fields as needed
}
}
}
`;
export const SAVE_BOOK = gql`
mutation SaveBook($user: UserInput, $body: BookInput) {
saveBook(user: $user, body: $body) {
_id
username
email
savedBooks {
# Define your Book fields
}
}
}
`;
export const REMOVE_BOOK = gql`
mutation RemoveBook($user: UserInput, $bookId: ID) {
removeBook(user: $user, bookId: $bookId) {
_id
username
email
savedBooks {
# Define your Book fields
}
}
}
`;
export const useLoginUser = () => {
return useMutation(LOGIN_USER);
};
export const useAddUser = () => {
return useMutation(ADD_USER);
};
export const useSaveBook = () => {
return useMutation(SAVE_BOOK);
};
export const useRemoveBook = () => {
return useMutation(REMOVE_BOOK);
};
