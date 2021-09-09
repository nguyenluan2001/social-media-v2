import { gql } from "@apollo/client"
const getPosts = gql`
    query getPosts
    {
        getPosts
        {
            id
            body
            user{
                id
                username
            }
            likes{
                id
                username
            }
            comments{
                user{
                    id
                    username
                }
                content
            }
            createdAt
        }
    }
`
export { getPosts }