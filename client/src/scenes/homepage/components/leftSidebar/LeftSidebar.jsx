import React from 'react'
import { Link } from 'react-router-dom'
import { Container, ListItem, ListFriend } from "./style"
import {
    FaRss, FaComment,
    FaPlayCircle, FaUsers,
    FaRegBookmark, FaRegQuestionCircle,
    FaShoppingBag, FaRegCalendarAlt, FaAward
} from "react-icons/fa"
function LeftSidebar() {
    return (
        <Container>
            <ListItem>
                <li>
                    <Link>
                        <FaRss></FaRss>
                        <span>Feed</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaComment></FaComment>
                        <span>Chats</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaPlayCircle></FaPlayCircle>
                        <span>Videos</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaUsers></FaUsers>
                        <span>Groups</span>
                    </Link>
                </li>
                <li>
                    <Link to="/saved">
                        <FaRegBookmark></FaRegBookmark>
                        <span>Bookmarks</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaRegQuestionCircle></FaRegQuestionCircle>
                        <span>Questions</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaShoppingBag></FaShoppingBag>
                        <span>Jobs</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaRegCalendarAlt></FaRegCalendarAlt>
                        <span>Events</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaAward></FaAward>
                        <span>Courses</span>
                    </Link>
                </li>
            </ListItem>
            <ListFriend>
                <li>
                    <Link>
                        <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                        <span className="username">luannguyen</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                        <span className="username">luannguyen</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                        <span className="username">luannguyen</span>
                    </Link>
                </li>
            </ListFriend>
        </Container>
    )
}

export default LeftSidebar
