import "./styles.css"
import { Link } from "react-router-dom"

const PostPreview = (props) => {
    return(
        <Link to={`/posts/${props.postId}`}>
            <div className="post">
            <img  src="" alt="Prueba" className="postImage"/>
            <p className="blueText roboto postText">Hola</p>
            </div>
        </Link>
    )
}

export default PostPreview