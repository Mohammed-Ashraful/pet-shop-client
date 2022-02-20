import React, { useState } from "react";
import { Col } from "react-bootstrap";  
import { useHistory } from "react-router-dom";
import { Link, useLocation, usehistory } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

import "./Register.css";

const Register = () => {
   const [loginData, setLoginData] = useState("");
   const { registerUser, loading, error, user, googleLogin } = UseAuth();
   
   const location = useLocation(); 
    const history = useHistory();

   const handleOnSubmit = (e) => {
     if (loginData.password !== loginData.password2) {
       alert("your Password didn't Match");
       window.location.reload(true);
       return;
     }
     registerUser(
       loginData.email,
       loginData.password,
       loginData.displayName,
       location,
      //  history
     );
     e.preventDefault();
  };
  
   const handleOnBlur = (e) => {
     const field = e.target.name;
     const value = e.target.value;
     const newLoginData = { ...loginData };
     newLoginData[field] = value;
     setLoginData(newLoginData);
   };

   const handleGoogleLogin = () => {
     googleLogin(location, history);
   };
  return (
    <div>
      <div className="btn-style contact-style row">
        <Col lg={12}>
          <div className="input">
            <form onSubmit={handleOnSubmit}>
              <h2>Please Register </h2>
              <label htmlFor="frist"></label>
              <input
                type="name"
                name="name"
                placeholder="Full Name"
                onChange={handleOnBlur}
                id="first"
              />
              <br />
              <br />
              <label htmlFor="mail"></label>
              <input
                type="email"
                name="email"
                onChange={handleOnBlur}
                placeholder="enter your email"
                id="mail"
                required
              />
              <br />
              <br />
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                onChange={handleOnBlur}
                placeholder="enter your password"
                id="password"
                required
              />
              <br />
              <br />
              <input
                type="password2"
                name="password2"
                onChange={handleOnBlur}
                placeholder="re-enter your password"
                required
              />
              <br />
              <br />
              <input type="submit" value="Register" />
            </form>
            <p>
              Already have an account?<Link to="/login">Login</Link>
            </p>
            <button onClick={handleGoogleLogin}>
              <i class="fab fa-google"></i> Google Sign In
            </button>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Register;
