import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// context data
import { DataContext } from "../../context/DataProvider";

// css
import "./nav.css";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

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

  return (
    <div className="nav-container">
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
              <Link className="" to="/" onClick={handleLogout}>
                Logout
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
            <div className="list-item-dropdown" onClick={() => navigate(`/profile/${account.userId}`)}>Profile</div>
            <div className="list-item-dropdown" onClick={() => navigate('/my-uploads')}>My uploads</div>
            <div className="list-item-dropdown" onClick={() => navigate('/places-visited')}>Places Visited</div>
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
              <Link className="" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
