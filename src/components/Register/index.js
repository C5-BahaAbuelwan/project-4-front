import "./style.css";
import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);
  const role = "627cd37b12dec5d82be6786a";
  const addUser = () => {
    axios
      .post("http://localhost:5000/users/", {
        email,
        password,
        country,
        lastName,
        firstName,
        role,
      })
      .then((result) => {
        console.log(result);
        setMessage(result.data.message);
        setIsReg(true);
        navigate("/login");
      })
      .catch((err) => {
        console.log("err.response.data.message");
        setMessage(err.response.data.message);
        setIsReg(false);
      });
  };

  return (
    <div className="register">
      <h1>Register Account </h1>
      <div className="box">
      <h4>
          <span>*</span> First Name :{" "}
        </h4>
        <input
          type="text"
          className="firstName"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      <h4>
          <span>*</span> Last Name :{" "}
        </h4>
        <input
          type="text"
          className="lastName "
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
       <h4>  Country : </h4>
        <input
          type="text"
          className="country "
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
       <h4>
          <span>*</span> Email :{" "}
        </h4>
        <input
          type="email"
          className="email  "
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
       <h4>
          <span>*</span>  Password :{" "}
        </h4>
        <input
          type="password"
          className="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
       
      </div>

      <p className={isRegistered ? "successful" : "error"}>{message}</p>
      {/* <div className="firstName_cont">
        <h4>
          <span>*</span> First Name :{" "}
        </h4>
        <input
          type="text"
          className="firstName"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>

      <br />
      <div className="LastName_cont">
        <h4>
          <span>*</span> Last Name :{" "}
        </h4>
        <input
          type="text"
          className="lastName "
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>

      <br />
      <div className="country_cont">
        <h4> Country : </h4>
        <input
          type="text"
          className="country "
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>

      <br />
      <div className="email_cont">
        <h4>
          <span>*</span> Email :{" "}
        </h4>
        <input
          type="email"
          className="email  "
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <br />
      <div className="password_cont">
        <h4>
          <span>*</span>  Password :{" "}
        </h4>
        <input
          type="password"
          className="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div> */}

      <br />

      <button className="register_button" onClick={addUser}>
        Register
      </button>
      {/* <>
    {!isRegistered?( <p className={isRegistered ? "successful" : "error"}>{message}</p>):(<></>)}
    </> */}
     
    </div>
  );
};

export default Register;
