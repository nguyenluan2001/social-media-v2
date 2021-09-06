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
export {createPost}