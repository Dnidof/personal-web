import mongoose from "mongoose"
import User from "./models/user.js"
import bcrypt from "bcrypt"

mongoose.connect("mongodb://localhost/proyecto")

// Should use variables from .env as username, password, email...

mongoose.connection.once("open", async () => {
    const hashedPassword = await bcrypt.hash("password", 12)
    await User.create({ name: "admin", email: "admin@admin", password: hashedPassword, isAdmin: 2})
    console.log("Admin created")
    mongoose.disconnect()
})

