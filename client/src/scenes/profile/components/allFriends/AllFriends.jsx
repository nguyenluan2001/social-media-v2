import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Content, TopContent, ListFriends, Search } from "./style"
import { FaSearch } from "react-icons/fa"
import { useQuery } from "@apollo/client"
import { getUser } from "../../../../graphql-client/user/query"
function AllFriends(props) {
    const { loading, error, data } = useQuery(getUser, {
        variables: {
            userID: props.id
        }
    })
    console.log(data?.getUser)

    return (
        <Container>
            <Content>
                <TopContent>
                    <span>Friends</span>
                    <Search>
                        <input type="text" placeholder="Searching..." />
                        <div className="icon">
                            <FaSearch></FaSearch>
                        </div>
                    </Search>
                </TopContent>
                <ListFriends>
                    {
                        data?.getUser?.friends.map(item => {
                            return (
                                <li>
                                    <Link to={`/user/${item.id}`}>
                                        <img src={item?.avatar} alt="" />
                                    </Link>
                                    <Link to={`/user/${item.id}`} className="username">{item?.username}</Link>
                                </li>

                            )
                        })
                    }


                </ListFriends>
            </Content>
        </Container>
    )
}

export default AllFriends
