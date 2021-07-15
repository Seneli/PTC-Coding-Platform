import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../styles/ViewSubmission.css";
import data from "../../content/loginsignup";

function getPathname() {
    //const location = useLocation();
};

const ViewSubmission = ({match}) => {
     const [submissionFound, setSubmissionFound] = useState(true);
     const [submissionText, setSubmissionText] = useState("");
     const [date, setDate] = useState("No date found");

    const getFile = async () => {
        await axios.get(
            `http://localhost:5000/submission/file/${match.params.question}`
            ).then((res) => {
                if (!res.data){
                    setSubmissionFound(false)
                    //IF RESPONSE IS 401 -> SHOW THE YOU are not logged in page!
                } else {
                    setSubmissionFound(true);
                    setSubmissionText(res.data);
                };
            }).catch(err => {
                setSubmissionFound(false);
                console.log(err);
            });
    };

    const getDate = async () => {
        await axios.get(
            `http://localhost:5000/submission/date/${match.params.question}`
            ).then((res) => {
                setDate(res.data);
            }).catch(err => {
                console.log(err);
            }); 
    };

    useEffect(() => {
        //getPathname();
        console.log(match.params.question);
        getFile();
        getDate();
    }, []);

  return submissionFound ? (
    <>
        <div className="view-submission-container">
        
            <img className="ptc-logo" src={data.ptcIcon} alt="#"></img>

            <h2 className="view-submission-header">{`Your submission for`} 
            <br/>
                <h2 className="view-sub-qname">
                    {`Week ${match.params.question[0]}, Question ${match.params.question[1]}, Part ${match.params.question[2]}`}
                </h2>
            {`is shown below:`}</h2>
            <div>{`Date: ${date}`}</div>
            <div className="view-submission-box">
                <pre className="view-submission-content">{submissionText}</pre>
            </div>
        </div>
    </>
  ):(
    <div className="view-submission-container no-submission-found">
        <img className="ptc-logo" src={data.ptcIcon} alt="#"></img>
        <h2 className="view-submission-header">{`You have not yet submitted a file for Week ${match.params.question[0]}, Question ${match.params.question[1]}, Part ${match.params.question[2]}.`}</h2>
        <h4 className="view-submission-information">Please submit a file and try this button again.</h4>
        <h4 className="view-submission-information">If you are having technical issues submitting, please contact <b>tech@projecttechconferences.ca</b> at least 24 hours ahead of the deadline.</h4>
    </div>
  );
};

export default ViewSubmission;
