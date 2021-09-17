import { gql } from "@apollo/client"
const getPosts = gql`
    query getPosts
    {
        getPosts
        {
            id
            body
            media
            user{
                id
                username
                avatar
            }
            likes{
                postID
                user
                {
                    id
                    username
                }
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