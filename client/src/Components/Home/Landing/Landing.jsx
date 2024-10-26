import landingImg from "./img/landingBackground.jpg"
import { useNavigate } from "react-router-dom"
//css
import "../home.css";

const Landing = ()=>{
    sessionStorage.setItem("previousPage", window.location.pathname);
    const navigate = useNavigate();
    const goToExplore = ()=>{
        navigate('/explore');
      }

    return(
        <div className="head-section">
        <img src={landingImg} className="landing-image" alt="landing-image"></img>
            <h1 className="landing-heading vert-move">Travelite</h1>
            <p className="landing-sub vert-move">ENLIGHTNING TRAVELERS</p>
            <button className="" onClick={goToExplore}>Explore now</button>
        </div>
    );
}

export default Landing;