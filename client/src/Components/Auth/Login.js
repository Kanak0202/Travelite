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

    const login = async()=>{
        let result = await fetch("http://localhost:8000/login",{
                method:"post",
                body:JSON.stringify(loginData),
                headers:{
                    'Content-type': 'application/json',
                }
            });
            result = await result.json();
            if(result.userData.email && result.userData.name){
                setIncorrectDetails(false);
                setAccount({email:result.userData.email, name:result.userData.name});
                navigate("/");
            }else if(!result.userData.email || !result.userData.name){
                setIncorrectDetails(true);
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
                {incorrectDetails ? <p>Either email or password incorrect</p> : <></>}
                <input type="email" className="input-box" placeholder="Enter email" onChange={(e)=>{onInputChange(e)}} name="email" value={loginData.email}></input>
                <input type="password" className="input-box" placeholder="Enter password" onChange={(e)=>{onInputChange(e)}} name="password" value={loginData.password}></input>
                <button type="submit" className="auth-btn" onClick={()=>loginUser()}>Login</button>
            </div>
    </div>
    );
}

export default Login;