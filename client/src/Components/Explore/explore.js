import emptiness from "./img/emptmain.png"
//css
import "./explore.css";

const Explore = ()=>{
    return(
        <div className="no-result-container">
            <img className="no-result-img" src={emptiness} alt="No results to display"></img>
        </div>
    );
}

export default Explore;