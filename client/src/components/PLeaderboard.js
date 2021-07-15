import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Banner from "./Banner";
import PLDropdownRows from "./PLeaderboardSub";
import Footer from "./Footer";
import {formatMongoData} from "../content/PLeaderboardFunction/pLeaderboardFunctions";

const PLeaderboard = () => {
  const [pLeaderboardInfo, setPLeaderboardInfo] = useState([]);
  const [pLeaderboardInfoSub, setPLeaderboardInfoSub] = useState([]);

  async function getPLeaderboardInfo() {
    await axios
      .get("http://localhost:5000/leaderboard/personal")
      .then(res => {
        setPLeaderboardInfo(formatMongoData(res.data[0]));
        setPLeaderboardInfoSub(formatMongoData(res.data[0]));
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getPLeaderboardInfo();
  }, []);

  return (
    <div className="section" id="leaderboard">
      <Header />
      <Banner page="Personal Leaderboard" />
      <table>
        <thead>
          <tr class="table-headers">
            <th className="titleHeader">Week</th>
            <th className="titleHeader">Question</th>
            <th className="titleHeader">Points</th>
          </tr>
        </thead>
        <tbody>
          {pLeaderboardInfo.map((question, index) => (
            <tr key={index}>
              <td>{question.week}</td>
              <td>{`Question ${question.question} - Part ${question.part}`}</td>
              <td>{question.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
};

export default PLeaderboard;