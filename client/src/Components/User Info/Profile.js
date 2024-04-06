import { useParams } from "react-router-dom";
import cover from "./img/cover.jpg";
import user from "./img/user.png";
//css
import "./profile.css";
import { useEffect, useState } from "react";

import TopReviews from "./TopReviews";

const Profile = ()=>{
    const params = useParams();
    const [userData, setUserData] = useState([]);
    const getUser = async()=>{
        try{
            let result = await fetch(`http://localhost:8000/profile/${params.id}`);
            if(result){
                const data = await result.json();
                setUserData(data);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getUser();
    }, []);

    sessionStorage.setItem("previousPage", window.location.pathname);
    return(
        <div className="profile-main-container">
            <div className="profile-cover-photo">
                <img className="cover-image" src={cover} alt="" />
            </div>
            <div className="user-image-container">
                <img src={user} alt="" />
            </div>
            <div className="info-section">
                <div style={{margin:0}}>
                    <p style={{fontSize:"40px",margin:0}}>{userData[0]?.name}</p>
                </div>
                <div style={{marginTop:"10px"}}>
                    <p style={{margin:0}}>lives in {userData[0]?.city}, {userData[0]?.state}, {userData[0]?.country}</p>
                </div>
                <div style={{width:"50%", margin:"auto", marginTop:"50px"}} className="card-container">
                    <div style={{width:"15%", height:"20%", margin:"auto", padding:"30px"}} className="card">
                        <p style={{fontSize:"30px", margin:0}}>4</p>
                        <p style={{fontSize:"16px"}}>reviews added</p>
                    </div>
                    <div style={{width:"15%", height:"20%", margin:"auto", padding:"30px"}} className="card">
                        <p style={{fontSize:"30px", margin:0}}>1000+</p>
                        <p style={{fontSize:"16px"}}>views gained</p>
                    </div>
                    <div style={{width:"15%", height:"20%", margin:"auto", padding:"30px"}} className="card">
                        <p style={{fontSize:"30px", margin:0}}>50+</p>
                        <p style={{fontSize:"16px"}}>people helped</p>
                    </div>
                </div>
            </div>
            
            <hr style={{width:"86%", textAlign:"left", marginTop:"100px"}}/>
            <TopReviews />
        </div>
    );
}

export default Profile;