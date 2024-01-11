import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import defaultBackground from "./img/defaultBackground.jpg";
//css
import "./review.css";

const PlaceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [background, setBackground] = useState(defaultBackground);

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
    console.log("Inside get photo");
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

  return (
    <div>
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
        <p className="reviews-for">Reviews for <span style={{fontSize:"60px"}}>{params.place}</span></p>
      </div>
      <div className="all-reviews-container">
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default PlaceReviews;
