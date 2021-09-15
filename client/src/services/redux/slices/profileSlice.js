import { createSlice } from "@reduxjs/toolkit"
const initialState = {

}
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getData: (state, action) => {
            return action.payload
        },
        createPost: (state, action) => {
            let newPost = {
                body: action.payload.body,
                comments: [],
                id: "613a0a772e2755773c0fe0e3",
                likes: [],
                user: { __typename: 'User', id: '6135936580e157748b878df4', username: 'johndoe' }

            }
            state.post.push(action.payload)
        },
        deletePost: (state, action) => {
            console.log("delete post", action.payload)
            let newPosts = [...state.posts]
            newPosts = newPosts.filter(item => item.id != action.payload.id)
            state.posts = newPosts
        }
    }
})
export const { getData, deletePost } = profileSlice.actions
export default profileSlice.reducer