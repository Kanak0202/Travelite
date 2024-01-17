import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../Reviews/Review";
import NoReviews from "./No Reviews/NoReviews";

const TopReviews = ()=>{
    const [reviews, setReviews] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const params = useParams();
    const retrieveReviews = async () => {
      try {
        let result = await fetch(`http://localhost:8000/topUserReviews/${params.id}?type=topReviews`, {
          method: "GET",
        });
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

      useEffect(() => {
        retrieveReviews();
      }, [params.id]);
    return(
        <div>
            <div className="top-reviews-container">
              <h1 style={{textAlign:"left", fontSize:"40px", margin:"auto"}}>Top Reviews</h1>
            </div>
            {
              reviews.length >0 
              ?
              <>
              <div className="all-reviews-container" style={{marginTop:"20px"}}>
            {viewMore
          ? reviews.map((review, index) => (
              <Review key={index} review={review} page="topUserReview" />
            ))
          : reviews.slice(0, 3).map((review, index) => (
              <Review key={index} review={review} page="topUserReview" />
            ))}

            </div>
            {reviews.length > 3 ? <p style={{cursor:"pointer", textDecoration:"underline", color:"blue"}} onClick={() => setViewMore(prev => !prev)}>{viewMore ? <>View Less</> : <>View More</>}</p> : <></>}
              </>
              :
              <NoReviews />
            }
        </div>
    );
}

export default TopReviews;