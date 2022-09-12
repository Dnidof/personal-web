import PostPreview from "./Post/PostPreview"
import "./styles.css"
import { fetchPosts } from "../../store/thunk/posts"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Posts = () => {

    const posts = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchPosts())
    }, [dispatch])

    return(
        <div className="posts">
            <h1 className="roboto blueText centeredText">Posts</h1>
            <div className="container">
                {
                    posts.map((post) => {
                        return <PostPreview key={post.id} post={post} />
                    })
                }
            </div>
        </div>
    )
}

// { posts.map((post) => {
//     return <Post key={post.id} postData={post}/>
// }) }

export default Posts