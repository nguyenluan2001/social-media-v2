import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { Container } from "./style"
function ListFriends({ friends,id }) {
    // const {id}=useParams()
    // console.log(useParams())
    return (
        <Container>
            <div className="title">
                <span>Friends</span>
                <Link to={`/user/${id}/friends`}>All friends</Link>
            </div>
            <p className="num-friends">{friends?.length} friends</p>
            <ul className="list-friends">
                {
                    friends?.map(item => {
                        return (
                            <li>
                                <Link to={`/user/${item.id}`}>
                                    <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="" />
                                    <span className="username">{item.username}</span>
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>

        </Container>
    )
}

export default ListFriends
