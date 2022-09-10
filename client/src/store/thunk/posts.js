import { getPosts } from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk(
    "posts/fetchStatus",
    async () => {
        const response = await getPosts()
        return response.data?.posts
    }
)
