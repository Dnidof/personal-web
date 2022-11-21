import mongoose from "mongoose"
import { createRequiredMediumString, createRequiredString } from "./createRequiredTypes.js"

const postSchema = new mongoose.Schema({
    title: createRequiredMediumString("Title"),
    sections: {
        type: [{
            text: {type: String},
            isImage: {type: Boolean, default: false}
        }],
        required: [true, "At least one section is required"]
    },
    tags: {
        type: [createRequiredMediumString("Tag")],
        default: []
    },
    image: createRequiredMediumString("Image"),
    likes: {
        type: [createRequiredString("LikeId")],
        default: []
    },
    createdAt: createRequiredMediumString("CreatedAt"),
    creatorId: createRequiredString("CreatorId")
})

export default mongoose.model("post", postSchema)
