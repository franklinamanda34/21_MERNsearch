import{useQuery} from '@apollo/client';
import{gql} from '@apollo/client';
export const GET_ME = gql`
query GetMe {
me {
_id
username
email
bookCount
savedBooks {
    authors
    description
    bookId
    image
    link
    title
savedBooks {

}
}
}
}`;
export const useGetMe = () => {
return useQuery(GET_ME);
};
