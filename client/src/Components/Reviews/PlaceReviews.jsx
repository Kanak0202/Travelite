import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import defaultBackground from "./img/defaultBackground.jpg";
import CurrencyConverter from "../Currency Converter/CurrencyConverter";
//css
import "./review.css";
//icons
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//gif
import newgif from "./img/newgif.gif";
import currencygif from "./img/currencyConvert.gif";

const PlaceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [background, setBackground] = useState(defaultBackground);
  const [openCurrencyConverter, setOpenCurrencyConverter] = useState(false);
  const navigate = useNavigate();

  const params = useParams();

  const retrieveReviews = async () => {
    try {
      let result = await fetch(`http://localhost:8000/explore/${params.place}`);
      if (result.ok) {
        const data = await result.json();
        setReviews(data);
      } else {
        console.log("Reviews not found");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const getPhoto = async (place) => {
    try {
      const result = await fetch(
        `https://api.unsplash.com/photos/random?query=${place}&client_id=oUDKMpWw-r3RgxE_moAyCahz7EiCbx9s9lE5kP4e2Gk`
      );
      if (!result.ok) {
        console.error(`Error fetching photo for ${place}: ${result.statusText}`);
        return;
      }

      const data = await result.json();
      console.log(data.links.self);
      setBackground(data);
    } catch (error) {
      console.error(`Error fetching photo for ${place}: ${error.message}`);
    }
  };

  useEffect(() => {
    // Call getPhoto only when the component mounts or when params.place changes
    getPhoto(params.place);
  }, [params.place]);

  useEffect(() => {
    // Call retrieveReviews only when params.place changes
    retrieveReviews();
  }, [params.place]);

  const popupVisible = (call)=>{
    console.log(call);
    var elem = document.getElementById('popupId');
    if(call==="visible"){
    elem.style.display = 'block';
    }else if(call === "close"){
      elem.style.display = 'none';
    }
  }

  return (
    <div className="place-review-page" style={{position:"relative"}}>
    {/* <img className="newimg" src={newgif} alt="" /> */}
    <button className="cc-btn" onClick={()=>setOpenCurrencyConverter(true)}>
      <img style={{margin:0, padding:0}} className="curgif" src={currencygif} alt="" />
    </button>
    {
      openCurrencyConverter
      ?
      <CurrencyConverter func={()=>setOpenCurrencyConverter(false)}/>
      :
      <></>
    }
      <div
        className="container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            background.urls?.regular || defaultBackground
          })`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <p className="reviews-for heading-slide-in">Reviews for <span style={{fontSize:"60px"}} className="heading-slide-in">{params.place}</span></p>
      </div>
      <div className="all-reviews-container">
        {reviews.map((review, index) => (
          <Review key={index} review={review} func={popupVisible}/>
        ))}
      </div>
      <div className="login-popup fade-in" id="popupId">
      <div className="close-btn-container" onClick={()=>popupVisible("close")}>
        <CancelOutlinedIcon style={{fontSize:"18px"}}/>
      </div>
      <p style={{fontSize:"170%"}}>Missing out on the fun? </p>
      <p style={{fontSize:"120%"}}>Dive into excitement by simply logging in to Travelite</p>
      
      <button className="auth-btn" style={{width:"30%"}} onClick={()=>navigate('/login')}>Login</button>
      <p  style={{margin:"20px", marginTop:"30px"}}>Not a user already😟? <a style={{color:"black", marginLeft:"5px", fontSize:"18px"}} href="/signup">Sign Up</a></p>
    </div>
    </div>
  );
};

export default PlaceReviews;
