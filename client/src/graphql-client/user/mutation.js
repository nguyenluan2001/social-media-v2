import {gql} from "@apollo/client"
const register=gql`
    mutation register($username:String,$email:String,$password:String,$gender:String)
    {
        register(username:$username,email:$email,password:$password,gender:$gender)
        {
            id
            username
            email
            gender
        }
    }
`
const login=gql`
    mutation login($email:String,$password:String)
    {
        login(email:$email,password:$password)
        {
            token
        }
    }
`
const addFriend=gql`
    mutation addFriend($userID:ID)
    {
        addFriend(userID:$userID)
    }
`
export {register,login,addFriend}