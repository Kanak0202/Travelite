import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// context data
import { DataContext } from "../../context/DataProvider";
import Photoframe from "../Photoframe/Photoframe";
import Rating from "./Rating";
//images
import photo1 from "./img/photo1.jpg"
import photo2 from "./img/photo2.jpeg"
import photo3 from "./img/photo3.jpeg"
//css
import "./add.css"
//redux
import { addUser } from "../../Redux Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const destinationInitialValue = {
    userId:"",
    place:"",
    touristAttractions:"",
    state:"",
    city:"",
    country:"",
    budget:"",
    timePeriod:"",
    daysRequired:"",
    briefDescription:"",
    detailedReview:"",
    photoLink:"",
    cleanliness:null,
    cuisine:null,
    money:null,
    veg:null,
    transportation:null,
    accommodation:null,
}

const Add = (props) => {
    sessionStorage.setItem("previousPage", window.location.pathname);
    const [destinationData, setDestinationData] = useState(destinationInitialValue);
    const { account, setAccount } = useContext(DataContext);
    const [cleanliness, setCleanliness] = useState(null);
    const [money, setMoney] = useState(null);
    const [veg, setVeg] = useState(null);
    const [accommodation, setAccommodation] = useState(null);
    const [transportation, setTransportation] = useState(null);
    const [cuisine, setCuisine] = useState(null);
    const [safetyOfWomen, setSafetyOfWomen] = useState(null);
    // console.log("Cleanliness: ",cleanliness, " Cuisine: ", cuisine, "money: ", money, "veg food: ", veg, "transportation: ", transportation, "accommodation: ", accommodation);
    const params = useParams();
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onInputChange = (e)=>{
        setDestinationData({...destinationData, [e.target.name] : e.target.value});
    }

    const navigate = useNavigate();

    const submitDestination = () => {
      if (!(destinationData.place && 
        destinationData.touristAttractions && 
        destinationData.state && 
        destinationData.city && 
        destinationData.country && 
        destinationData.budget !== undefined && 
        destinationData.briefDescription && 
        destinationData.daysRequired !== undefined && 
        destinationData.detailedReview && 
        destinationData.timePeriod && 
        destinationData.cleanliness !== undefined && 
        destinationData.accommodation !== undefined && 
        destinationData.money !== undefined && 
        destinationData.veg !== undefined && 
        destinationData.transportation !== undefined && 
        destinationData.cuisine !== undefined && 
        destinationData.safetyOfWomen !== undefined)) {
      alert("Please enter all the fields");
  } else {
      addDestination();
  }
  }

    const addDestination = async () => {
      console.log("Inside add fucntion");
      setLoading(true);
      const dataToSend = {
        ...destinationData,
        userId: account.userId,
        cleanliness: cleanliness,
        money: money,
        veg: veg,
        accommodation: accommodation,
        transportation: transportation,
        cuisine: cuisine,
        safetyOfWomen:safetyOfWomen,
        averageRating: parseFloat(((cleanliness + money + safetyOfWomen + accommodation + veg + transportation + cuisine) / 7).toFixed(2))
      };
      
        try {
          let result = await fetch("http://localhost:8000/add", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-type': 'application/json',
            },
          });
          
          if (!result.ok) {
            setLoading(false);
            alert("Invalid data, Please try again");
            console.error("Error adding destination:", result.statusText);
            return;
          }
      
          result = await result.json();
          if(result.msg === "Incomplete review"){
            setLoading(false);
            alert("Please enter all the fields");
          }
      
          if (result) {
            const updatedUser = {
              ...user.user,
              rewardPoints : user.user.rewardPoints + 50
            }
            dispatch(addUser(updatedUser))
            setLoading(false);
            alert("Destination Added");
            navigate("/explore");
            setDestinationData(destinationInitialValue);
          }
        } catch (error) {
          setLoading(false);
          alert("Invalid data, Please try again");
          console.error("Error adding destination:", error.message);
        }
      };

      const getReview = async () => {
        try {
          let result = await fetch(`http://localhost:8000/review/${params.id}`);
          console.log("Result: ", result);
          
          if (!result.ok) {
            console.log("Error fetching data");
            return;
          }
          const data = await result.json();
          setDestinationData(data[0]);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      useEffect(()=>{
        if(props.page === "updateReview"){
          getReview();
        }
      }, [params.id])

      const updateReview = async()=>{
        const dataToSend = {
          ...destinationData,
          userId: account.userId,
          cleanliness: cleanliness,
          money: money,
          veg: veg,
          accommodation: accommodation,
          transportation: transportation,
          cuisine: cuisine,
          safetyOfWomen:safetyOfWomen,
          averageRating: parseFloat(((cleanliness + money + safetyOfWomen + accommodation + veg + transportation + cuisine) / 7).toFixed(2))
        };
        try{
          let result = await fetch(`http://localhost:8000/update-review/${params.id}`,{
            method:"PUT",
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!result.ok) {
            console.log("Error fetching data");
            return;
          }
          const data = await result.json();
          alert("Review updated successfully");
          navigate(-1);
        }catch(error){
          console.error("Error fetching data:", error.message);
        }
      }

    return (
        <div className="auth-form">
        {loading 
        ?
        <div className="loading-container">
          <p>Please wait while we process your review 🙂</p>
        </div>
        :
        <></>
         }
        <Photoframe left="50px" image={photo1}/>
        <Photoframe left="150px" image={photo2}/>
        <Photoframe left="250px" image={photo3}/>
            {props.page === "updateReview"
            ?
            <h1>Update your Review</h1>
            :
            <h1>Share the Majestics</h1>}
            <div className="input-box-container">
                <input type="text" className="input-box" placeholder="Name of place" onChange={(e)=>{onInputChange(e)}} name="place" value={destinationData.place}></input>
                <input type="text" className="input-box" placeholder="Best tourist attractions" onChange={(e)=>{onInputChange(e)}} name="touristAttractions" value={destinationData.touristAttractions}></input>
                <input type="text" className="input-box" placeholder="State or province located in" onChange={(e)=>{onInputChange(e)}} name="state" value={destinationData.state}></input>
                <input type="text" className="input-box" placeholder="City or district or town located in" onChange={(e)=>{onInputChange(e)}} name="city" value={destinationData.city}></input>
                <input type="text" className="input-box" placeholder="Country located in" onChange={(e)=>{onInputChange(e)}} name="country" value={destinationData.country}></input>
                <input type="number" className="input-box" placeholder="Budget required for 2 persons (in INR)" onChange={(e)=>{onInputChange(e)}} name="budget" value={destinationData.budget}></input>
                <input type="text" className="input-box" placeholder="Best time to visit (eg. October-December)" onChange={(e)=>{onInputChange(e)}} name="timePeriod" value={destinationData.timePeriod}></input>
                <input type="number" className="input-box" placeholder="Days required" onChange={(e)=>{onInputChange(e)}} name="daysRequired" value={destinationData.daysRequired}></input>
                <input type="text" className="input-box" placeholder="Brief description of the culture (max 30 words)" onChange={(e)=>{onInputChange(e)}} name="briefDescription" value={destinationData.briefDescription}></input>
                <textarea type="text" style={{fontFamily:"sans-serif", lineHeight:"25px", fontSize:"17px"}} rows={5} className="input-box" placeholder="Detailed review" onChange={(e)=>{onInputChange(e)}} name="detailedReview" value={destinationData.detailedReview}></textarea>
                <input type="text" className="input-box" placeholder="Photos' drive link (optional)" onChange={(e)=>{onInputChange(e)}} name="photoLink" value={destinationData.photoLink}></input>
                <div className="rating-container">
                <div>
                <p style={{fontSize:"1.3rem"}}>How much will you rate this place for - </p>
                </div>
                <div className="star-section">
                <div className="star-indiv">
                <p>Cleanliness <Rating setPropertyValue={(val)=>setCleanliness(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Cuisine <Rating setPropertyValue={(val)=>setCuisine(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Value for money <Rating setPropertyValue={(val)=>setMoney(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Availability of veg food <Rating setPropertyValue={(val)=>setVeg(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Availability of transportation <Rating setPropertyValue={(val)=>setTransportation(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Accommodations <Rating setPropertyValue={(val)=>setAccommodation(val)}/></p>
                </div>
                <div className="star-indiv">
                <p>Women Safety<Rating setPropertyValue={(val)=>setSafetyOfWomen(val)}/></p>
                </div>
                </div>
                
                
                
                
                
                </div>
                {
                  props.page === "updateReview"
                  ?
                  <button type="submit" className="auth-btn" onClick = {()=>updateReview()}>Update</button>
                  :
                  <button type="submit" className="auth-btn" onClick = {()=>submitDestination()}>Add</button>
                }
            </div>
        </div>
    );
}

export default Add;
