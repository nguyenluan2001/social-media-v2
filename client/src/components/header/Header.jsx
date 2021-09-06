import React, { useContext, useState } from 'react'
import {
    Container,
    Search, Logo,
    Links, Notifications,
    User, OtherSections
} from "./style"
import { FaUserAlt, FaComment, FaBell, FaSearch } from "react-icons/fa"
import { Link,useHistory } from "react-router-dom"
import { AuthContext } from "../../services/context/Auth"
function Header() {
    const { authUser,setIsAuthenticated } = useContext(AuthContext)
    const [togglePannel, setTogglePannel] = useState(false)
    const history=useHistory()
    function handleLogout()
    {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        history.push("/login")
    }
    return (
        <Container>
            <Logo>MySocial</Logo>
            <Search>
                <input type="text" />
                <div className="icon">
                    <FaSearch></FaSearch>
                </div>
            </Search>
            <OtherSections>
                <Links>
                    <li>
                        <Link to="/">Homepage</Link>
                    </li>
                    <li>
                        <Link to="/">Timeline</Link>
                    </li>
                </Links>
                <Notifications>
                    <li>
                        <span><FaUserAlt></FaUserAlt></span>
                    </li>
                    <li>
                        <span><FaComment></FaComment></span>
                    </li>
                    <li>
                        <span><FaBell></FaBell></span>
                    </li>
                </Notifications>
                <User>
                    <div className="avatar" onClick={()=>setTogglePannel(pre=>!pre)}>
                        <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                    </div>
                    {togglePannel && <div className="pannel">
                        <Link to="#">
                            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                            <div className="wp-username">
                                <p className="username">{authUser?.username}</p>
                                <p>View your profile</p>
                            </div>
                        </Link>
                        <hr />
                        <button onClick={()=>handleLogout()}>Log out</button>
                    </div>}
                </User>

            </OtherSections>

        </Container>
    )
}

export default Header
