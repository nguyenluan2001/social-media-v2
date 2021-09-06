import React,{useState} from 'react'
import { Container, TopSection, FootSection, ListItem } from "./style"
import { FaPhotoVideo, FaTag, FaMapMarkerAlt, FaRegLaughSquint } from "react-icons/fa"
import {createPost} from '../../graphql-client/post/mutation'
import {getPosts} from "../../graphql-client/post/query"
import {useMutation} from "@apollo/client"
function CreatePost() {
    const [createPostMutation,dataMutation]=useMutation(createPost)
    const [body,setBody]=useState("")
    function handleChange(e)
    {
        setBody(e.target.value)
    }
    function handleShare()
    {
        createPostMutation({
            variables:{
                body:body
            },
            refetchQueries:[{query:getPosts}]
        })
        setBody("")
    }
    return (
        <Container>
            <TopSection>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                <textarea name="" id="" placeholder="What are you thinking?" onChange={(e)=>handleChange(e)}>{body}</textarea>
            </TopSection>
            <FootSection>
                <ListItem>
                    <li>
                        <FaPhotoVideo></FaPhotoVideo>
                        <label htmlFor="image">Photo</label>
                        <input type="file" hidden id="image" />
                    </li>
                    <li>
                        <FaTag></FaTag>
                        <span>Tag</span>
                    </li>
                    <li>
                        <FaMapMarkerAlt></FaMapMarkerAlt>
                        <span>Location</span>
                    </li>
                    <li>
                        <FaRegLaughSquint></FaRegLaughSquint>
                        <span>Feelings</span>
                    </li>
                </ListItem>
                <button className="share-btn" onClick={()=>handleShare()}>Share</button>
            </FootSection>

        </Container>
    )
}

export default CreatePost
