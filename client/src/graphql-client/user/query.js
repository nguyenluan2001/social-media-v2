import {gql} from "@apollo/client"
const checkAuth=gql`
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
export {checkAuth}