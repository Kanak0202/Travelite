import { useState } from "react";
import MostViewed from "./Display Sections/MostViewed";
import Landing from "./Landing/Landing";
import Popup from "./Popup/Popup";
import Landing2 from "./Landing2/Landing-2";
import Carousel from "./Landing2/Carousel";

const Home = ()=>{
    return(
        <div className="home-top-container">
            {/* <Landing /> */}
            {/* <Landing2 /> */}
            <div>
                <Carousel />
            </div>
            <MostViewed />
        </div>
    );
}

export default Home;