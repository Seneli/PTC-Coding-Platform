import React, { useContext, Link, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../Context";

const ScrollableMenu = (props) => {
  const[submittedDate, setSubmittedDate] = useState();
  const [option, setOption] = useState();

  const status = useContext(AuthContext);
  var submissionList = status.loggedIn.submissionList.Questions[props.question[1]][props.question[2]];
  if (!submissionList){
    submissionList = [{email: "No submissions found"}];
  };

  function handleChange(index) {
    setOption(submissionList[index].fileKey);
    setSubmittedDate(submissionList[index].date);
    console.log(option, submittedDate);
  };

  function viewSubmission(event, option) {
    event.preventDefault();
    if (
      option === "unable to get users" ||
      option === "No submissions available"
    ) {
      return;
    };
    const newOption = option.replace("@", "%40");
    console.log(newOption);
    window.open(
      `https://cc-backend.s3.ca-central-1.amazonaws.com/${newOption}`,
      "_blank" // <- This is what makes it open in a new window.
    );
  }

  useEffect(() => {
    setOption(submissionList[0].fileKey);
    setSubmittedDate(submissionList[0].date);
  }, []);

  return (
    <>
      <select
        onChange={(event) => handleChange(event.target.value)}
        value={submissionList[option]}
      >
        {
        submissionList.map((data, index) => (
          <option value={index}>{data.email}</option>
        ))
        } 
      </select>
      <div>{`Submitted Date: ${submittedDate}`}</div>
      <button className="problem-button file-submit-button" onClick={e => viewSubmission(e, option)}>View Submission</button>
    </>
  );
};

export default ScrollableMenu;
