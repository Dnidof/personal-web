import "./styles.css"
import background from "./images/new.svg"
import logo from "./images/github-logo.png"
const Home = () => {
    return(
        <div className="home">
            <img src={background} alt="" className="backgroundImg"/>
            <h1 className="roboto blueText centered growingText contained">Projects</h1>
            <div className="section">
                <div className="project">
                    <img src={logo} alt="" className="image"/>
                    <p className="roboto blueText centered description">MERN Stack Web App</p>
                </div>
                <div className="project">
                    <img src={logo} alt="" className="image"/>
                    <p className="roboto blueText centered description">MERN Stack Web App</p>
                </div>
            </div>
            <h1 className="roboto blueText centered growingText contained">Skills</h1>
            <div className="section">
                <h5 className="roboto blueText smallGrowingText">Languages:</h5>
                <h5 className="roboto blueText smallGrowingText">Technologies and Frameworks:</h5>
            </div>
        </div>
    )
}

export default Home