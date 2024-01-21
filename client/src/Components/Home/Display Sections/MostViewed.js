import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import most from "../img/most.jpg";
//icons
import WhatshotIcon from '@mui/icons-material/Whatshot';

const MostViewed = ()=>{
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();
    const getMostViewedPlaces = async()=>{
        try{
            let result = await fetch("http://localhost:8000/most-viewed-place");
            if(!result){
                console.log("Error finding the places");
            }
            const data = await result.json();
            setPlaces(data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getMostViewedPlaces();
    },[])

    const openReviewsPage = async (place) => {
        try {
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


    return(
        <div>
            <div className="main-container-most">
                <div>
                  <WhatshotIcon style={{fontSize:"2.5rem", marginRight:"2rem"}} className="blink"/>
                </div>
                <h1 style={{fontSize:"33px", marginBottom:"2rem"}}><span>Trending</span> destinations</h1>
            </div>
            <div className="most-place-container">
                {places.map((place, index)=>{
                    return(
                        <div className="place" onClick={()=>openReviewsPage(place.name)} style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${most})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}>
                            {place.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MostViewed;