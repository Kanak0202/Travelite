import { useState } from "react";
import MostViewed from "./Display Sections/MostViewed";
import Landing from "./Landing/Landing";
import Popup from "./Popup/Popup";

const Home = ()=>{
    return(
        <div className="home-top-container">
            <Landing />
            <MostViewed />
        </div>
    );
}

export default Home;