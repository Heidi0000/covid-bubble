import { Redirect, useNavigate, useHistory } from "react-router-dom"
import pythonLogo from "../images/pythonLogo.png"
import reactLogo from "../images/reactLogo.png"
import mongodbLogo from "../images/mongodbLogo.png"
import flaskLogo from "../images/flaskLogo.svg"

const LandingPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  }
    
  return (
    <div className="landing-page-container">
        <div className="landing-header">
          Visualize you and your friends' social circles with <span className="highlight">Covid Bubble</span>!
        </div>
        <div className="landing-section-header">
          About Project
        </div>
        <div className="landing-paragraph">
        This project was developed during the covid-19 pandemic where during certain periods of time, people were only allowed to meet a certain number of people. 
        </div>
        <div className="landing-section-header">
          Tools Used
        </div>
        <div className="tools-used">
          <img src={reactLogo} className="tool-image"></img>
          <img src={pythonLogo} className="tool-image"></img>
          <img src={flaskLogo} className="tool-image"></img>
          <img src={mongodbLogo} className="tool-image"></img>
        </div>
        <div className="landing-buttons-container">
          <button type="button" className="main-button" onClick={handleClick}>
            Sign in to Covid Bubble
          </button>
          <a className="secondary-button" href="https://github.com/HeidiHan0000/covid-bubble/">
            View Code on Github
          </a>
        </div>
    </div>
  )
}

export default LandingPage
