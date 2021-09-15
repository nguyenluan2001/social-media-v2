import React, { useContext, useEffect } from 'react'
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
function Profile(props) {
    const { id } = useParams()
    const { authUser } = useContext(AuthContext)
    const { loading, error, data } = useQuery(getUser, {
        variables: {
            userID: id
        }
    })
    const [addFriendMutation, dataMutation] = useMutation(addFriend, {
        update(cache, { data: addFriendMutation }) {
            let newFriends = [...data?.getUser.friends]
            let index = newFriends.findIndex(item => item.id == authUser.id)
            if (index == -1) {
                newFriends.push(addFriendMutation.addFriend)
                cache.writeFragment({
                    id: `Friend:${authUser.id}`,
                    fragment: gql`
                         fragment friend on Friend {
                            id
                            username
                            }
                    `,
                    data: {
                        ...addFriendMutation.addFriend
                    }
                })
            }
            else {
                newFriends.splice(index, 1)
                cache.evict({
                    id: `Friend:${authUser.id}`
                })
            }

        }
    })
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    console.log(profile)
    useEffect(() => {
        if (!loading) {
            dispatch(getData(data?.getUser))

        }
    }, [loading])
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
                            <div className="avatar">
                                <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="" />
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
                                        ? <span onClick={() => alert(1)}>Edit profile</span>
                                        : (data?.getUser.friends.findIndex(item => item.id == authUser.id) == -1
                                            ? <span onClick={() => handleAddFriend()}>Add friend</span>
                                            : <span onClick={() => handleAddFriend()}>Unfriend</span>)
                                }
                            </li>

                        </RightBar>
                    </NavBar>
                </TopContent>
            </WrapTopContent>
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
