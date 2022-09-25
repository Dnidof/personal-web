import "./styles.css"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"


const Post = () => {
    const params = useParams()
    const posts = useSelector((state) => state.posts)
    const post = posts.find((post) => post.id === params?.id)
    return(
        <div className="roboto">
            {
                !post ? <Link to="/posts" className="postContent link returnLink">Return to posts</Link> : 
                <div className="postContent">
                    <h1 className="blueText postTitle">{post.title}</h1>
                    <img src={post?.image} className="postImage" alt=""/>
                    {
                        post?.sections.map((section) => <p className="postSection" key={section}>{section}</p>)
                    }
                </div>
            }
        </div>
    )
}

export default Post