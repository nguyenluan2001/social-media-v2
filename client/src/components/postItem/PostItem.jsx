import React, { useState, useContext } from 'react'
import {
    Container,
    UserInfo, InteractSection,
    ListAction, CommentSection,
    ListComment, TopSection
} from "./style"
import { BiLike, BiMessageAlt, BiShare, BiBookmarkMinus } from "react-icons/bi"
import { FaRegBookmark, FaPen, FaTrashAlt, FaRegClock } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { likePost, commentPost, deletePost, savePost,unSavePost } from "../../graphql-client/post/mutation"
import { getPosts } from "../../graphql-client/post/query"
import { getUser, checkAuth } from "../../graphql-client/user/query"
import { useMutation } from "@apollo/client"
import { AuthContext } from "../../services/context/Auth"
import ModalShowLikes from '../modalShowLikes/ModalShowLikes'
import { FaEllipsisH } from "react-icons/fa"
import ModalEditPost from '../modalEditPost/ModalEditPost'
import { useDispatch } from "react-redux"
import { deletePost as deletepostProfile } from "../../services/redux/slices/profileSlice"
import { gql } from "@apollo/client"
function PostItem({ post, setSelectedPost }) {
    const [toggleComments, setToggleComment] = useState(false)

    const [commentPostMutation, dataMutationComment] = useMutation(commentPost
        //     , {
        //     update(cache, { data: commentPostMutation }) {
        //         console.log(commentPostMutation)
        //         console.log(cache)
        //         const postItem = cache.readFragment(
        //             {
        //                 id: `Post:${post.id}`, // The value of the to-do item's cache ID
        //                 fragment: gql`
        //                   fragment post on Post {
        //                     comments{
        //                         content
        //                         user{
        //                             id
        //                             username
        //                         }
        //                     }
        //                   }
        //                 `,
        //             }
        //         )
        //         let newComments = [...post.comments]
        //         newComments.push(commentPostMutation.commentPost)
        //         // console.log(newLikes)
        //         const temp = cache.writeFragment(
        //             {
        //                 id: `Post:${post.id}`, // The value of the to-do item's cache ID
        //                 fragment: gql`
        //                   fragment post on Post {
        //                     comments
        //                     {
        //                         content
        //                         user{
        //                             id
        //                             username
        //                         }
        //                     }
        //                   }
        //                 `,
        //                 data: {
        //                     comments: newComments
        //                 }
        //             }
        //         )
        //         // console.log(temp)

        //     }
        // }
    )
    const [deletePostMutation, dataMutationDelete] = useMutation(deletePost
        //     ,{
        //     update(cache,data)
        //     {
        //        cache.evict({
        //            id:`Post:${post.id}`
        //        })
        //     }
        // }
    )
    const { authUser,setAuthUser } = useContext(AuthContext)
    const [likePostMutation, dataMutationLike] = useMutation(likePost
        // , {
        // update(cache, { data: likePostMutation }) {
        //     console.log(likePostMutation)
        //     console.log(cache)
        //     const postItem = cache.readFragment(
        //         {
        //             id: `Post:${post.id}`, // The value of the to-do item's cache ID
        //             fragment: gql`
        //               fragment post on Post {
        //                 likes{
        //                     id
        //                     username
        //                 }
        //               }
        //             `,
        //         }
        //     )
        //     let newLikes = [...post.likes]
        //     let indexUserLike = newLikes.findIndex(item => item.id == authUser.id)
        //     console.log(indexUserLike)
        //     if (indexUserLike == -1) {
        //         newLikes.push(likePostMutation.likePost)
        //     }
        //     else {
        //         newLikes.splice(indexUserLike, 1)
        //     }
        //     // console.log(newLikes)
        //     const temp = cache.writeFragment(
        //         {
        //             id: `Post:${post.id}`, // The value of the to-do item's cache ID
        //             fragment: gql`
        //               fragment post on Post {
        //                 likes
        //                 {
        //                     id
        //                     username
        //                 }
        //               }
        //             `,
        //             data: {
        //                 likes: newLikes
        //             }
        //         }
        //     )
        //     // console.log(temp)

        // }
        // }
    )
    const [savePostMutation, dataSavePost] = useMutation(savePost,{
        update:(cache,{data:savePostMutation})=>{
            setAuthUser(pre=>{
                return {...pre,savedPosts:[...pre.savedPosts,savePostMutation.savePost]}
            })
        }
    })
    const [unSavePostMutation,dataUnSavePost]=useMutation(unSavePost,{
        update:(cache,{data:unSavePostMutation})=>{
            console.log("cache",cache)
            console.log("data",unSavePostMutation)
            let newSavedPosts=cache.readFragment({
                id:`User:${authUser.id}`,
                fragment:gql`
                    fragment savedPosts on User
                    {
                        savedPosts{
                            id
                            body
                            user{
                                id
                                username
                                avatar
                            }

                        }
                    }
                `
            })
             newSavedPosts=Object.assign({},newSavedPosts)
            newSavedPosts.savedPosts=newSavedPosts.savedPosts.filter(item=>item.id!=unSavePostMutation.unSavePost)
            setAuthUser(pre=>{
                return {...pre,savedPosts:newSavedPosts.savedPosts}
            })
            // cache.writeFragment({
            //     id:`User:${authUser?.id}`,
            //     fragment:gql`
            //         fragment savedPosts on User
            //         {
            //             savedPosts{
            //                 id
            //                 body
            //                 user{
            //                     id
            //                     username
            //                     avatar
            //                 }
            //             }
            //         }
            //     `,
            //     data:{
            //         savedPosts:newSavedPosts.savedPosts
            //     }
            // })
            // console.log("newSavedPost",newSavedPosts)
        }
    })
    const [toggleModalShowLikes, setToggleModalShowLikes] = useState(false)
    const [toggleModalEditPost, setToggleModalEditPost] = useState(false)
    const [toggleSetting, setToggleSetting] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const dispatch = useDispatch()
    function handleLikePost() {
        likePostMutation({
            variables: {
                postID: post.id
            },
            // refetchQueries: [{ query: getPosts },{query:getUser,variables:{
            //     userID:"6135936580e157748b878df4"
            // }}]
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
            // refetchQueries: [{ query: getPosts }]
        })
        setCommentContent("")
    }
    function handleDeletePost() {
        // dispatch(deletepostProfile(post))
        setToggleSetting(false)
        deletePostMutation({
            variables: {
                postID: post.id
            },
            refetchQueries: [{ query: getPosts }]
        })

    }
    function handleSavePost() {
        savePostMutation({
            variables: {
                postID: post.id
            }
        })

        setToggleSetting(false)
    }
    function handleUnSavePost()
    {
        unSavePostMutation({
            variables:{
                postID:post.id
            }
        })
        setToggleSetting(false)
    }
    // console.log(authUser)
    return (
        <Container>
            <TopSection>
                <UserInfo>
                    <Link to={`/user/${post?.user.id}`} className="avatar">
                        {
                            post?.user?.avatar
                                ? <img src={post?.user?.avatar} alt="" />
                                : <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        }
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
                            authUser?.savedPosts?.findIndex(item => item.id == post.id) == -1
                                ? <li onClick={() => handleSavePost()}>
                                    <FaRegBookmark></FaRegBookmark>
                                    Save post
                                </li>
                                : <li onClick={()=>handleUnSavePost()}>
                                    <BiBookmarkMinus></BiBookmarkMinus>
                                    Unsave post
                                </li>
                        }

                        <li>
                            <FaRegClock></FaRegClock>
                            Hide post</li>
                        {
                            post.user.id == authUser.id
                                ? <>
                                    <li onClick={() => setToggleModalEditPost(true)}>
                                        <FaPen></FaPen>
                                        Edit post</li>
                                    <li onClick={() => handleDeletePost()}>
                                        <FaTrashAlt></FaTrashAlt>
                                        Delete post</li>
                                </>
                                : <>

                                </>
                        }

                    </ul>}
                </div>
            </TopSection>
            <div className="post-content">
                <p>{post?.body}</p>
                {
                    post?.media && (post?.media?.split("%2F")[1] == "images"
                        ? <img src={post?.media} alt="" />
                        : <video controls>
                            <source src={post?.media} />
                        </video>)
                }
            </div>
            <div className="interact-info">
                <div className="likes" onClick={() => setToggleModalShowLikes(true)}>
                    <img src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png" alt="" />
                    {post?.likes.findIndex(item => item?.user.id == authUser.id) == -1
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
                    {post?.likes.findIndex(item => item?.user.id == authUser.id) == -1
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

                            {
                                authUser?.avatar
                                    ? <img src={authUser?.avatar} alt="" />
                                    : <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                            }
                            <input type="text" placeholder="Type something..." value={commentContent} onChange={(e) => handleChangeComment(e)} />
                        </form>
                    </CommentSection>
                    {
                        post.comments.map(item => {
                            return (
                                <li>
                                    {
                                        item?.user?.avatar
                                            ? <img src={item?.user?.avatar} alt="" />
                                            : <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                                    }
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
            {toggleModalEditPost && <ModalEditPost post={post} setToggleModalEditPost={setToggleModalEditPost}></ModalEditPost>}
        </Container>
    )
}

export default PostItem
