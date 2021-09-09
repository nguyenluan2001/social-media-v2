import React, { useState, useContext } from 'react'
import {
    Container,
    UserInfo, InteractSection,
    ListAction, CommentSection,
    ListComment, TopSection
} from "./style"
import { BiLike, BiMessageAlt, BiShare } from "react-icons/bi"
import { Link } from 'react-router-dom'
import { likePost, commentPost, deletePost } from "../../graphql-client/post/mutation"
import { getPosts } from "../../graphql-client/post/query"
import { useMutation } from "@apollo/client"
import { AuthContext } from "../../services/context/Auth"
import ModalShowLikes from '../modalShowLikes/ModalShowLikes'
import { FaEllipsisH } from "react-icons/fa"
import ModalEditPost from '../modalEditPost/ModalEditPost'
function PostItem({ post }) {
    const [toggleComments, setToggleComment] = useState(false)
    const [likePostMutation, dataMutationLike] = useMutation(likePost)
    const [commentPostMutation, dataMutationComment] = useMutation(commentPost)
    const [deletePostMutation, dataMutationDelete] = useMutation(deletePost)
    const { authUser } = useContext(AuthContext)
    const [toggleModalShowLikes, setToggleModalShowLikes] = useState(false)
    const [toggleModalEditPost, setToggleModalEditPost] = useState(false)
    const [toggleSetting, setToggleSetting] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    console.log(authUser)
    function handleLikePost() {
        likePostMutation({
            variables: {
                postID: post.id
            },
            refetchQueries: [{ query: getPosts }]
        })
    }
    function handleChangeComment(e) {
        setCommentContent(e.target.value)
    }
    function handleSubmitComment(e) {
        e.preventDefault()
        commentPostMutation({
            variables: {
                postID: post.id,
                content: commentContent
            },
            refetchQueries: [{ query: getPosts }]
        })
        setCommentContent("")
    }
    function handleDeletePost() {
        deletePostMutation({
            variables: {
                postID: post.id
            },
            refetchQueries: [{ query: getPosts }]
        })
        
        setToggleSetting(false)
    }
    return (
        <Container>
            <TopSection>
                <UserInfo>
                    <Link to={`/user/${post?.user.id}`} className="avatar">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    </Link>
                    <div className="wp-name">
                        <span className="name">
                            <Link to={`/user/${post?.user.id}`}>{post?.user.username}</Link>
                        </span>
                        <span>2 hours</span>
                    </div>
                </UserInfo>
                <div className="setting">
                    <div className="icon" onClick={() => setToggleSetting(pre => !pre)}>
                        <FaEllipsisH></FaEllipsisH>
                    </div>
                    {toggleSetting && <ul className="list-settings">

                        {
                            post.user.id == authUser.id
                                ? <>
                                    <li>Save post</li>
                                    <li>Hide post</li>
                                    <li onClick={()=>setToggleModalEditPost(true)}>Edit post</li>
                                    <li onClick={() => handleDeletePost()}>Delete post</li>
                                </>
                                : <>
                                    <li>Save post</li>
                                    <li>Hide post</li>
                                </>
                        }

                    </ul>}
                </div>
            </TopSection>
            <div className="post-content">
                <p>{post?.body}</p>
            </div>
            <div className="interact-info">
                <div className="likes" onClick={() => setToggleModalShowLikes(true)}>
                    <img src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png" alt="" />
                    {post?.likes.findIndex(item => item.id == authUser.id) == -1
                        ? <span>{post?.likes.length} people likes this post</span>
                        : <span>You and {post?.likes.length - 1} others </span>
                    }
                </div>
                <div className="comments" onClick={() => setToggleComment(pre => !pre)}>
                    {post?.comments.length} comments
                </div>
            </div>
            <InteractSection>
                <ListAction>
                    {post.likes.findIndex(item => item.id == authUser.id) == -1
                        ? <li onClick={() => handleLikePost()}>
                            <BiLike></BiLike>
                            <span>Like</span>
                        </li>
                        : <li onClick={() => handleLikePost()} className="liked">
                            <BiLike></BiLike>
                            <span>Unlike</span>
                        </li>
                    }
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
                        <form action="" onSubmit={(e) => handleSubmitComment(e)}>
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                            <input type="text" placeholder="Type something..." value={commentContent} onChange={(e) => handleChangeComment(e)} />
                        </form>
                    </CommentSection>
                    {
                        post.comments.map(item => {
                            return (
                                <li>
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                                    <div className="wp-comment-content">
                                        <span className="username">{item.user.username}</span>
                                        <span>{item.content}</span>
                                    </div>
                                </li>
                            )
                        })
                    }


                </ListComment>}
            </InteractSection>
            {toggleModalShowLikes && <ModalShowLikes likes={post?.likes} setToggleModalShowLikes={setToggleModalShowLikes}></ModalShowLikes>}
            {toggleModalEditPost&&<ModalEditPost post={post} setToggleModalEditPost={setToggleModalEditPost}></ModalEditPost>}
        </Container>
    )
}

export default PostItem
