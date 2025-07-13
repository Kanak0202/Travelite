import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../Reviews/Review";
import NoReviews from "./No Reviews/NoReviews";

const Uploads = ()=>{
    const [reviews, setReviews] = useState([]);
    const params = useParams();
    const retrieveReviews = async () => {
        try {
          let result = await fetch(`${process.env.REACT_APP_URL}/${params.id}?type=uploads`);
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

      useEffect(()=>{
        retrieveReviews();
      }, [params.id]);
    return(
        <div>
            <div className="top-reviews-container">
              <h1 style={{textAlign:"center", fontSize:"40px", margin:"auto"}}>My Reviews ({reviews.length})</h1>
              <hr style={{width:"50%"}}/>
            </div>
            {
                reviews.length > 0 
                ?
                <div className="all-reviews-container" style={{marginTop:"20px"}}>
                {reviews.map((review, index)=>{
                    return(
                        <Review review={review} page="uploads" func={retrieveReviews}/>
                    );
                })}
            </div>
            :
            <NoReviews />
            }
        </div>
    );
}

export default Uploads;