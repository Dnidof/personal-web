import mongoose from "mongoose"
import { createRequiredMediumString, createRequiredString } from "./createRequiredTypes.js"

const commentSchema = new mongoose.Schema({
    content: createRequiredMediumString("Content"),
    createdAt: createRequiredMediumString("CreatedAt"),
    likes: {
        type: [createRequiredString("LikeId")],
        default: []
    },
    postId: createRequiredString("PostId"),
    creatorId: createRequiredString("CreatorId")
})

export default mongoose.model("comment", commentSchema)