import { useParams } from "react-router-dom"

const Post = () => {
    const params = useParams()
    return(
        <div>{console.log(params)}</div>
    )
}

export default Post