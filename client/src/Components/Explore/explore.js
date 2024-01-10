import React, { useEffect, useState } from "react";
import emptiness from "./img/emptmain.png";
import background from "./img/background.jpg";
import loadPlane from "./img/loadPlane.gif"; // Adjust the path accordingly
import "./explore.css";

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [placeWithPhoto, setPlaceWithPhoto] = useState({});
  const [loading, setLoading] = useState(true);

  const retrievePlaceNames = async () => {
    try {
      const result = await fetch("http://localhost:8000/explore");
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

  const getBackgroundPhotos = async () => {
    const photoMap = {};

    for (const place of places) {
      const photo = await getPhoto(place);
      const photoWithOverlay = `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), url(${photo})`;
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
      getBackgroundPhotos();
    }
  }, [places]);

  return (
    <div>
      {loading && (
        <div className="loading-container">
          {/* <p>Loading...</p> */}
          <img className="loading-img" src={loadPlane} alt="Loading..." />
        </div>
      )}
      {!loading && places.length === 0 && (
        <div className="no-result-container">
          <img className="no-result-img" src={emptiness} alt="No results to display" />
        </div>
      )}
      {!loading && places.length > 0 && (
        <div className="all-places-container">
          {places.map((place, index) => (
            <div className="place-container" key={index} style={{ backgroundImage: placeWithPhoto[place], backgroundSize: 'cover' }}>
              <p className="place-name">{place}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
