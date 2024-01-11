import user from "./img/user.png";
import reviewBack from "./img/reviewBack.jpg";

//css
import "./review.css";

const Review = (props)=>{
    const review = props.review;
    const getDate = () => {
        const spaceIndex = review.dateCreated.indexOf("T");
        return spaceIndex !== -1 ? review.dateCreated.substring(0, spaceIndex) : review.dateCreated;
      };
    return(
    <div className="main-review-container" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${reviewBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="review-container">
        <div className="reviewer-info-container">
            <div className="image-box">
                <img src={user} alt="" />
            </div>
            <div className="reviewer-info">
            <p style={{fontWeight:"600", margin:0}}>{review.userId.name}</p>
            <p style={{marginTop:1, fontSize:"14px"}}>on {getDate()}</p>
            </div>
        </div>
        <p style={{fontWeight:"600", marginTop:"1em"}}>{review.briefDescription}</p>
        <p style={{fontWeight:800, fontSize:"1.1em"}}>Attractions: {review.touristAttractions}</p>
        <p style={{fontWeight:"600"}}>Budget(for 2 people): Rs. {review.budget} for {review.daysRequired} days</p>
    </div>
    <div className="detailed-btn-container">
        <button>Read detailed review</button>
    </div>
    </div>
    );
}

export default Review;