import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// context data
import { DataContext } from "../../context/DataProvider";

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
    photoLink:""
}

const Add = (props) => {
    sessionStorage.setItem("previousPage", window.location.pathname);
    const [destinationData, setDestinationData] = useState(destinationInitialValue);
    const { account, setAccount } = useContext(DataContext);
    const params = useParams();

    const onInputChange = (e)=>{
        setDestinationData({...destinationData, [e.target.name] : e.target.value});
    }

    const navigate = useNavigate();

    const submitDestination = ()=>{
        if(!destinationData.place || !destinationData.touristAttractions || !destinationData.state || !destinationData.city || !destinationData.country || !destinationData.budget || !destinationData.briefDescription || !destinationData.daysRequired || !destinationData.detailedReview || !destinationData.timePeriod){
            alert("Please enter all the fields");
        }else{
            addDestination();
        }
    }

    const addDestination = async () => {
        const dataToSend = {
          ...destinationData,
          userId: account.userId,
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
            console.error("Error adding destination:", result.statusText);
            return;
          }
      
          result = await result.json();
      
          if (result) {
            alert("Destination Added");
            navigate("/explore");
            setDestinationData(destinationInitialValue);
          }
        } catch (error) {
          console.error("Error adding destination:", error.message);
        }
      };

      const getReview = async () => {
        try {
          let result = await fetch(`http://localhost:8000/review/${params.id}`);
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
        try{
          let result = await fetch(`http://localhost:8000/update-review/${params.id}`,{
            method:"PUT",
            body: JSON.stringify(destinationData),
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
