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
                    avatar
                }
                content
            }
            createdAt
        }
    }
`
const getPost=gql`
    query getPost($postID:String)
    {
        getPost(postID:$postID)
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
                    avatar
                }
                content
            }
            createdAt
            
        }
    }
`
export { getPosts,getPost }