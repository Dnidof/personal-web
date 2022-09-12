import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signin, signup } from "../../store/thunk/user"
import { Button } from "@material-ui/core"
import Input from "./Input"
import "./styles.css"

const initialState = { name: "", email: "", password: "", confirmPassword: "" }

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignin, setIsSignIn] = useState(true)
    const [formData, setFormData] = useState(initialState) 

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const toggleSignIn = () => setIsSignIn((prevSignin) => !prevSignin)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignin){
            const { name, password } = formData
            dispatch(signin({ name, password }))
        }else{
            dispatch(signup(formData))
        }
        navigate("/")
    }

    return(
        <div className="authPage">
            <div className="authMenu">
                <form className="form" onSubmit={handleSubmit}>
                        <Input name="name" label="Name" handleChange={handleChange} autoFocus required />
                        <Input name="email" label="Email" handleChange={handleChange} type="email" required={isSignin ? false : true} isSignIn={isSignin} />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} required />
                        <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" required={isSignin ? false : true} isSignIn={isSignin} />
                    <Button type="submit" variant="contained" color="primary">{!isSignin ? "Create an account" : "Sign In"}</Button>
                    <h5 className="roboto centered blueText">{isSignin ? "¿Don't have an account?" : "¿Already have an account?"}</h5>
                    <Button onClick={toggleSignIn} variant="outlined" color="primary">{isSignin ? "Create an account" : "Sign In"}</Button>
                </form>
            </div>
        </div>
        
    )
}

export default Auth