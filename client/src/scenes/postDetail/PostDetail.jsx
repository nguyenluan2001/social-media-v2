import React,{useEffect} from 'react'
import { useParams } from "react-router-dom"
import PostItem from '../../components/postItem/PostItem'
import { useQuery } from "@apollo/client"
import { getPost } from "../../graphql-client/post/query"
import { Container,Content } from "./style"
import {newLike,newComment} from "../../graphql-client/post/subscription"
function PostDetail() {
    const { id, postID } = useParams()
    const { loading, error, data,subscribeToMore } = useQuery(getPost, {
        variables: {
            postID: postID
        }
    })
    console.log(data)
    useEffect(()=>{

        subscribeToMore({
            document: newLike,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newLike = subscriptionData.data.newLike;
                console.log("prev", prev)
                console.log("subscriptionData", subscriptionData)
                let newData = JSON.parse(JSON.stringify(prev))
                        if (newLike.status=="like") {
                            newData.getPost={ ...newData.getPost, likes: [...newData.getPost.likes,newLike] }
                        }
                        else if(newLike.status=="unlike") {
                            let newLikes=[...newData.getPost.likes].filter(item=>item.user.id!=newLike.user.id)
                            newData.getPost= { ...newData.getPost.likes, likes: newLikes }
                            // return item
                        }
                        else
                        {
                            return newData
                        }

                console.log("newData", newData)
                console.log("=============")
                return newData
                // return prev

            }
        })
        subscribeToMore({
            document: newComment,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newComment = subscriptionData.data.newComment;
                console.log("prev", prev)
                console.log("subscriptionData", subscriptionData)
                let newData = JSON.parse(JSON.stringify(prev))
                    
                       if(newData?.getPost?.comments[newData?.getPost.comments.length-1]?.content==newComment.content)
                       {
                           return newData
                       }
                       else
                       {
                           newData.getPost= {...newData.getPost,comments:[...newData.getPost.comments,newComment]}
                       }
                console.log("newData", newData)
                console.log("=============")
                return newData
                // return prev
    
            }
        })
    },[])
    return (
        <Container>
            <Content>
                <PostItem post={data?.getPost}></PostItem>
            </Content>
        </Container>
    )
}

export default PostDetail
