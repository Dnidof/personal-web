import "./styles.css"
import { Link } from "react-router-dom"
import  ThumbUpOutlined  from "@material-ui/icons/ThumbUpOutlined"
import  ThumbUp  from "@material-ui/icons/ThumbUpOutlined"
import { useSelector } from "react-redux"

const PostPreview = ({ post }) => {
    const user = useSelector((state) => state.user)
    console.log(post)
    return(
        <Link to={`/posts/${post?.id}`} className="linkCard">
                <div className="postPreview">
                    <img  src={post?.image} alt="Prueba" className="postImage"/>
                    <p className="blueText roboto postText">{post?.title}</p>
                    <div className="cardFooter">
                        <ul className="list stats">
                            <li className="like">
                                {post?.likes.find((like) => like === user.id) ? <ThumbUp /> : <ThumbUpOutlined />}
                                <span className="stat">{post?.likes.length}</span>
                            </li>
                        </ul>
                        <ul className="list tags">
                            {
                                post?.tags.map((tag) => {
                                    return <li key={tag} className="tag">{tag}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
        </Link>
    )
}

export default PostPreview