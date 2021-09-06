import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory, Redirect } from "react-router-dom"
import Login from '../Login'
import Register from '../Register'
import { Container, Banner, Content } from "./style"
import { AuthContext } from "../../../services/context/Auth"

function MainSign(props) {
    const [signPage, setSignPage] = useState("")
    let location = useLocation()
    let history = useHistory()
    const { isAuthenticated } = useContext(AuthContext)
    useEffect(() => {
        if (props.match.url == "/login") {
            setSignPage(<Login></Login>)
        }
        else {
            setSignPage(<Register></Register>)
        }
    }, [location])
    console.log(isAuthenticated)
    return (
        <>
            {!isAuthenticated
                ? <Container>
                    <Content>
                        <Banner>
                            <div className="logo">facebook</div>
                            <p>Facebook helps you connect and share with the people in your life.</p>
                        </Banner>
                        {signPage}
                    </Content>
                </Container>
                : <Redirect to="/"></Redirect>
            }
        </>
    )
}

export default MainSign
