import { useParams } from "react-router-dom"

const Post = () => {
    const params = useParams()
    return(
        <div>{params}</div>
    )
}

export default Post