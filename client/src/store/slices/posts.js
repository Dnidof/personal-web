import { createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "../thunk/posts"

const initialState = {
    posts: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        likePost: {
            reducer: (state, action) => {
                
            },
            prepare(postId, creatorId){
                return { payload: { postId, creatorId } }
            }
        },
        commentPost: {
            reducer: (state, action) => {
                
            },
            prepare(postId, creatorId){
                return { payload: { postId, creatorId } }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            
        })
    }
})

export const { likePost, commentPost } = postsSlice.actions
export default postsSlice.reducer