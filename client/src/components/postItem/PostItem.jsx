import React, { useState } from 'react'
import {
    Container,
    UserInfo, InteractSection,
    ListAction, CommentSection,
    ListComment
} from "./style"
import { BiLike, BiMessageAlt, BiShare } from "react-icons/bi"
import { Link } from 'react-router-dom'
function PostItem({ post }) {
    const [toggleComments, setToggleComment] = useState(false)
    let date = new Date(post?.createdAt)
    console.log(post?.createdAt)
    console.log(date)
    return (
        <Container>
            <UserInfo>
                <Link to="/" className="avatar">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                </Link>
                <div className="wp-name">
                    <span className="name">
                        <Link to="/">{post?.user.username}</Link>
                    </span>
                    <span>2 hours</span>
                </div>
            </UserInfo>
            <div className="post-content">
                <p>{post?.body}</p>
            </div>
            <div className="interact-info">
                <div className="likes">1000</div>
                <div className="comments" onClick={() => setToggleComment(pre => !pre)}>100 comments</div>
            </div>
            <InteractSection>
                <ListAction>
                    <li>
                        <BiLike></BiLike>
                        <span>Like</span>
                    </li>
                    <li>
                        <BiMessageAlt></BiMessageAlt>
                        <span>Comment</span>
                    </li>
                    <li>
                        <BiShare></BiShare>
                        <span>Share</span>
                    </li>
                </ListAction>
                {toggleComments && <ListComment>
                    <CommentSection>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <input type="text" placeholder="Type something..." />
                    </CommentSection>
                    <li>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <div className="wp-comment-content">
                            <span className="username">luannguyen</span>
                            <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <div className="wp-comment-content">
                            <span className="username">luannguyen</span>
                            <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <div className="wp-comment-content">
                            <span className="username">luannguyen</span>
                            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, nam? Soluta laborum nesciunt impedit. Et corporis quibusdam veniam ab autem.</span>
                        </div>
                    </li>
                </ListComment>}
            </InteractSection>
        </Container>
    )
}

export default PostItem
