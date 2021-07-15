import React, { useState } from "react";
import axios from "axios";
import data from "../content/loginsignup";

import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";

import { useLocation } from "react-router-dom";
import "../styles/ErrorMessage.css";

function useQuery() {
  const location = useLocation();
  return location.pathname;
}

const ResetPW = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let token = useQuery().match(/.*\/([^/]+)\/[^/]+/)[1];
  let id = useQuery().match("([^/]+$)")[1];

  async function resetPassword(e) {
    e.preventDefault();

    try {
      const resetInfo = { password, token, id };
      await axios
        .post("http://localhost:5000/auth/pw-reset", resetInfo, {
          withCredentials: true,
        })
        .then((res) => {
          setSuccessMessage(res.data);
          setErrorMessage("");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.errorMessage);
        });
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <>
      <Header></Header>
      <Banner page="Reset Password"></Banner>
      <div>{useQuery()}</div>
      <div className="login-component">
        <div className="login-body">
          <img className="ptc-logo" src={data.ptcIcon} alt="#"></img>

          <div className="login-text">Enter your new password below</div>

          <form className="login-form" onSubmit={resetPassword}>
            <input
              className="signup-text"
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="message-to-user error-message">  
              {errorMessage}
            </div>
            <div className="message-to-user success-message">   
              {successMessage}
            </div>
            <input
              className="input-submit"
              type="submit"
              placeholder="Create Account"
            />
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ResetPW;