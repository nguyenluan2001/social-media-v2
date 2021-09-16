import {gql} from "@apollo/client"
const newFriend=gql`
    subscription newFriend{
        newFriend{
            id
            username
            status
        }
    }
`
export {newFriend}