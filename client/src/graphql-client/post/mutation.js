import {gql} from "@apollo/client"
const createPost=gql`
    mutation createPost($body:String)
    {
        createPost(body:$body)
        {
            body
        }
        
    }
`
const likePost=gql`
    mutation likePost($postID:ID)
    {
        likePost(postID:$postID)
        {
            postID
            user{
                id
                username
            }
        }
    }
`
const commentPost=gql`
    mutation commentPost($postID:ID,$content:String)
    {
        commentPost(postID:$postID,content:$content)
        {
            content
            user{
                id
                username
            }
        }
    }
`
const editPost=gql`
    mutation editPost($postID:ID,$body:String)
    {
        editPost(postID:$postID,body:$body)
    }
`
const deletePost=gql`
    mutation deletePost($postID:ID)
    {
        deletePost(postID:$postID)
    }
`
const savePost=gql`
    mutation savePost($postID:ID)
    {
        savePost(postID:$postID)
    }
`
export {createPost,likePost,commentPost,deletePost,editPost,savePost}