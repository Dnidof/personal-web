import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import "./styles.css"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import NavButton from "./NavButton"
import { signout } from "../../store/thunk/user"
import decode from "jwt-decode"


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const toggleMenu = () => {
        const menu = document.getElementById("menu")
        if(menuOpen){
            setMenuOpen(false);
            menu.style.display = "none"
        }else{
            setMenuOpen(true);
            menu.style.display = "flex"
        }
    }

    const signOut = () => {
        dispatch(signout())
        navigate("/auth")
    }

    const isUserAuthenticated = () => {
        return user?.name !== ""
    }

    const isUserAdmin = () => {
        return user?.isAdmin === 2
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) signOut()
        }
    }, [location])

    return(
        <>
            <AppBar>
                <Toolbar>
                    <IconButton onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <h1 className="title">Diego Nido</h1>
                    {isUserAuthenticated() ? user.name : ""}
                </Toolbar>
            </AppBar>
            <div id="menu" className="menu">
                <ul className="list">
                    <li className="li" onClick={toggleMenu}>
                        <NavButton name="Home" link="/" />
                    </li>
                    <li className="li" onClick={toggleMenu}>
                        <NavButton name="Posts" link="/posts" />
                    </li>
                    
                    {
                        !isUserAuthenticated() ? (
                                <li className="li" onClick={toggleMenu}>
                                    <NavButton name="Sign in" link="/auth" />
                                </li>
                                ) : 
                                (
                                <Button className="button" onClick={signOut}>
                                    <h3 className="roboto buttonText">Sign out</h3>
                                </Button>
                                )
                    }

                    {
                        isUserAdmin() && (
                            <li className="li" onClick={toggleMenu}>
                                <NavButton name="Create Post" link="/posts/create" />
                            </li>
                        )
                    }

                    
                </ul>
            </div>


        </>
        
    )
}

export default Navbar