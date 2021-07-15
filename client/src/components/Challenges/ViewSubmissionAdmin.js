import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../styles/ViewSubmission.css";
import data from "../../content/loginsignup";


const ViewSubmissionAdmin = ({match}) => {
     //const [submissionFound, setSubmissionFound] = useState(false);
     const [submissionText, setSubmissionText] = useState("Error finding submission");
     const [date, setDate] = useState("No date found");

    const getFile = async () => {
        const file2 = await axios.get(
            `http://localhost:5000/submission/admin/file/${match.params.email}/${match.params.question}`
            ).then((res) => {
                //setSubmissionFound(true);
                console.log(res.data);
                if (!res.data){
                    //setSubmissionFound(false)
                } else {
                    //setSubmissionFound(true);
                    setSubmissionText(res.data);
                };
            }).catch(err => {
                //setSubmissionFound(false);
                console.log(err);
            });
    }

    const getDate = async () => {
        await axios.get(
            `http://localhost:5000/submission/admin/date/${match.params.email}/${match.params.question}`
            ).then((res) => {
                setDate(res.data);
            }).catch(err => {
                console.log(err);
            }); 
    };

    useEffect(() => {
        //getPathname();
        console.log(match.params);
        getFile();
        getDate();
    }, []);

  return (
    <>
        <div className="view-submission-container">
            <img className="ptc-logo" src={data.ptcIcon} alt="#"></img>
            <h2 className="view-submission-header">{`${match.params.email}'s submission for Week ${match.params.question[0]}, Question ${match.params.question[1]}, Part ${match.params.question[2]} is shown below:`}</h2>
            <div>{`Date: ${date}`}</div>
            <div className="view-submission-box">
                <pre className="view-submission-content">{submissionText}</pre>
            </div>
        </div>
    </>
  );
};

export default ViewSubmissionAdmin;
