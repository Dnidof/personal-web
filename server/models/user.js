import mongoose from "mongoose"
import { createRequiredMediumString } from "./createRequiredTypes.js"

const userSchema = new mongoose.Schema({
    name: createRequiredMediumString("Name"),
    email: createRequiredMediumString("Email"),
    password: createRequiredMediumString("Password"),
    isAdmin: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("user", userSchema)