import React, { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPW from "./ForgotPW";
import "../styles/test.css";

function Popup(props) {
  const [contentString, setContentString] = useState();
  const [content, setContent] = useState("not working :(");

  const getContents = (contentString) => {
    if (contentString === "login") {
      setContent(<Login setContent={setContent}/>);
      return;
    }
    if (contentString === "sign up"){
      setContent(<SignUp setContent={setContent}/>);
      return;
    }
    if (contentString === "pw reset"){
      setContent(<ForgotPW/>);
      return;
    }
  };

  useEffect(() => {
    if (!contentString){
      setContentString(props.contentString);
      const tempContentString = props.contentString;
      getContents(tempContentString);
    } else {
      getContents(content);
    }
  }, [content]);

  const closeWindow = () => {
    props.setTrigger(false);
  }

  return props.trigger ? (
    <div className="popup" id={props.id}>
      <div className="popup-inner">
        <button className="close-btn" onClick={() => closeWindow()}>
          &times;
        </button>
          {content}
      </div>
    </div>
  ):("");
}

export default Popup;
