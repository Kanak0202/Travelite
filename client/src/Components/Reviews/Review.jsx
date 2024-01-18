import user from "./img/user.png";
import reviewBack from "./img/reviewBack.jpg";
import { DataContext } from "../../context/DataProvider";

//css
import "./review.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

//icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Review = (props)=>{
    const review = props.review;
    const navigate = useNavigate();
    const {account} = useContext(DataContext);
    const getDate = () => {
        const spaceIndex = review.dateCreated.indexOf("T");
        return spaceIndex !== -1 ? review.dateCreated.substring(0, spaceIndex) : review.dateCreated;
      };
      const openReview = (id)=>{
        if(account.email!=="" && account.userId!==""){
            navigate(`/review/${id}`);
        }else{
            props.func("visible");
        }
      }

      const goToProfile = ()=>{
        if(account.email !== ""){
            navigate(`/profile/${review.userId._id}`)
        }else{
            props.func("visible");
        }
      }

      const deleteReview = async(id)=>{
        try{
            let result = await fetch("http://localhost:8000/deleteReview", {
                method:"DELETE",
                body: JSON.stringify({id:id}),
            headers: {
                'Content-type': 'application/json',
            }
            });
            if(!result){
                console.log("Could not delete review");
            }
            const data = await result.json(result);
            console.log(data);
            props.func();
        }catch(error){
            console.error("Error deleting review:", error.message);
        }
      }

    return(
    <div className="main-review-container" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${reviewBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="review-container">
        {
            props.page === "topUserReview" || props.page === "uploads"
            ?
            <div style={{width:"100%"}}>
            <div style={{width:"100%"}}>
            <h1 style={{textAlign:"center", margin:0}}>{review.place}</h1>
            <p style={{textAlign:"right", margin:0}}>on {getDate()}</p>
            </div>
            <div>
            {review?.likeCount > 0 ? 
                <div className="review-like-count">
                <ThumbUpIcon style={{fontSize:"20px", marginRight:"10px"}}/>
                <p>{review.likeCount}</p>
            </div>
            :
            <></>}
            </div>
        </div>
        :
        <></>
        }
        {
            props.page === "topUserReview" || props.page === "uploads"
            ?
            <></>
        :
        <div className="reviewer-info-container">
            <div className="image-box">
                <img src={user} alt="" />
            </div>
            <div className="reviewer-info">
            <p className="review-user" style={{fontWeight:"600", margin:0}} onClick={()=>goToProfile()}>{review.userId.name}</p>
            <p style={{marginTop:1, fontSize:"14px"}}>on {getDate()}</p>
            </div>
            {review?.likeCount > 0 ? 
                <div className="review-like-count">
                <ThumbUpIcon style={{fontSize:"20px", marginRight:"10px"}}/>
                <p>{review.likeCount}</p>
            </div>
            :
            <></>}
        </div>
        }
        
        <p style={{fontWeight:"600", marginTop:"1em"}}>{review.briefDescription}</p>
        <p style={{fontWeight:800, fontSize:"1.1em"}}>Attractions: {review.touristAttractions}</p>
        <p style={{fontWeight:"600"}}>Budget(for 2 people): Rs. {review.budget} for {review.daysRequired} days</p>
        {
            review.timePeriod
            ?
            <p style={{fontWeight:"600"}}>Visit in the months of <span style={{fontWeight:"600", fontSize:"17px"}}>{review.timePeriod}</span></p>
            :
            <></>
        }
    </div>
    <div className="detailed-btn-container">
        {props.page === "uploads" 
        ? 
        <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <button style={{width:"30%", textAlign:"center"}} onClick={()=>{navigate(`/update-review/${review._id}`)}}>Update</button>
        <button style={{width:"30%", textAlign:"center", marginLeft:"10px"}} onClick={()=>{deleteReview(review._id)}}>Delete</button>
        </div>
        : 
        <button onClick={()=>{openReview(review._id)}}>Read detailed review</button>}
    </div>
    </div>
    );
}

export default Review;