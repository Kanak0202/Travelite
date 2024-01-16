import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//context data
import { DataContext } from "../../context/DataProvider";
//css
import "./auth.css";

const loginInitialValues = {
    email:'',
    password:''
}

const Login = ()=>{
    const [loginData, setLoginData] = useState(loginInitialValues);
    const [incorrectDetails, setIncorrectDetails] = useState(false);

    const {account, setAccount} = useContext(DataContext);

    const navigate = useNavigate();

    const onInputChange = (e)=>{
        setLoginData({...loginData, [e.target.name] : e.target.value});
    }

    const login = async () => {
        let result = await fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify(loginData),
            headers: {
                'Content-type': 'application/json',
            }
        });
        result = await result.json();
        if (result.userData && result.userData.email && result.userData.name && result.userData.userId) {
            setIncorrectDetails(false);
            setAccount({ email: result.userData.email, name: result.userData.name, userId: result.userData.userId});
            const previousPage = sessionStorage.getItem("previousPage");
        if (previousPage === "/signup") {
            navigate("/");
        } else {
            navigate(-1);
        }
        } else if (result.msg === "Invalid Email or Password") {
            setIncorrectDetails(true);
        } else if (result.msg === "User not found in records") {
            alert("Invalid credentials, please sign up first");
            navigate("/signup");
        }
    }

    const loginUser = ()=>{
        if(!loginData.email || !loginData.password){
            alert("Please enter complete data");
        }else{
            login();
            setLoginData(loginInitialValues);
        }
    }

    return(
        <div className="auth-form">
            <h1>Login</h1>
            <div className="input-box-container">
                {incorrectDetails ? <p>Invalid email or password</p> : <></>}
                <input type="email" className="input-box" placeholder="Enter email" onChange={(e)=>{onInputChange(e)}} name="email" value={loginData.email}></input>
                <input type="password" className="input-box" placeholder="Enter password" onChange={(e)=>{onInputChange(e)}} name="password" value={loginData.password}></input>
                <p  style={{margin:"20px", marginTop:"30px"}}>Not a user already☹️? <a style={{color:"black", marginLeft:"5px", fontSize:"18px"}} href="">Sign Up</a></p>
                <button type="submit" className="auth-btn" onClick={()=>loginUser()}>Login</button>
            </div>
            <div className="whitespace">
            </div>
    </div>
    );
}

export default Login;