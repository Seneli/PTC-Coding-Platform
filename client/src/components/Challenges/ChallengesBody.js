import React from "react";
import Tabs from "./Tabs";
import "../../styles/ChallengesBody.css";

const ChallengesBody = (props) => {
  
  const authWeek = (week) => {
    var authWeek ; 
    //const today = new Date(Date.now());
    const today = new Date(Date.UTC(2021,6,15,4,0,0));
    const week1Start = new Date(Date.UTC(2021,6,5,4,0,0));
    const week2Start = new Date(Date.UTC(2021,6,12,4,0,0));
    const week3Start = new Date(Date.UTC(2021,6,19,4,0,0));
    const week4Start = new Date(Date.UTC(2021,6,26,4,0,0));
    if (today.getTime() > week4Start.getTime()){
      console.log("challenges: week 4 started");
      authWeek = 4; 
    } else if (today.getTime() > week3Start.getTime()){
        console.log("challenges: week 3 started");
        authWeek = 3; 
    } else if (today.getTime() > week2Start.getTime()){
        console.log("challenges: week 2 started");
        authWeek = 2; 
    } else if (today.getTime() > week1Start.getTime()){
        console.log("challenges: week 1 started");
        authWeek = 1; 
    } else {
        console.log("challenges: comp not started yet");
        authWeek = 0; 
    };

    if (week <= authWeek){
      return true; 
    }
    return false; 
  };

  const viewWeek = authWeek(props.week);

  return (
    <div className="section" id="home">
      {viewWeek &&
        <div className="challenges-container">
          <Tabs week={props.week}/>
        </div>
      }
      {!viewWeek &&
        <div>{`You are not authorized to see week ${props.week} yet.`}</div>
      }
    </div>
  );
};

export default ChallengesBody;
