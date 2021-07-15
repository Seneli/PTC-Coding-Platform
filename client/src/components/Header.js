import React from "react";
import "../styles/Nav.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import data from "../content/loginsignup";
import AuthContext from "./Context";
import axios from "axios";

function Header() {

  const status = useContext(AuthContext);

  const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [head, ...tail] = React.Children.toArray(children);

    return (
      <div
        className="menu"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {head}
        {isOpen && <div className="open">{tail}</div>}
      </div>
    );
  };

  const menuInstance = (
    <Menu>
      <div className="nav">Challenges</div>
      {status.loggedIn?.week0 && 
        <Link to="/">
          <div className="item">Coming soon...</div>
        </Link>
      }
      {(status.loggedIn?.week1 || status.loggedIn?.week2 || status.loggedIn?.week3 || status.loggedIn?.week4 )  && 
        <Link to="/challenges/1">
          <div className="item">Week 1</div>
        </Link>
      }
      {(status.loggedIn?.week2 || status.loggedIn?.week3 || status.loggedIn?.week4 )  && 
        <Link to="/challenges/2">
          <div className="item">Week 2</div>
        </Link>
      }
      {(status.loggedIn?.week3 || status.loggedIn?.week4 )  && 
        <Link to="/challenges/3">
          <div className="item">Week 3</div>
        </Link>
      }
      {status.loggedIn?.week4 && 
        <Link to="/challenges/4">
          <div className="item">Week 4</div>
        </Link>
      }
    </Menu>
  );

  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupContent, setPopupContent] = useState();

  function userText() {
    if (!status.loggedIn) return "not logged in";
    if (status.loggedIn.admin) {
      return "admin";
    } else {
      return status.loggedIn.name.split(" ")[0];
    }
  }

  const logOut = async () => {
    await axios
      .get("http://localhost:5000/auth/log-out", { withCredentials: true })
      .then((res) => sessionStorage.removeItem('loggedIn'))
      .catch((err) => {
        console.log(err);
        console.log(err.response); //USE THIS ONE TO GET THE DATA
      });
  };

  return (
    <div className="headerContainer">
      <div className="title-section">
        <img className="ptc-logo" src={data.ptcCroppedIcon} alt=""></img>
        <div className="title-text">CODING CHALLENGE</div>
      </div>
      <ul className="header">
        <li className="header-text">
          <a href="/" className="nav">
            Home
          </a>
        </li>

        <li className="header-text">
          <div className="nav-dropdown">
            {menuInstance}
          </div>
        </li>

        <li className="header-text">
          <a href="/rules" className="nav">
            Rules
          </a>
        </li>

        <li className="header-text">
          <a href="/leaderboard" className="nav">
            Leaderboard
          </a>
        </li>

        {
          //if you are a logged in user/not admin - see Pleaderboard
          !status.loggedIn?.admin && status.loggedIn?.loggedIn && (
            <>
              <li className="header-text">
                <a href="/pleaderboard" className="nav">
                  Personal Leaderboard
                </a>
              </li>
            </>
          )
        }

        {
          //if you are not logged in - see login button
          !status.loggedIn?.loggedIn && (
            <>
              <li className="header-text">
                <a
                  href="#"
                  onClick={() => {
                    setButtonPopup(true);
                    setPopupContent("login");
                  }}
                  className="nav"
                >
                  Login
                </a>
                {buttonPopup && (
                  <>
                    <div className="App">
                      <Popup
                        id={popupContent}
                        contentString={popupContent}
                        trigger={buttonPopup}
                        setTrigger={setButtonPopup}
                      />
                    </div>
                  </>
                )}
              </li>
              <li className="header-text">
                <a
                  href="#"
                  onClick={() => {
                    setButtonPopup(true);
                    setPopupContent("sign up");
                  }}
                  className="nav"
                >
                  Sign up
                </a>
              </li>
            </>
          )
        }

        {
          //if you are logged in - see user name + log out
          status.loggedIn?.loggedIn && (
            <>
              <li className="header-text">
                <i href="" className="nav">
                  {`Hello, ${userText()}`}
                </i>
              </li>
              <li className="header-text" onClick={logOut}>
                <a href="" className="nav">
                  Logout
                </a>
              </li>
            </>
          )
        }
      </ul>
    </div>
  );
}

export default Header;
