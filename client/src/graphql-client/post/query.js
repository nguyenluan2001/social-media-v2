import { gql } from "@apollo/client"
const getPosts = gql`
    query getPosts
    {
        getPosts
        {
            body
            user{
                id
                username
            }
            createdAt
        }
    }
`
export { getPosts }