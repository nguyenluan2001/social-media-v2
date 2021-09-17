import React, { useState, useContext, useRef } from 'react'
import { Container, TopSection, FootSection, ListItem } from "./style"
import { FaPhotoVideo, FaTag, FaMapMarkerAlt, FaRegLaughSquint } from "react-icons/fa"
import { createPost } from '../../graphql-client/post/mutation'
import { getPosts } from "../../graphql-client/post/query"
import { getUser } from "../../graphql-client/user/query"
import { useMutation } from "@apollo/client"
import { AuthContext } from "../../services/context/Auth"
import { storage, ref, getDownloadURL, uploadBytes } from "../../services/firebase"
function CreatePost() {
    const [createPostMutation, dataMutation] = useMutation(createPost)
    const [body, setBody] = useState("")
    const { authUser } = useContext(AuthContext)
    const [image, setImage] = useState(null)
    const [video,setVideo]=useState(null)
    const [mediaResource,setMediaResource]=useState(false)
    const imageRef = useRef()
    const videoRef = useRef()
    const videoSourceRef=useRef()
    function handleChange(e) {
        setBody(e.target.value)
    }
    function handleShare() {
        if(mediaResource.type.split("/")[0]=="image")
        {
            console.log("image")
            let storageRef = ref(storage, `posts/images/${mediaResource.name}`)
            uploadBytes(storageRef, mediaResource).then(snap => {
                getDownloadURL(snap.ref).then(url => {
                    createPostMutation({
                        variables: {
                            body: body,
                            media: url
                        },
                        // refetchQueries:[{query:getPosts}]
                    })
                })
            })
            setBody("")
            imageRef.current.src = ""
        }
        else
        {
            console.log("video")
            let storageRef = ref(storage, `posts/videos/${mediaResource.name}`)
            uploadBytes(storageRef, mediaResource).then(snap => {
                getDownloadURL(snap.ref).then(url => {
                    createPostMutation({
                        variables: {
                            body: body,
                            media: url
                        },
                        // refetchQueries:[{query:getPosts}]
                    })
                })
            })
            setBody("")
            setMediaResource(null)
        }
    }
    function handleUploadImage(e) {
        let preview = URL.createObjectURL(e.target.files[0])
        // console.log(preview)
        // console.log(123)
        if(e.target.files[0].type.split("/")[0]=="image")
        {
            imageRef.current.src=preview
            setImage(e.target.files[0])
            setMediaResource(e.target.files[0])

        }
        else
        {
            var reader = new FileReader();
    
            reader.onload = function(event) {
              videoSourceRef.current.src = event.target.result
              videoRef.current.load()
            }
            reader.readAsDataURL(e.target.files[0]);
            setVideo(e.target.files[0])
            setMediaResource(e.target.files[0])
            

        }
        console.log(e.target.files)
    }
    return (
        <Container>
            <TopSection>
                {
                    authUser?.avatar
                        ? <img src={authUser?.avatar} />
                        :
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                }
                <textarea name="" id="" placeholder="What are you thinking?" onChange={(e) => handleChange(e)} value={body}></textarea>
            </TopSection>
            <img ref={imageRef} src="" alt="" />
           { video&&<video ref={videoRef} controls>
                <source ref={videoSourceRef} id="video-source" src="splashVideo" />
            </video>}
            <FootSection>
                <ListItem>
                    <li>
                        <FaPhotoVideo></FaPhotoVideo>
                        <label htmlFor="image">Photo</label>
                        <input type="file" hidden id="image" onChange={(e) => handleUploadImage(e)} />
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
                <button className="share-btn" onClick={() => handleShare()}>Share</button>
            </FootSection>

        </Container>
    )
}

export default CreatePost
