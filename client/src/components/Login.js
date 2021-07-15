import React, { useContext, useState } from "react";
import axios from "axios";
import data from "../content/loginsignup";
import "../styles/Login.css";
import "../styles/ErrorMessage.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      if (email === "tech@projecttechconferences.com") {
        console.log("logging into admin");
        await axios
          .post("http://localhost:5000/admin/login-admin-account", loginData, {
            withCredentials: true,
          })
          .then((res) => {
            sessionStorage.removeItem('loggedIn');
            window.location.replace("http://localhost:3000");
          })
          .catch((err) => {
            setErrorMessage(err.response.data.errorMessage);
          });
      } else {
        await axios
          .post("http://localhost:5000/auth/login", loginData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            sessionStorage.removeItem('loggedIn');
            window.location.replace("http://localhost:3000");
          })
          .catch((err) => {
            console.log(err.response);
            setErrorMessage(err.response.data.errorMessage);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-component">
      <div className="login-body">
        <img className="ptc-logo" src={data.ptcIcon}></img>

        <div className="login-text login-text-instructions">
          To continue, log in to your <br /> PTC account.
        </div>

        <form className="login-form" onSubmit={login}>
          <input
            className="input-text"
            type="text"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <input
            className="input-text"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <div className="error-message message-to-user">{errorMessage}</div>
          <input className="input-submit" type="submit" value="Sign in"></input>
        </form>

        <div className="login-reset-sign-up">
          <a
            href="#"
            onClick={() => { 
              props.setContent("pw reset");
            }}
            className="link-text login-text forgot"
          >
            Forgot your password?
          </a>

          <hr className="line"></hr>

          <div className="sign-up-line inline-child">
            <div className="login-text">Don't have an account yet?</div>
            <a
              href="#"
              onClick={() => {
                props.setContent("sign up");
              }}
              className="link-text bold login-text sign-up-login-text"
            >
              <b>Sign up now</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;