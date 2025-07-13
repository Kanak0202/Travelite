import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import most from "../img/most.jpg";
//icons
import WhatshotIcon from '@mui/icons-material/Whatshot';

const MostViewed = (props)=>{
    const sectionName = props.section;
    const [mostViewedplaces, setMostViewedplaces] = useState([]);
    const [topRatedPlaces, setTopRatedPlaces] = useState([]);
    const navigate = useNavigate();
    const getMostViewedPlaces = async()=>{
        try{
            let result = await fetch(`${process.env.REACT_APP_URL}/most-viewed-place`);
            if(!result){
                console.log("Error finding the places");
            }
            const data = await result.json();
            setMostViewedplaces(data);
        }catch(error){
            console.log(error);
        }
    }
    const getTopRatedPlaces = async()=>{
        try{
            let result = await fetch(`${process.env.REACT_APP_URL}/top-rated-places`);
            if(!result){
                console.log("Error finding the places");
            }
            const data = await result.json();
            setTopRatedPlaces(data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getMostViewedPlaces();
        getTopRatedPlaces();
    },[])

    const openReviewsPage = async (place) => {
        try {
          navigate(`/explore/${place}`);
          const apiRequest = fetch(`${process.env.REACT_APP_URL}/place/${place}`, {
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
        <>
          {mostViewedplaces.length > 0 && topRatedPlaces.length > 0
        ?
        <div>
            <div className="main-container-most">
                {sectionName === "most-viewed" ? 
                <div>
                  <WhatshotIcon style={{fontSize:"2.5rem", marginRight:"1rem"}} className="blink"/>
                </div>
                 : 
                 <></>}
                <h1 style={{fontSize:"33px", marginBottom:"2rem"}}>
                  {sectionName === "most-viewed" ? 
                  <span>Trending destinations</span>
                  : 
                  <span>#Top Rated</span>}
                </h1>
            </div>
            {
              sectionName === "most-viewed"
              ?
              <div className="most-place-container">
                {mostViewedplaces.map((place, index)=>{
                    return(
                        <div className="place" key={index} onClick={()=>openReviewsPage(place.name)} style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${most})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}>
                            {place.name}
                        </div>
                    );
                })}
            </div>
            :
            <div className="most-place-container">
                {topRatedPlaces?.map((place, index)=>{
                    return(
                        <div className="place" key={index} onClick={()=>openReviewsPage(place.name)} style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${most})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}>
                            <p>{place.name}</p>
                        </div>
                    );
                })}
            </div>
            }
        </div>
        :
      <></>}
        </>
    );
}

export default MostViewed;