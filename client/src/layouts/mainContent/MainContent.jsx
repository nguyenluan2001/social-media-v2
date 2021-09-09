import React from 'react'
import { Container,Content } from "./style"
import { BrowserRouter as Router, Switch, Route,useLocation } from "react-router-dom"
import Homepage from '../../scenes/homepage/Homepage'
import Header from '../../components/header/Header'
import Profile from '../../scenes/profile/Profile'
import PrivateRoute from '../../components/PrivateRoute'
function MainContent(props) {
    const location=useLocation()
    console.log(location)
    return (
        <>
         <Container>
            <Header></Header>
            {/* <Content> */}
                {/* <Router> */}
                    <Switch>
                        <Route path="/" exact component={Homepage}></Route>
                        <Route path="/user/:id" component={Profile} props={props}></Route>
                     
                    </Switch>
                {/* </Router> */}
            {/* </Content> */}

        </Container>
        </>
    )
}

export default MainContent
