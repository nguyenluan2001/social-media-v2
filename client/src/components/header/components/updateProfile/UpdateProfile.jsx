import React from 'react'
import { FaUserPlus, FaTimesCircle,FaSearch } from "react-icons/fa"
import {
    Container,
    Content, Title, WrapEditSection,
    UserInfo, EditArea
} from "./style"
function UpdateProfile({setToggleUpdateProfile}) {

    return (
        <>
        <Container>
            <Content>
                <Title>
                    <span>Update profile</span>
                    <div className="close" onClick={()=>setToggleUpdateProfile(false)}>
                        <FaTimesCircle></FaTimesCircle>
                    </div>
                </Title>
                <WrapEditSection>
                    <div className="avatar-section">
                        <div className="title">AVATAR</div>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                        <div className="upload">
                            <label htmlFor="avatar">Upload avatar</label>
                            <input type="file" id="avatar" hidden />
                        </div>
                    </div>
                    <div className="background-section">
                        <p className="title">BACKGROUND</p>
                        <img src="https://i.pinimg.com/originals/67/3d/69/673d6942af2024f646abc9753f857e70.jpg" alt="" />
                        <div className="upload">
                            <label htmlFor="avatar">Upload background</label>
                            <input type="file" id="avatar" hidden />
                        </div>
                    </div>
                </WrapEditSection>
                <button >Save</button>

            </Content>
        </Container>
        </>
    )
}

export default UpdateProfile
