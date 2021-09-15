import React, { useState, useEffect } from 'react'
import CreatePost from '../../../../components/createPost/CreatePost'
import PostItem from '../../../../components/postItem/PostItem'
import { Container } from "./style"
import { getPosts } from "../../../../graphql-client/post/query"
import { useQuery, useSubscription } from "@apollo/client"
import { newPost, newLike, deletePost,newComment } from "../../../../graphql-client/post/subscription"
function NewFeed() {
    const { loading, error, data, subscribeToMore } = useQuery(getPosts)
    const [selectedPost, setSelectedPost] = useState("")
    // const {dataSub,loadingSub}=useSubscription(newPost)
    console.log("start")
    useEffect(() => {
        subscribeToMore({
            document: newPost,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newPost = subscriptionData.data.newPost;
                // let index=prev.getPosts.findIndex(item=>item.id==newPost.id)
                console.log(prev)
                console.log(subscriptionData)
                console.log("=============")
                return Object.assign({}, prev, {
                    getPosts: [...prev.getPosts, newPost]
                });
                // if(index==-1)
                // {
                // }
                // else
                // {
                //     return prev
                // }




            }
        });
        subscribeToMore({
            document: newLike,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newLike = subscriptionData.data.newLike;
                console.log("prev", prev)
                console.log("subscriptionData", subscriptionData)
                let newData = JSON.parse(JSON.stringify(prev))
                newData.getPosts = newData.getPosts.map(item => {
                    let index = item.likes.findIndex(item => item.user.id == newLike.user.id)
                    if(item.id == newLike.postID)
                    {
                        if (index==-1&&newLike.status=="like") {
                            return { ...item, likes: [...item.likes, newLike] }
                        }
                        else if(index!=-1&&newLike.status=="unlike") {
                            let newLikes=[...item.likes].filter(item=>item.user.id!=newLike.user.id)
                            return { ...item, likes: newLikes }
                            // return item
                        }
                        else
                        {
                            return item
                        }

                    }
                    else
                    {
                        return item
                    }
                })
                console.log("newData", newData)
                console.log("=============")
                return newData
                // return prev

            }
        })
        subscribeToMore({
            document: deletePost,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const deletePostID = subscriptionData.data.deletePost;
                console.log("prev", prev)
                console.log("subscriptionData", subscriptionData)
                let newData = JSON.parse(JSON.stringify(prev))
                newData.getPosts = newData.getPosts.filter(item => {
                    return item.id != deletePostID
                })
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
                newData.getPosts = newData.getPosts.map(item => {
                    
                   if(item.id==newComment.postID)
                   {
                       if(item.comments[item.comments.length-1].content==newComment.content)
                       {
                           return item
                       }
                       else
                       {
                           return {...item,comments:[...item.comments,newComment]}
                       }
                   }
                   else
                   {
                       return item
                   }
                })
                console.log("newData", newData)
                console.log("=============")
                return newData
                // return prev
    
            }
        })
    }, [])

    console.log(data)
    console.log("end")
    return (
        <Container>
            <CreatePost></CreatePost>
            {
                data?.getPosts.map(item => {
                    return <PostItem post={item} setSelectedPost={setSelectedPost}></PostItem>
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
