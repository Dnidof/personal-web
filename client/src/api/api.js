import { CREATE_USER, SIGNIN_USER, GET_POSTS, CREATE_POST } from "../queries/queries"
import { client } from "../App"

export const createUser = (userData) => client.mutate({
    mutation: CREATE_USER,
    variables: userData
})

export const signinUser = (userData) => client.mutate({
    mutation: SIGNIN_USER,
    variables: userData
})

export const resetStore = () => client.resetStore()

export const getPosts = () => client.query({
    query: GET_POSTS
})

export const createPost = (postData) => client.mutate({
    mutation: CREATE_POST,
    variables: postData
})