import React from 'react'
import CreatePost from '../../../../components/createPost/CreatePost'
import PostItem from '../../../../components/postItem/PostItem'
import { Container } from "./style"
import { getPosts } from "../../../../graphql-client/post/query"
import { useQuery } from "@apollo/client"
function NewFeed() {
    const { loading, error, data } = useQuery(getPosts)
    return (
        <Container>
            <CreatePost></CreatePost>
            {
                data?.getPosts.map(item => {
                    return <PostItem post={item}></PostItem>
                })
            }

            {/* <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem> */}
        </Container>
    )
}

export default NewFeed
