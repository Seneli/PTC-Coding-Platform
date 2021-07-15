import React, { useState } from "react";
import axios from "axios";
import data from "../content/loginsignup";

import Styles from "../styles/SignUp.css";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function signup(e) {
    e.preventDefault();

    try {
      const passwordVerify = password;
      const signupData = {
        firstName,
        lastName,
        email,
        password,
        passwordVerify,
      };

      await axios
        .post("http://localhost:5000/auth/sign-up", signupData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.removeItem('loggedIn');
          window.location.replace("http://localhost:3000");
        })
        .catch((err) => {
          //console.log(err);
          console.log(err.response); //USE THIS ONE TO GET THE DATA
          setErrorMessage(err.response.data.errorMessage);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-component">
      <div className="login-body">
        <img className="ptc-logo" src={data.ptcIcon}></img>

        <div className="login-text">
          To continue, sign up for your <br /> PTC account.
        </div>

        <form className="login-form" onSubmit={signup}>
          <div className="login-name-input">
            <input
              className="signup-text input-name"
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></input>
            <input
              className="signup-text input-name"
              type="text"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
          </div>

          <input
            className="signup-text"
            type="text"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <input
            className="signup-text"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>

          <div className="error-message message-to-user">{errorMessage}</div>

          <input
            className="input-submit"
            type="submit"
            placeholder="Create Account"
          ></input>
        </form>

        <div className="login-reset-sign-up">
          <hr className="line"></hr>
          <div className="sign-up-line inline-child">
            <div className="login-text">Already have an account?</div>
            <a
              href="#"
              onClick={() => {
                props.setContent("login");
              }}
              className="link-text bold login-text sign-up-login-text"
            >
              <b>
                Sign in here
              </b>
            </a>
            <div className="App"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
