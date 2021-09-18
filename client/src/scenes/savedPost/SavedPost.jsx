import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../services/context/Auth"
import { Container, LeftContent, RightContent } from "./style"
import {BiBookmarkMinus} from "react-icons/bi"
import {unSavePost} from "../../graphql-client/post/mutation"
import {useMutation,useQuery} from "@apollo/client"
import {getUser} from "../../graphql-client/user/query"
function SavedPost() {
    const { authUser,setAuthUser } = useContext(AuthContext)
    const {loading,error,data}=useQuery(getUser,{
        variables:{
            userID:authUser.id
        }
    })
    const [unSavePostMutation,dataMutation]=useMutation(unSavePost,{
        
          refetchQueries:[{query:getUser,variables:{
              userID:authUser.id
          }}],
          update:(cache,{data:unSavePostMutation})=>{
              let savedPosts=[...authUser.savedPosts]
              savedPosts=savedPosts.filter(item=>item.id!=unSavePostMutation.unSavePost)
              setAuthUser(pre=>{
                  return {...pre,savedPosts:savedPosts}
              })
          }
    })
    console.log("user",data)
    function handleUnsavePost(post)
    {
        unSavePostMutation({
            variables:{
                postID:post.id
            }
        })
    }
    return (
        <Container>
            <LeftContent></LeftContent>
            <RightContent>
                {
                    data?.getUser?.savedPosts?.map(item => {
                        return <div className="post-item">
                            <Link to={`/user/${item?.user?.id}/posts/${item?.id}`} className="avatar">
                                <img src={item.user.avatar} alt="" />
                            </Link>
                            <div className="content">
                                <Link to={`/user/${item?.user?.id}/posts/${item?.id}`} className="body">{item.body}</Link>
                                <div className="unsave" onClick={()=>handleUnsavePost(item)}>
                                    <BiBookmarkMinus></BiBookmarkMinus>
                                    <span>Unsave</span>
                                    </div>
                            </div>
                        </div>
                    })
                }

            </RightContent>
        </Container>
    )
}

export default SavedPost
