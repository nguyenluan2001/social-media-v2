import React, { useRef, useState,useContext } from 'react'
import { FaUserPlus, FaTimesCircle, FaSearch } from "react-icons/fa"
import {
    Container,
    Content, Title, WrapEditSection,
    UserInfo, EditArea
} from "./style"
import { storage, ref,uploadBytes,getDownloadURL  } from "../../../../services/firebase"
import {updateProfile} from "../../../../graphql-client/user/mutation"
import {useMutation} from "@apollo/client"
import {AuthContext} from "../../../../services/context/Auth"
function UpdateProfile({ setToggleUpdateProfile }) {
    const avatarRef = useRef()
    const backgroundRef = useRef()
    const [image, setImage] = useState({})
    const [updateProfileMutation,dataMutation]=useMutation(updateProfile)
    const {authUser}=useContext(AuthContext)
    function handleUploadAvatar(e) {
        console.log(e.target.files[0])
        let preview = URL.createObjectURL(e.target.files[0])
        setImage(pre => {
            return { ...pre, [e.target.name]: e.target.files[0] }
        })
        avatarRef.current.src = preview
    }
    function handleUploadBackground(e) {
        let preview = URL.createObjectURL(e.target.files[0])
        backgroundRef.current.src = preview
        setImage(pre => {
            return { ...pre, [e.target.name]: e.target.files[0] }
        })

    }
    async function handleUpdateProfile() {
        const avatarRef = ref(storage,`avatar/${image.avatar.name}`)
        const backgroundRef = ref(storage,`background/${image.background.name}`)
        let avatar=uploadBytes(avatarRef,image.avatar)
        
        let background=uploadBytes(backgroundRef,image.background)
        console.log(11111)
        Promise.all([avatar,background]).then(async (res)=>{
           let avatarURL=await getDownloadURL(res[0].ref)
           let backgroundURL=await getDownloadURL(res[1].ref)
           updateProfileMutation({
               variables:{
                   avatar:avatarURL,
                   background:backgroundURL
               }
           })
           setToggleUpdateProfile(false)
            console.log("avatar",avatarURL)
            console.log("background",backgroundURL)
        })
        console.log(22222)

    }
    return (
        <>
            <Container>
                <Content>
                    <Title>
                        <span>Update profile</span>
                        <div className="close" onClick={() => setToggleUpdateProfile(false)}>
                            <FaTimesCircle></FaTimesCircle>
                        </div>
                    </Title>
                    <WrapEditSection>
                        <div className="avatar-section">
                            <div className="title">AVATAR</div>
                            <img ref={avatarRef} src={authUser?.avatar} alt="" />
                            <div className="upload">
                                <label htmlFor="avatar">Upload avatar</label>
                                <input type="file" name="avatar" id="avatar" onChange={(e) => handleUploadAvatar(e)} hidden />
                            </div>
                        </div>
                        <div className="background-section">
                            <p className="title">BACKGROUND</p>
                            <img ref={backgroundRef} src={authUser?.background} alt="" />
                            <div className="upload">
                                <label htmlFor="background">Upload background</label>
                                <input type="file" name="background" id="background" onChange={(e) => handleUploadBackground(e)} hidden />
                            </div>
                        </div>
                    </WrapEditSection>
                    <button onClick={() => handleUpdateProfile()}>Save</button>

                </Content>
            </Container>
        </>
    )
}

export default UpdateProfile
