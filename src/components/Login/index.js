import "./style.css";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../App";
import { IsLoginContext } from "../../App";
import { FirstNameContext } from "../../App";
import { UserIdContext } from "../../App";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoginContext);
  const [message, setMessage] = useState("");
  const { firstName, setFirstName } = useContext(FirstNameContext);
  const { userId, setUserId } = useContext(UserIdContext);

  const CLIENT_ID =
    "772371876471-b9bt95ad8nrmrvcvi8bb6qkgjnk140d9.apps.googleusercontent.com";

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogin = (response) => {
    console.log(response);
    axios
      .post("https://devashop.herokuapp.com/login/googlelogin", { response: response })
      .then((response) => {
        console.log(response);
        setFirstName(response.data.firstName);
        setToken(response.data.token);
        setMessage(response.data.message);
        setUserId(response.data.userId);
        setIsLoggedIn(true);
        console.log(response.data.token);

        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("userId", response.data.userId);
        window.localStorage.setItem("firstName", response.data.firstName);
        navigate("/");

        console.log("Google login success", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    axios
      .post("https://devashop.herokuapp.com/login/", {
        email,
        password,
      })
      .then((result) => {
        console.log(result.data);
        setFirstName(result.data.firstName);
        setToken(result.data.token);
        setMessage(result.data.message);
        setUserId(result.data.userId);
        setIsLoggedIn(true);
        window.localStorage.setItem("token", result.data.token);
        window.localStorage.setItem("userId", result.data.userId);
        window.localStorage.setItem("firstName", result.data.firstName);

        console.log(token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
        setIsLoggedIn(false);
      });
  };

  return (
    <div className="login">
      <div className="loginhedar">
        <h1 className="header"> Account Login </h1>
        <h2>Welcome To Baha' Shop </h2>
        <p>
          By creating an account you will be able to shop faster, be up to date
          on an order's status, and keep track of the orders you have previously
          made.
        </p>
      </div>
      <div className="login_element">
        <input
          type="email"
          className="email "
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br/>
        <input
          type="password"
          className="password "
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <p className={isLoggedIn ? "successful" : "error"}>{message}</p>
        <div className="button">
          
          <button className="login_button" onClick={login}>
            Login
          </button>
          <GoogleLogin
            clientId="171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
