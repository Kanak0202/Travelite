import {useState} from "react";
import {useNavigate} from "react-router-dom";
//css
import "./auth.css";

const signupInitialValues = {
    name:'',
    email: '',
    password: '',
    confirm: '',
    country:'',
    state:'',
    city:''
}

const Signup = ()=>{
    const [signup, setSignup] = useState(signupInitialValues);
    const [match, setMatch] = useState(true);
    sessionStorage.setItem("previousPage", window.location.pathname);
    const navigate = useNavigate();

    const onInputChange = (e)=>{
        setSignup({...signup, [e.target.name] : e.target.value});
    }

    const register = async ()=>{
        let result = await fetch(`${process.env.REACT_APP_URL}/signup`,{
                method:"post",
                body:JSON.stringify(signup),
                headers:{
                    'Content-type': 'application/json',
                }
            });
            result = await result.json();
            if(result.msg==="User already exists"){
                alert("Account alredy exists, Please login");
                navigate("/login");
            }
            if(result){
                navigate("/login");
            }
    }

    const signupUser = ()=>{
        if(signup.password !== signup.confirm){
            setMatch(false);
        }
        else if (
            !signup.name ||
            !signup.email ||
            !signup.password ||
            !signup.confirm ||
            !signup.country ||
            !signup.city ||
            !signup.state
          ) {
            alert("Please enter all the details");
        }
        else{
            setMatch(true);
            register();
            setSignup(signupInitialValues);
        }
    }

    return(
        <div className="auth-form">
            <h1>Sign Up</h1>
            <div className="input-box-container">
                <input type="text" className="input-box" placeholder="Full name" onChange={(e)=>onInputChange(e)} name="name" value={signup.name}></input>
                <input type="email" className="input-box" placeholder="Email" onChange={(e)=>onInputChange(e)} name="email" value={signup.email}></input>
                <input type="text" className="input-box" placeholder="Country" onChange={(e)=>onInputChange(e)} name="country" value={signup.country}></input>
                <input type="text" className="input-box" placeholder="State or province" onChange={(e)=>onInputChange(e)} name="state" value={signup.state}></input>
                <input type="text" className="input-box" placeholder="City or district or town" onChange={(e)=>onInputChange(e)} name="city" value={signup.city}></input>
                <input type="password" className="input-box" placeholder="Password" onChange={(e)=>onInputChange(e)} name="password" value={signup.password}></input>
                <input type="password" className="input-box" placeholder="Confirm password!" onChange={(e)=>onInputChange(e)} name="confirm" value={signup.confirm}></input>
                {
                    !match ? <p>Password didn't match</p> : <></>
                }
                <button type="submit" className="auth-btn" onClick={signupUser}>Sign Up</button>
            </div>
    </div>
    );
}

export default Signup;