import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//css
import "./single.css";
//icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//context
import { DataContext } from "../../context/DataProvider";
import CurrencyConverter from "../Currency Converter/CurrencyConverter";
//components
import SinglePageRating from "./Rating Display/SinglePageRating";

const SingleReview = () => {
  const params = useParams();
  const [review, setReview] = useState({});
  const {account} = useContext(DataContext);
  const [likeCount, setLikeCount] = useState(0);
  const [likedByUser, setLikedByuser] = useState(false);
  const [openCC, setOpenCC] = useState(false);

  const checkIfLiked = ()=>{
    for(let i = 0;i<review[0]?.likedBy.length;i++){
      if(review[0]?.likedBy[i] === account.userId){
        setLikedByuser(true);
      }
    }
  }

  const detail = review[0]?.detailedReview.split("\n");
  console.log(detail);

  const getReview = async () => {
    try {
      let result = await fetch(`http://localhost:8000/review/${params.id}`);
      if (!result.ok) {
        console.log("Error fetching data");
        return;
      }
      const data = await result.json();
      setReview(data);
      if(data[0].likeCount>0){
        setLikeCount(data[0]?.likeCount);
      }
      for(let i = 0;i<data[0]?.likedBy.length;i++){
        if(data[0]?.likedBy[i] === account.userId){
          setLikedByuser(true);
        }
      }
      checkIfLiked();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const getDate = () => {
    const spaceIndex = review[0]?.dateCreated.indexOf("T");
    return spaceIndex !== -1 ? review[0]?.dateCreated.substring(0, spaceIndex) : review[0]?.dateCreated;
};

const likeDislike = async()=>{
  try {
    let result = await fetch(`http://localhost:8000/like-review/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({userId:account.userId}),
      headers: {
          'Content-type': 'application/json',
      }
  });
    if (!result.ok) {
      console.log("Error fetching data");
      return;
    }
    const data = await result.json();
    setLikeCount(data.likeCount);
    if(data.likeCount>0){
      for(let i = 0;i<data.likedBy.length;i++){
        if(data.likedBy[i] === account.userId){
          setLikedByuser(true);
        }else{
          setLikedByuser(false);
        }
      }
    }else{
      setLikedByuser(false);
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


  return (
    <div className="main-container">
      <h1 style={{fontSize:"60px"}}>{review[0]?.place}</h1>
      
      <div className="info-container">
      <div>
      {likeCount ? <p><span style={{fontWeight:600, fontSize:"17px"}}>{likeCount} </span>people found this review <span style={{fontWeight:600}}>helpful</span></p> : <></>}
      </div>
      <div className="user-info">
        <p style={{margin:0}}><span style={{fontSize:"16px", fontWeight:500}}>by</span> {review[0]?.userId.name}</p>
        <p style={{margin:0, marginTop:"2px", fontSize:"16px", fontWeight:500}}>{getDate()}</p>
      </div>
      </div>
      <div className="detailed-review-container">
      <h1>Review</h1>
        {detail?.map((rev, index)=>{
          return(
            <p>{rev}</p>
          );
        })}
      </div>
      <div className="card-container">
        <div className="card">
            <p style={{margin:0, fontSize:"19px", fontWeight:800, lineHeight:"30px"}}>{review[0]?.touristAttractions}</p>
        </div>
        <div className="card">
    <a href={review[0]?.photoLink} style={{textDecoration:"none", color:"black", fontSize:"25px"}} target="_blank" rel="noopener noreferrer">
        View Photos
    </a>
</div>
        <div className="card">
            <p style={{margin:0, fontSize:"30px", fontWeight:800}}>{review[0]?.daysRequired} days</p>
            <p style={{margin:0, marginTop:"5px", fontSize:"18px"}}>required</p>
        </div>
        <div className="card">
            <p style={{margin:0, fontSize:"30px", fontWeight:800}}>Rs. {review[0]?.budget}</p>
            <p style={{margin:0, marginTop:"5px", fontSize:"18px"}}>for 2 people</p>
            <button style={{marginTop:"10px", backgroundColor:"black", color:"white", cursor:"pointer"}} onClick={() => setOpenCC(true)}>Currency Converter</button>
            {
              openCC ? <CurrencyConverter func={()=>setOpenCC(false)}/> : <></>
            }
        </div>
      </div>
      {review[0]?.safetyOfWomen ? <SinglePageRating review={review}/> : <></>}
      <div className="like-review-container">
        <p style={{margin:0, fontSize:"16px", fontWeight:600}}>Liked this review? Give a thumbs up</p>
        <button className="like-btn" style={{ marginLeft: "10px" }} onClick={likeDislike}>
  {likedByUser ? (
    <ThumbUpIcon className="icon" color="primary" />
  ) : (
    <ThumbUpOutlinedIcon className="icon" color="primary" />
  )}
</button>
      </div>
    </div>
  );
};

export default SingleReview;
