import { createUser, signinUser, resetStore } from "../../api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const signup = createAsyncThunk(
    "user/signup",
    async (formData) => {
        const response = await createUser(formData)
        return response.data
    }
)

export const signin = createAsyncThunk(
    "user/signin",
    async (formData) => {
        const { name, password } = formData
        const response = await signinUser({ name, password })
        return response.data
    }
)

export const signout = createAsyncThunk(
    "user/signout",
    async () => {
        const response = await resetStore()
        return response
    }
)