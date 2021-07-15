import React, {useEffect, useState} from "react";
import axios from "axios";
import Part from "./Part";
import style from "../../styles/Problem.css";
import Week1Content from "../../content/Questions/Week1-copy";
import Week2Content from "../../content/Questions/Week2";

const Problem = (props) => {

  const questionNum = props.number - 1;

  const getContent = () => {
    if (props.week === "4"){
      return;
    } else if (props.week === "3"){
      return;
    } else if (props.week === "2"){
      return Week2Content;
    } else if (props.week === "1"){
      return Week1Content;
    } 
  }
  const content = getContent();

  return (
    <div className="section" id="home">
      <div className="problem-container">
        <div className="problem-title" key={props.number}>
          {`PROBLEM ${props.number} : ${content.Problems[questionNum].Title}`}
        </div>
      
        <div className="question-parts">
          {content.Problems[questionNum].Parts.map((thisPart) => (
            <Part thisPart={thisPart} questionNum={props.number} week={props.week} />
          ))}
        </div> 
      </div>
    </div>
  );
};

export default Problem;
