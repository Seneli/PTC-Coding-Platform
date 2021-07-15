import React, { useState } from "react";
import axios from "axios";
import data from "../content/loginsignup";

import Styles from "../styles/SignUp.css";

const ForgotPW = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  async function resetPassword(e) {
    e.preventDefault();

    try {
      const emaild = { email };
      await axios
        .post("http://localhost:5000/auth/pw-request", emaild, {
          withCredentials: true,
        })
        .then((res) => {
          setSuccessMessage(res.data);
          setMessageSent(true);
          console.log(messageSent);
        })
        .catch((err) => {
          console.log(err.response);
          setErrorMessage(err.response.data.errorMessage);
          setMessageSent(false);
        });
    } catch (err) {
      console.log(err.response);
      setMessageSent(false);
    }
  }

  return (
    <div className="login-component">
      <div className="login-body">
        <img className="ptc-logo" src={data.ptcIcon} alt="#"></img>

        <div className="forgot-your-password">Forgot Your Password?</div>

        <div className="forgot-pw-text">
          Enter your email address and we'll send you instructions to reset your
          password
        </div>

        <form className="login-form" onSubmit={resetPassword}>
          <input
            className="input-text forgot-pw-input-email"
            type="text"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <div
            className="message-to-user error-message"
            style={messageSent ? { display: "none" } : {}}
          >
            {errorMessage}
          </div>
          <div className="message-to-user success-message">
            {successMessage}
          </div>

          <input
            className="input-submit"
            type="submit"
            placeholder="Create"
            style={messageSent ? { display: "none" } : {}}
            disabled={messageSent}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default ForgotPW;