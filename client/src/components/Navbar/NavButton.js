import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import "./styles.css"

const NavButton = (props) => {
    const link = `${props.link}`
    return(
        <Link to={link} className="link">
            <Button className="button">
                <h3 className="roboto buttonText">{props.name}</h3>
            </Button>
        </Link>
    )
};

export default NavButton