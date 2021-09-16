import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, useParams, NavLink } from "react-router-dom"
import { gql } from "@apollo/client"
import {
    Container, Content,
    WrapTopContent, WrapMainContent,
    TopContent, Banner,
    NavBar, LeftBar, RightBar,
    MainContent, Sidebar, ListPosts
} from "./style"
import { FaUserPlus } from "react-icons/fa"
import { getUser } from "../../graphql-client/user/query"
import { addFriend } from "../../graphql-client/user/mutation"
import { useQuery, useMutation } from "@apollo/client"
import PostItem from '../../components/postItem/PostItem'
import CreatePost from '../../components/createPost/CreatePost'
import ListFriends from './components/listFriends/ListFriends'
import { AuthContext } from "../../services/context/Auth"
import AllFriends from './components/allFriends/AllFriends'
import PrivateRoute from '../../components/PrivateRoute'
import { useSelector, useDispatch } from "react-redux"
import { getData } from "../../services/redux/slices/profileSlice"
import { newLike, newPost, newComment } from "../../graphql-client/post/subscription"
import { newFriend } from "../../graphql-client/user/subscription"
import UpdateProfile from './components/updateProfile/UpdateProfile'
function Profile(props) {
    const { id } = useParams()
    const [toggleUpdateProfile, setToggleUpdateProfile] = useState(false)
    const { authUser } = useContext(AuthContext)
    const { loading, error, data, subscribeToMore } = useQuery(getUser, {
        variables: {
            userID: id
        }
    })
    const [addFriendMutation, dataMutation] = useMutation(addFriend
        //     , {
        //     update(cache, { data: addFriendMutation }) {
        //         let newFriends = [...data?.getUser.friends]
        //         let index = newFriends.findIndex(item => item.id == authUser.id)
        //         if (index == -1) {
        //             newFriends.push(addFriendMutation.addFriend)
        //             cache.writeFragment({
        //                 id: `Friend:${authUser.id}`,
        //                 fragment: gql`
        //                      fragment friend on Friend {
        //                         id
        //                         username
        //                         }
        //                 `,
        //                 data: {
        //                     ...addFriendMutation.addFriend
        //                 }
        //             })
        //         }
        //         else {
        //             newFriends.splice(index, 1)
        //             cache.evict({
        //                 id: `Friend:${authUser.id}`
        //             })
        //         }

        //     }
        // }
    )
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    console.log(profile)
    useEffect(() => {
        if (!loading) {
            dispatch(getData(data?.getUser))

        }
    }, [loading])
    useEffect(() => {
        // subscribeToMore()

        subscribeToMore({
            document: newPost,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newPost = subscriptionData.data.newPost;
                // let index=prev.getPosts.findIndex(item=>item.id==newPost.id)
                console.log(prev)
                console.log(subscriptionData)
                console.log("=============")
                let newData = JSON.parse(JSON.stringify(prev))
                newData.getUser.posts.push(newPost)
                return newData
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
                newData.getUser.posts = newData.getUser.posts.map(item => {
                    let index = item.likes.findIndex(item => item.user.id == newLike.user.id)
                    if (item.id == newLike.postID) {
                        if (index == -1 && newLike.status == "like") {
                            return { ...item, likes: [...item.likes, newLike] }
                        }
                        else if (index != -1 && newLike.status == "unlike") {
                            let newLikes = [...item.likes].filter(item => item.user.id != newLike.user.id)
                            return { ...item, likes: newLikes }
                            // return item
                        }
                        else {
                            return item
                        }

                    }
                    else {
                        return item
                    }
                })
                console.log("newData", newData)
                console.log("=============")
                return newData

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
                newData.getUser.posts = newData.getUser.posts.map(item => {

                    if (item.id == newComment.postID) {
                        if (item.comments[item.comments.length - 1].content == newComment.content) {
                            return item
                        }
                        else {
                            return { ...item, comments: [...item.comments, newComment] }
                        }
                    }
                    else {
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
            document: newFriend,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFriend = subscriptionData.data.newFriend;
                console.log("prev", prev)
                console.log("subscriptionData", subscriptionData)
                let newData = JSON.parse(JSON.stringify(prev))
                if (newFriend.status == "friend") {
                    newData.getUser.friends.push(newFriend)
                }
                else if (newFriend.status == "unfriend") {
                    newData.getUser.friends = newData.getUser.friends.filter(item => item.id == authUser.id)

                }
                console.log("newData", newData)
                console.log("=============")
                return newData

            }
        })
    }, [])
    function handleAddFriend() {
        addFriendMutation({
            variables: {
                userID: id
            },
            refetchQueries: [{ query: getUser }]
        })
    }
    return (
        <>
            {/* <Container> */}
            {/* <Content> */}
            <WrapTopContent>
                <TopContent>
                    <Banner>
                        <div className="wp-cover">
                            <img className="cover-img" src="https://i.pinimg.com/originals/9e/8d/74/9e8d747819250be17bff875604223894.jpg" alt="" />
                            <div className="wp-avatar">
                                <div className="avatar">
                                {
                                    data?.getUser.avatar
                                        ? <img src={data?.getUser?.avatar} alt="" />
                                        :<img src="https://avatars.dicebear.com/api/male/john.svg?background=%230000ff" alt="" />
                                }

                                </div>
                            </div>
                        </div>
                        <p className="username">{data?.getUser.username}</p>
                    </Banner>
                    <NavBar>
                        <LeftBar>
                            <li><NavLink activeClassName="active" exact to={`${props.match.url}`}>
                                <span>Posts</span>
                            </NavLink></li>
                            <li><NavLink activeClassName="active" to={`${props.match.url}/introduce`}>
                                <span>Introduce</span>
                            </NavLink></li>
                            <li><NavLink activeClassName="active" to={`${props.match.url}/friends`}>
                                <span>Friends</span>
                            </NavLink></li>
                        </LeftBar>
                        <RightBar>
                            <li >
                                <FaUserPlus></FaUserPlus>
                                {
                                    id == authUser.id
                                        ? <span onClick={() => setToggleUpdateProfile(true)}>Edit profile</span>
                                        : (data?.getUser.friends.findIndex(item => item.id == authUser.id) == -1
                                            ? <span onClick={() => handleAddFriend()}>Add friend</span>
                                            : <span onClick={() => handleAddFriend()}>Unfriend</span>)
                                }
                            </li>

                        </RightBar>
                    </NavBar>
                </TopContent>
            </WrapTopContent>
            {
                toggleUpdateProfile &&
                <UpdateProfile setToggleUpdateProfile={setToggleUpdateProfile}></UpdateProfile>
            }
            <Switch>
                <Route path={props.match.url} exact>
                    <WrapMainContent>

                        <MainContent>
                            <Sidebar>
                                <ListFriends id={id} friends={data?.getUser.friends}></ListFriends>
                            </Sidebar>
                            <ListPosts>
                                <CreatePost></CreatePost>
                                {
                                    data?.getUser?.posts?.map(item => {
                                        return <PostItem post={item}></PostItem>
                                    })
                                }
                            </ListPosts>

                        </MainContent>
                    </WrapMainContent>
                </Route>
                <Route path={`${props.match.url}/friends`}
                    render={(props) => {
                        return <AllFriends {...props} id={id}></AllFriends>
                    }}
                ></Route>
            </Switch>
        </>
    )
}

export default Profile
