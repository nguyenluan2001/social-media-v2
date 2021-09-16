import React, { useEffect } from 'react'
import { Container, Content } from "./style"
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom"
import Homepage from '../../scenes/homepage/Homepage'
import Header from '../../components/header/Header'
import Profile from '../../scenes/profile/Profile'
import PrivateRoute from '../../components/PrivateRoute'
import { Provider } from "react-redux"
import { store } from "../../services/redux/store"
// ======
function MainContent(props) {
    // const location = useLocation()


    return (
        <>
            <Provider store={store}>

                <Container>
                    <Header></Header>
                    <Content>
                    {/* <Router> */}
                        <Switch>
                            <Route path="/" exact component={Homepage}></Route>
                            <Route path="/user/:id" component={Profile} props={props}></Route>

                        </Switch>
                    {/* </Router> */}
                    </Content>

                </Container>
                </Provider>
            </>
            )
}

            export default MainContent
