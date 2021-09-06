import React from 'react'
import { Container,Content } from "./style"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Homepage from '../../scenes/homepage/Homepage'
import Header from '../../components/header/Header'
function MainContent() {
    return (
        <Container>
            <Header></Header>
            <Content>
                <Router>
                    <Switch>
                        <Route path="/" component={Homepage}></Route>
                    </Switch>
                </Router>
            </Content>

        </Container>
    )
}

export default MainContent
