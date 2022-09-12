import { createSlice } from "@reduxjs/toolkit"
import { fetchPosts, createOnePost } from "../thunk/posts"

const initialState = []

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
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state = action.payload
                return state
            })
            .addCase(createOnePost.fulfilled, (state, action) => {
                state = [...state, action.payload.createPost]
                return state
            })
    }
})

export const { likePost, commentPost } = postsSlice.actions
export default postsSlice.reducer