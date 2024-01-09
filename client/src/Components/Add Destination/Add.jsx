import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    daysRequired:"",
    briefDescription:"",
    detailedReview:"",
}

const Add = () => {
    const [destinationData, setDestinationData] = useState(destinationInitialValue);
    const { account, setAccount } = useContext(DataContext);

    const onInputChange = (e)=>{
        setDestinationData({...destinationData, [e.target.name] : e.target.value});
    }

    const navigate = useNavigate();

    const submitDestination = ()=>{
        if(!destinationData.place || !destinationData.touristAttractions || !destinationData.state || !destinationData.city || !destinationData.country || !destinationData.budget || !destinationData.briefDescription || !destinationData.daysRequired || !destinationData.detailedReview){
            alert("Please enter all the fields");
        }else{
            addDestination();
        }
    }

    const addDestination = async()=>{
        const dataToSend = {
            ...destinationData,
            userId: account.userId,
        };
        // console.log(dataToSend);
        let result = await fetch("http://localhost:8000/add",{
                method:"post",
                body:JSON.stringify(dataToSend),
                headers:{
                    'Content-type': 'application/json',
                }
            });
            result = await result.json();
            if(result){
                alert("Destination Added");
                navigate("/explore");
                setDestinationData(destinationInitialValue);
            }
    }

    return (
        <div className="auth-form">
            <h1>Share the Majestics</h1>
            <div className="input-box-container">
                <input type="text" className="input-box" placeholder="Name of place" onChange={(e)=>{onInputChange(e)}} name="place" value={destinationData.place}></input>
                <input type="text" className="input-box" placeholder="Best tourist attractions" onChange={(e)=>{onInputChange(e)}} name="touristAttractions" value={destinationData.touristAttractions}></input>
                <input type="text" className="input-box" placeholder="State or province located in" onChange={(e)=>{onInputChange(e)}} name="state" value={destinationData.state}></input>
                <input type="text" className="input-box" placeholder="City or district or town located in" onChange={(e)=>{onInputChange(e)}} name="city" value={destinationData.city}></input>
                <input type="text" className="input-box" placeholder="Country located in" onChange={(e)=>{onInputChange(e)}} name="country" value={destinationData.country}></input>
                <input type="number" className="input-box" placeholder="Budget required (in INR)" onChange={(e)=>{onInputChange(e)}} name="budget" value={destinationData.budget}></input>
                <input type="number" className="input-box" placeholder="Days required" onChange={(e)=>{onInputChange(e)}} name="daysRequired" value={destinationData.daysRequired}></input>
                <input type="text" className="input-box" placeholder="Brief description of the culture (max 30 words)" onChange={(e)=>{onInputChange(e)}} name="briefDescription" value={destinationData.briefDescription}></input>
                <input type="text" className="input-box" placeholder="Detailed review" onChange={(e)=>{onInputChange(e)}} name="detailedReview" value={destinationData.detailedReview}></input>
                <button type="submit" className="auth-btn" onClick = {()=>submitDestination()}>Add</button>
            </div>
        </div>
    );
}

export default Add;
