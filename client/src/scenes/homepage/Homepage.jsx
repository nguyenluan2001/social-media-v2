import React from 'react'
import LeftSidebar from './components/leftSidebar/LeftSidebar'
import NewFeed from './components/newFeed/NewFeed'
import { Container } from "./style"
function Homepage() {
    return (
        <Container>
            <LeftSidebar></LeftSidebar>
            <NewFeed></NewFeed>
            <div></div>
        </Container>
    )
}

export default Homepage
