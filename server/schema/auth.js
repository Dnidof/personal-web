import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (userData) => {
    let user = null, message = null, token = null
    
    try {
        const foundUser = await User.findOne({ email: userData.email })

        if(!foundUser && userData.password === userData.confirmPassword){
            const hashedPassword = await bcrypt.hash(userData.password, 12)
            user = await User.create({ name: userData.name, email: userData.email, password: hashedPassword })

            token = jwt.sign({  id: user._id, email: user.email }, "TESTSECRET", { expiresIn: "1h" })
            message = "Success"
        }else{
            message = foundUser ? "This email has already been used" : "Incorrect password"
        }
        
        return { user: { name: user?.name, id: user?._id, email: user?.email, isAdmin: user?.isAdmin }, token, message }

    } catch (error) {
        console.log(error)
        return { user, token, message }
    }
}

export const signIn = async (userData) => {
    let user = null, message = null, token = null
    
    try {
        const foundUser = await User.findOne({ name: userData.name })

        if(foundUser){
            const isPasswordCorrect = await bcrypt.compare(userData.password, foundUser.password)
            if(isPasswordCorrect) {
                token =jwt.sign({ id: foundUser._id, email: foundUser.email }, "TESTSECRET", { expiresIn: "1h" })
                user = foundUser
                message = "Success"
            }else{
                message = "Incorrect password"
            } 
        }else{
            message = "User not found"
        }

        return { user: { name: user?.name, id: user?._id, email: user?.email, isAdmin: user?.isAdmin }, token, message }

    } catch (error) {
        console.log(error)
        return { user, token, message }
    }
}

export const verifyToken = (req) => {
    // Returns user id if token is correct, else returns null

    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const decodedToken = jwt.verify(token, "TESTSECRET")
            return decodedToken?.id
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const verifyAdmin = async (userId) => {
    try {
        if(!userId) return null
        const foundUser = await User.findById(userId)
        if(foundUser) return foundUser.isAdmin === 2

    } catch (error) {
        console.log(error)
        return false
    }
}
