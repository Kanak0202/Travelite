import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import emptiness from "./img/emptmain.png";
import background from "./img/background.jpg";
import loadPlane from "./img/loadPlane.gif";
import balloons1 from "./img/balloons1.jpg";
import road from "./img/road.png";
import wtrfall from "./img/wtr.jpg";
import "./explore.css";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addPlace } from "../../Redux Features/PlaceSlice";

const Explore = () => {
  sessionStorage.setItem("previousPage", window.location.pathname);
  const [places, setPlaces] = useState([]);
  const [placeWithPhoto, setPlaceWithPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("");
  const [searchPlaces, setSearchPlaces] = useState([]);
  const placeArray = useSelector((state)=>state.viewedPlaces);
  const dispatch = useDispatch();
  console.log(placeArray);

  const navigate = useNavigate();

  const retrievePlaceNames = async () => {
    try {
      const result = await fetch("http://localhost:8000/explore",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Important for cookies
    });
    console.log(result);
    
    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.msg || 'Failed to retrieve place names');
  }
      const data = await result.json();
      const uniquePlaces = Array.from(new Set([...places, ...data]));
      setPlaces(uniquePlaces);
    } catch (error) {
      console.error("Error fetching destination names:", error);
    }
  };

  const getPhoto = async (place) => {
    try {
      const result = await fetch(`https://api.unsplash.com/photos/random?query=${place}&client_id=msYHpLbCgs8wk7TKWjuo4T9-tBJ8_BIFDIMLDfgRT_Q`);
      
      if (!result.ok) {
        console.error(`Error fetching photo for ${place}: ${result.statusText}`);
        return background;
      }
  
      const data = await result.json();
      return data.urls.regular || background;
    } catch (error) {
      console.error(`Error fetching photo for ${place}: ${error.message}`);
      return emptiness;
    }
  };

  const getBackgroundPhotos = async (placesArray) => {
    const photoMap = {};

    for (const place of placesArray) {
      const photo = await getPhoto(place);
      const photoWithOverlay = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${photo})`;
      photoMap[place] = photoWithOverlay;
    }

    setPlaceWithPhoto(photoMap);
    setLoading(false); // Set loading to false when photos are loaded
  };

  useEffect(() => {
    retrievePlaceNames();
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      setLoading(true); // Set loading to true when new places are fetched
      getBackgroundPhotos(places);
    }
  }, [places]);

  const searchDestination = async(e)=>{
    let searchKey = e.target.value;
    if(searchKey){
      setKey(searchKey);
      let result = await fetch(`http://localhost:8000/search/${searchKey}`);
      result = await result.json();
      setSearchPlaces(result);
    } else if(searchKey === ""){
      setKey("");
      setSearchPlaces([]);
    }
  }

  const openReviewsPage = async (place) => {
    try {
      dispatch(addPlace(place));
      navigate(`/explore/${place}`);
      const apiRequest = fetch(`http://localhost:8000/place/${place}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const [apiResponse] = await Promise.all([apiRequest]);
  
      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log(data);
      } else {
        console.error('API Request Error:', apiResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <div className="search-container" style={{ backgroundImage: `url(${balloons1})`, backgroundSize: 'cover' }}>
        <input type="text" className="search-input-box" placeholder="I want to visit..." onChange={searchDestination}/>
        <div className="search-para">
          {(key && key.trim() !== "") ? <p>Results for {key}...</p> : null}
        </div>
      </div>
      {loading && places?.length>0 && (
        <>
        <div style={{height:"90px"}}>
          <p style={{margin:"auto"}}>Loading...</p>
        </div>
        <div className="loading-container">
          <img className="loading-img" src={loadPlane} alt="Loading..." />
        </div>
        </>
      )}
      {!loading && (searchPlaces.length === 0 && key !== "") && (
  <div className="no-result-container">
    <img className="no-result-img" src={emptiness} alt="No results to display" />
  </div>
)}

{/* <img src={road} alt="" className="road-bckgrnd"/> */}

{!loading && (searchPlaces.length > 0 || (key === "" && places.length > 0)) && (
  <div className="all-places-container">
    {(searchPlaces.length > 0 ? searchPlaces : places).map((place, index) => (
      <div className="place-container" key={index} style={{ backgroundImage: placeWithPhoto[place], backgroundSize: 'cover' }} onClick={()=>openReviewsPage(place)}>
        <p className="place-name">{place}</p>
      </div>
    ))}
  </div>
)}
{
  places.length===0 ? <div style={{width:"90vw", margin:"auto", marginTop:"100px"}}><img style={{width:"100%"}} src={emptiness} alt="" /></div> : <></>
}
    </div>
  );
};

export default Explore;
