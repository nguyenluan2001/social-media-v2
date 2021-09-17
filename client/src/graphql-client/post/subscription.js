import {gql} from "@apollo/client"
const newPost=gql`
    subscription newPost
    {
        newPost
        {
            # id
            # body
            # user{
            #     id
            #     username
            # }
            # likes{
            #     postID
            #     user
            #     {
            #         id
            #         username
            #     }
            # }
            # comments{
            #     user{
            #         id
            #         username
            #     }
            #     content
            # }
            # createdAt
            id
            body
            media
            user{
                id
                username
            }
        }
    }
`
const newLike=gql`
    subscription newLike
    {
        newLike
        {
            postID
            user
            {
                id
                username
            }
            status
        }
    }
`
const newComment=gql`
    subscription newComment
    {
        newComment {
            postID
            content
            user {
                id
                username
            }
        }
    }
`
const deletePost=gql`
    subscription deletePost
    {
        deletePost
    }
`
export {newPost,newLike,deletePost,newComment}