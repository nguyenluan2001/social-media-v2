import React,{useState} from 'react'
import { FaUserPlus, FaTimesCircle } from "react-icons/fa"
import { Link } from 'react-router-dom'
import {
    Container,
    Content, Title, WrapEditSection,
    UserInfo, EditArea
} from "./style"
import {editPost} from "../../graphql-client/post/mutation"
import {getPosts} from "../../graphql-client/post/query"
import {useMutation} from "@apollo/client"
function ModalEditPost({setToggleModalEditPost,post}) {
    const [body,setBody]=useState(post?.body)
    const [editPostMutation,dataMutation]=useMutation(editPost,{
        onCompleted:()=>setToggleModalEditPost(false)
    })
    function handleChangeBody(e)
    {
        setBody(e.target.value)
    }
    function handleSaveChange()
    {
        editPostMutation({
            variables:{
                postID:post.id,
                body:body
            },
            refetchQueries:[{query:getPosts}]
        })
        
    }
    return (
        <Container>
            <Content>
                <Title>
                    <span>Edit post</span>
                    <div className="close" onClick={()=>setToggleModalEditPost(false)}>
                        <FaTimesCircle></FaTimesCircle>
                    </div>
                </Title>
                <WrapEditSection>
                    <UserInfo>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <div className="username">{post.user.username}</div>

                    </UserInfo>
                    <EditArea>
                        <textarea onChange={(e)=>handleChangeBody(e)}>{body}</textarea>
                    </EditArea>
                </WrapEditSection>
                <button onClick={()=>handleSaveChange()}>Save</button>

            </Content>
        </Container>
    )
}

export default ModalEditPost
