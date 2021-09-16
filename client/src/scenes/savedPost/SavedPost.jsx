import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../services/context/Auth"
import { Container,LeftContent,RightContent } from "./style"
function SavedPost() {
    const { authUser } = useContext(AuthContext)
    console.log(authUser)
    return (
        <Container>
            <LeftContent></LeftContent>
            <RightContent>
                {
                    authUser?.savedPosts?.map(item => {
                        return <div className="post-item">
                            <Link to={`/user/${item.user.id}`} className="avatar">
                                <img src={item.user.avatar} alt="" />
                            </Link>
                            <div className="content">
                                <p className="body">{item.body}</p>
                            </div>
                        </div>
                    })
                }

            </RightContent>
        </Container>
    )
}

export default SavedPost
