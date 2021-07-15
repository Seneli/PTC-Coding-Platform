import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../Context";
import ScrollableMenu from "./ScrollableMenu";


import { useAWSUpload, useAWSDelete } from "../../utilities";
import { isTypeOfExpression } from "typescript";

const Part = (props) => {

  const [file, setFile] = useState();
  const [submitMessage, setSubmitMessage] = useState("");

  const { handleUpload, progress } = useAWSUpload();
  const { handleDelete } = useAWSDelete();

  const status = useContext(AuthContext);
  const week = props.week;

  function getData(spec) {
    if (Array.isArray(spec)) {
      return spec.map((sample) => <div>{sample}</div>);
    }
    return <div>{spec}</div>;
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e, part) => {
    e.preventDefault();
    try {
      if (!file) {
        setSubmitMessage("You have not entered a file to submit.");
        return;
      }

      const res = await handleUpload({
        file,
        metadata: {
          question: `${week}${props.questionNum}${part}`,
          email: status.loggedIn.email
        },
        path: `${week}${props.questionNum}${part}/${status.loggedIn.email}`
      });
      setSubmitMessage("You have successfully submitted a file.");
      console.log(res);
    } catch (error) {
      setSubmitMessage("This submission failed with error code ", error.status);
      console.log(error);
      console.log(error.message);
    }
  };

  const viewSubmission = async (e, part) => {
    e.preventDefault();

    var fileKey;
    var date;

    // const getFileKey = async () => {
    await axios
      .post(`${process.env.REACT_APP_ENDPOINT}/aws/get_FK`, {
        question: `${week}${props.questionNum}${part}`
      })
      .then((res) => {
        fileKey = res.data.fileKey;
        date = res.data.date;
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log(props.questionNum, part);
    // console.log("view submission clicked");
    // const newOption = part.replace("@", "%40");
    // console.log("test", newOption);
    window.open(
      `https://cc-backend.s3.ca-central-1.amazonaws.com/${fileKey}`,
      "_blank" // <- This is what makes it open in a new window.
    );
  };

  return (
    <div key={props.thisPart.part}>
      <div className="part-title">{`PART ${props.thisPart.part} [${props.thisPart.points} POINTS]`}</div>
      <hr className="linebreak"></hr>
      <div className="part-text">{props.thisPart.problemDescription}</div>
      <div className="part-subtitle part-grid">
        <div>Input</div>
        <div className="part-italics">Sample Input</div>
      </div>
      <hr className="linebreak"></hr>
      <div className="part-text part-grid">
        <div>{props.thisPart.inputSpecification}</div>
        <div className="part-sample">{getData(props.thisPart.sampleInput)}</div>
      </div>

      <div className="part-subtitle part-grid">
        <div>Output</div>
        <div className="part-italics">Sample Output</div>
      </div>
      <hr className="linebreak"></hr>
      <div className="part-text part-grid">
        <div>{props.thisPart.outputSpecification}</div>
        <div className="part-sample">
          {getData(props.thisPart.sampleOutput)}
        </div>
      </div>

      <div className="part-subtitle part-grid">
        <div>Hints and Resources</div>
        <div className="part-italics">Submit a Solution</div>
      </div>
      <hr></hr>
      <div className="part-grid part-text">
        <div className="add-hints">
          { props.thisPart?.hints?.map((hint) => (
              <>
                <a className="hint-links" href={hint.link}>{hint.text}</a>
                <br/>
              </>
          ))} 
        </div>
        <form
          className="problem-button-container"
          //onSubmit={(e) => onSubmit(e, props.thisPart.part)}
        >
          {status.loggedIn?.admin && (
            <>
              <ScrollableMenu
                question={`${week}${props.questionNum}${props.thisPart.part}`}
              />
            </>
          )}

          {!status.loggedIn?.loggedIn && (
            <>
              <div>Please log in to submit a file</div>
            </>
          )}

          {!status.loggedIn?.admin && status.loggedIn?.loggedIn && (
            <>
              {status.loggedIn?.week === parseInt(props.week) && (
                <>
                  <input
                    type="file"
                    accept="text/plain"
                    className="choose-file-button problem-button"
                    id="choose-file"
                    onChange={onChange}
                  />
                  <input
                    type="submit"
                    onClick={(e) => onSubmit(e, props.thisPart.part)}
                    className="file-submit-button problem-button"
                  />
                  <div>{submitMessage}</div>
                </>
              )}
              {status.loggedIn?.week !== parseInt(props.week) && (
                <>
                  <div>You are no longer able to submit for this week</div>
                  <br></br>
                </>
              )}
              <button
                className="problem-button file-submit-button view-button"
                onClick={(e) => viewSubmission(e, props.thisPart.part)}
              >
                View Submission
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Part;
