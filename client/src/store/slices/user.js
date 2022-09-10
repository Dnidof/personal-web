import { createSlice } from "@reduxjs/toolkit"
import { signout, signup, signin } from "../thunk/user"

const initialState = { name: "", id: "", isAdmin: 0, posts: [], comments: [] }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
        signout: {
            reducer: (state, action) => {

            },
            prepare: (userData) => {
                return { payload: {userData} }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                const { token, obj } = action.payload.createUser
                localStorage.setItem('token', token)
                state.name = obj?.name
                state.id = obj?.id
                state.isAdmin = obj?.isAdmin
                return state
            })
            .addCase(signin.fulfilled, (state, action) => {
                const { token, obj } = action.payload.signinUser
                localStorage.setItem('token', token)
                state.name = obj?.name
                state.id = obj?.id
                state.isAdmin = obj?.isAdmin
                return state
            })
            .addCase(signout.fulfilled, (state, action) => {
                state = initialState
                localStorage.clear()
                return state
            })
    }
})

export const { uwuUser } = userSlice.actions
export default userSlice.reducer