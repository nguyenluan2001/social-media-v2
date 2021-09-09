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
                likes{
                    id
                    username
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
                }
            }
            friends{
                id
                username
            }

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
        }
    }
`
export { checkAuth, getUser }