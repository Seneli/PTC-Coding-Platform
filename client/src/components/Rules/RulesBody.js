import React from "react";

import Text from "../../content/rules";
import styles from "../../styles/RulesBody.css";

const RulesBody = () => {
  return (
    <div className="section" id="home">
      <div className="container">
        <div className="box box1">
          <div className="title title1">{Text.title1}</div>
          <div className="text">{Text.text1}</div>
        </div>

        <div className="box box2">
          <div className="title title2">{Text.title2}</div>
          <ul>
            <li className="text">{Text.text2_1}</li>
            <li className="text">You must be following PTC  (
              <a className="ig-link" href="https://www.instagram.com/projecttechconferences/">@projecttechconferences</a>
              )  on Instagram</li>
            <li className="text">{Text.text2_3}</li>
          </ul>
        </div>

        <div className="box box3">
          <div className="title title3">{Text.title3}</div>
          <ul>
            <li className="text">{Text.text3_1}</li>
            <li className="text">{Text.text3_2}</li>
            <li className="text">{Text.text3_3}</li>
            <li className="text">{Text.text3_4}</li>
            <li className="text">{Text.text3_5}</li>
            <li className="text">{Text.text3_6}</li>
            <li className="text">{Text.text3_7}</li>
          </ul>
        </div>

        <div className="box box4">
          <div className="title title4">{Text.title4}</div>
          <ul>
            <li className="text">{Text.text4_1}</li>
            <li className="text">{Text.text4_2}</li>
            <li className="text">{Text.text4_3}</li>
          </ul>
        </div>

        <div className="box box5">
          <div className="title title5">{Text.title5}</div>
          <ul>
            <li className="text">{Text.text5_1}</li>
            <li className="text">{Text.text5_2}</li>
            <li className="text">{Text.text5_3}</li>
          </ul>
        </div>

        <div className="box box6">
          <div className="title title6">In case of technical issues...</div>
          <div className="text technical-issues">If you experience technical issues with the website that prevent you from submitting before the weekly deadline, please email your issue and all unsuccessful submissions to <u>coding.challenge@projecttechconferences.com</u> in a <b>single email</b>.</div>
          <div className="text technical-issues margin-up">Submissions through this method will only be accepted if: </div>
          <ul className="technical-issues">
            <li className="text">The email is sent <b>less than 2 hours</b> before the deadline (i.e. Sunday between 9:59 PM and 11:59 PM).</li>
            <li className="text">
              {`The subject line of the email follows the format `}
              <b>{`“Week <week_number> Submission: <first_name> <last_name> ”`}</b>
              {`(e.x. “Week 1 Submission: John Smith”).`}
            </li>
            <li className="text">
              {`Each python file is named according to the format `}
              <b>{`“W<week_number>_P<problem_number><part_letter>.py” `}</b>
              {`(ex. For week 1, problem 1, part a, the file name should be W1_P1a.py).`}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesBody;
