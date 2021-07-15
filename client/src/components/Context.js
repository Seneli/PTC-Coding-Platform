import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import JsonFormatter from "../content/ScrollableMenuFunction/ScrollableMenuFunction";
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {

    console.log("logged in happening");

    var temp = {};

    await axios
      .get("http://localhost:5000/context")
      .then((res) => {
        temp = res.data;
      })
      .catch((err) => console.log(err));

    //const today = new Date(Date.now());
    const today = new Date(Date.UTC(2021, 6, 15, 4, 0, 0));
    const week1Start = new Date(Date.UTC(2021, 6, 5, 4, 0, 0));
    const week2Start = new Date(Date.UTC(2021, 6, 12, 4, 0, 0));
    const week3Start = new Date(Date.UTC(2021, 6, 19, 4, 0, 0));
    const week4Start = new Date(Date.UTC(2021, 6, 26, 4, 0, 0));

    if (today.getTime() > week4Start.getTime()) {
      console.log("week 4 started");
      temp.week4 = true;
      temp.week = 4;
    } else if (today.getTime() > week3Start.getTime()) {
      console.log("week 3 started");
      temp.week3 = true;
      temp.week = 3;
    } else if (today.getTime() > week2Start.getTime()) {
      console.log("week 2 started");
      temp.week2 = true;
      temp.week = 2;
    } else if (today.getTime() > week1Start.getTime()) {
      console.log("week 1 started");
      temp.week1 = true;
      temp.week = 1;
    } else {
      console.log("comp not started yet");
      temp.week0 = true;
      temp.week = 0;
    }

    if (temp.admin){
      await axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/aws/list_s3`,
        { "week": props.week }
      ).then(res => {
        temp.submissionList = JsonFormatter(res.data.Contents);
      }).catch(err => console.log(err));
    }

    sessionStorage.setItem('loggedIn', JSON.stringify(temp));
    setLoggedIn(temp);
    /*
        DOCUMENTATION:
        loggedIn { 
            loggedIn: true/false,
            admin: true/false,
            name: firstname lastname, (only if logged in + not admin)
            email: email (only if logged in + not admin)
        }
        */
  }

  useEffect(() => {
    console.log("context component rendering...");
    console.log("session storage: ", sessionStorage.getItem('loggedIn'));

    if (!sessionStorage.getItem('loggedIn')){
      console.log("Setting the key.");
      getLoggedIn();
    } else {
      console.log("Getting the Key", JSON.parse(sessionStorage.getItem('loggedIn')));
      setLoggedIn(JSON.parse(sessionStorage.getItem('loggedIn')));
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
