import { getPosts, createPost, resetStore } from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await getPosts()
        return response?.data?.posts
    }
)

export const createOnePost = createAsyncThunk(
    "posts/createOnePost",
    async (postData) => {
        // Clear queries in cache to render new post with fetchPosts
        await resetStore()
        const response = await createPost(postData)
        return response?.data
    }
)
