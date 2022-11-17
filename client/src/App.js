import { Route, Routes, BrowserRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import Navbar from "./components/Navbar/Navbar"
import Posts from "./components/Posts/Posts"
import Auth from "./components/Auth/Auth"
import Home from "./components/Home/Home"
import Post from "./components/Posts/Post/Post"
import CreatePost from "./components/CreatePost/CreatePost"
import postsReducer from "./store/slices/posts"
import userReducer from "./store/slices/user"
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, ApolloLink, concat } from "@apollo/client"

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql"
})

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token")
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ""
        }
    }) 
    return forward(operation)
})

export const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
})

const store = configureStore({
    reducer: {
        posts: postsReducer,
        user: userReducer
    }
})

const App = () => {
    return(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/posts" exact element={<Posts />} />
                        <Route path="/auth" exact element={<Auth />} />
                        <Route path="/posts/:id" exact element={<Post />} />
                        <Route path="/posts/create" exact element={<CreatePost />} />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
            
    )
}

export default App