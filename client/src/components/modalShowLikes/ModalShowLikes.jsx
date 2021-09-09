import React from 'react'
import { FaUserPlus, FaTimesCircle } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { Container, Content, ListUser } from "./style"
function ModalShowLikes({ setToggleModalShowLikes, likes }) {
    return (
        <Container>
            <Content>
                <ListUser>
                    {
                        likes.map(item => {
                            return (
                                <li>
                                    <div className="userInfo">
                                        <Link to={`/user/${item.id}`} className="avatar">
                                            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                                        </Link>
                                        <Link to={`/user/${item.id}`} className="username">{item?.username}</Link>
                                    </div>
                                    <div className="action">
                                        <FaUserPlus></FaUserPlus>
                                        Add friend
                                    </div>
                                </li>
                            )
                        })
                    }

                </ListUser>
                <div className="close" onClick={() => setToggleModalShowLikes(false)}>
                    <FaTimesCircle></FaTimesCircle>
                </div>
            </Content>
        </Container>
    )
}

export default ModalShowLikes
