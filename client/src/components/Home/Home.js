import "./styles.css"
import background from "./images/new.svg"
import logo from "./images/github-logo.png"
const Home = () => {
    return(
        <div className="home">
            <img src={background} alt="" className="backgroundImg"/>
            <h1 className="roboto blueText centered growingText contained">Proyectos</h1>
            <div className="section">
                <div className="project">
                    <img src={logo} alt="" className="image"/>
                    <p className="roboto blueText centered description">Web personal con MERN stack</p>
                </div>
                <div className="project">
                    <img src={logo} alt="" className="image"/>
                    <p className="roboto blueText centered description">Web personal con MERN stack</p>
                </div>
            </div>
            <h1 className="roboto blueText centered growingText contained">Skills</h1>
            <div className="section">
                <img src={logo} alt="" width="20px"/>
                <img src={logo} alt="" width="20px"/>
                <img src={logo} alt="" width="20px"/>
                <img src={logo} alt="" width="20px"/>
            </div>
        </div>
    )
}

export default Home