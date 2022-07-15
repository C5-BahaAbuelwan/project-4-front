import "./style.css";

import { Routes, Route, Link } from "react-router-dom";
import { IsLoginContext } from "../../App";
import { useState, useEffect, createContext, useContext } from "react";
import { TokenContext } from "../../App";
import { BsCartCheck } from "react-icons/bs";
import { FirstNameContext } from "../../App";
import { UserIdContext } from "../../App";

const Navigation = () => {
  const { token, setToken } = useContext(TokenContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoginContext);
  const { firstName, setFirstName } = useContext(FirstNameContext);
  const { userId, setUserId } = useContext(UserIdContext);
  console.log(userId);

  const logOut = () => {
    setToken("");
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("firstName");
  };

  return (
    <div className="Navigation">
      {token.length !== 0 ? (
        <>
         
          <h1>DEVA <span>$HOP</span></h1>
          <h4>Welcome  <span className="Nam">{firstName}</span> </h4>
          <Link to="/">Home</Link>
          <Link to="/AboutUs">AboutUs</Link>
          <Link to="/DeliveryInfo">DeliveryInfo</Link>
          <Link to="/login" onClick={logOut}>
            logOut
          </Link>
          
          
          <Link className="cart_icon" to="/cart">
            
            <BsCartCheck />
          </Link>
        </>
      ) : (
        <>
        <h1>DEVA <span>$HOP</span></h1>
          <Link className="Home-Nav" to="/">
            Home
          </Link>
          <Link to="/AboutUs">AboutUs</Link>
          <Link to="/DeliveryInfo">Delivery Info</Link>
          <Link className="Register-Nav" to="/register">
            Register
          </Link>
          <Link className="Login-Nav" to="/login">
            Login
          </Link>
          
        </>
      )}
    </div>
  );
};

export default Navigation;
