import { gql } from "@apollo/client"
const getUser = gql`
    query getUser($userID:ID)
    {
        getUser(userID:$userID)
        {
            username
            posts {
                id
                body
                media
                likes{
                    user
                    {
                        id
                        username
                        avatar
                    }

                }
                comments{
                    content
                    user{
                    id
                    username
                    }
                }
                user{
                    id
                    username
                    avatar
                }
            }
            friends{
                id
                username
                avatar
            }
            avatar
            background

        }
    }
`
const checkAuth = gql`
    query checkAuth
    {
        checkAuth
        {
            id
            username
            email
            gender
            avatar
            background
            savedPosts{
                id
                body
                user{
                    id
                    username
                    avatar
                }
            }
        }
    }
`
export { checkAuth, getUser }