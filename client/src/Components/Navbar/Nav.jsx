import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// context data
import { DataContext } from "../../context/DataProvider";

// css
import "./nav.css";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsUserLoggedIn(!!account.email);
  }, [account]);

  const handleLogout = () => {
    setAccount({ email: "", name: "" });
    navigate("/");
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
