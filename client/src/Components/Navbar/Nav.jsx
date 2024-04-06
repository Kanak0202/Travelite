import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// context data
import { DataContext } from "../../context/DataProvider";
//icons
import LogoutIcon from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PlaceIcon from '@mui/icons-material/Place';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
//redux
import { useDispatch, useSelector } from "react-redux";

// css
import "./nav.css";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsUserLoggedIn(!!account.email);
  }, [account]);

  const handleLogout = () => {
    setAccount({ email: "", name: "" });
    navigate("/");
  };

  const viewProfile = ()=>{
    // console.log("This opens up the user's profile");
  }

  const getFirstName = () => {
    const spaceIndex = account.name.indexOf(" ");
    return spaceIndex !== -1 ? account.name.substring(0, spaceIndex) : account.name;
  };

  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');

    // Check if the scroll position is greater than a certain threshold
    if (window.scrollY > 50) {
        navbar.classList.add('nav-on-scroll');
    } else {
        navbar.classList.remove('nav-on-scroll');
    }
});

  return (
    <div className = "nav-container" id="navbar">
      <div className="logo-container">
        <p>Travelite</p>
      </div>
      <div className="navlink-container">
        <ul>
          <li>
            <Link className="" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="" to="/explore">
              Explore
            </Link>
          </li>
          {
            isUserLoggedIn 
            ? 
            <li>
            <Link className="" to="/add">
              Add Destination
            </Link>
          </li>
            :
            <></>
          }
        </ul>
      </div>
      {isUserLoggedIn ? (
        <div className="auth-container">
          <ul>
          <li>
              <Link className="" to="/contact" onClick={()=>navigate("/contact")}>
                Review Us
              </Link>
            </li>
            <li onMouseEnter={() => setShowProfileDropdown(true)} onMouseLeave={() => setShowProfileDropdown(false)}>
              <Link className="" to="/" onClick={viewProfile()}>
                {getFirstName()}
              </Link>
              {showProfileDropdown && (
          <div className="profile-dropdown">
          <div className="blank"></div>
          <div className="dropdown">
            <div className="list-item-dropdown">
              <EmojiEventsIcon style={{marginRight:"10px", fontSize:"20px"}}/>
              <p>My Points: {user?.user.rewardPoints}</p>
            </div>
            <div className="list-item-dropdown" onClick={() => navigate(`/profile/${account.userId}`)}>
              <AccountBoxIcon style={{marginRight:"10px", fontSize:"20px"}}/>
              <p>My Profile</p>
            </div>
            <div className="list-item-dropdown" onClick={() => navigate(`/my-uploads/${account.userId}`)}>
                <RateReviewIcon style={{marginRight:"10px", fontSize:"20px"}}/>
                <p>My Uploads</p>
            </div>
            <div className="list-item-dropdown" onClick={() => navigate('/places-visited')}>
              <PlaceIcon style={{marginRight:"10px", fontSize:"20px"}} />
              <p>Places Visited</p>
            </div>
            <div className="list-item-dropdown" onClick={handleLogout}>
            <LogoutIcon style={{marginRight:"10px", fontSize:"20px"}}/>
            <p>Logout</p>
            </div>
          </div>
          </div>
        )}
            </li>
          </ul>
        </div>
      ) : (
        <div className="auth-container">
          <ul>
          <li>
              <Link className="" to="/contact" onClick={()=>navigate("/contact")}>
                Review Us
              </Link>
            </li>
            <li>
              <Link className="" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
