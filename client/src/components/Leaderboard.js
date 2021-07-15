import React, { useEffect, useState } from "react";
import "../styles/Leaderboard.css";
import axios from "axios";
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";

const Leaderboard = () => {
  const [leaderboardInfo, setLeaderboardInfo] = useState([]);

  const getLeaderboardInfo = async () => {
    await axios.get("http://localhost:5000/leaderboard")
      .then(res => setLeaderboardInfo(res.data))
      .catch(err => console.log(err));
  }

  const rank = (index) => {
    return index + 1 ; 
  }

  useEffect(() => {
    getLeaderboardInfo();
  }, []);

  return (
    <div className="section" id="leaderboard">
      <Header />
      <Banner page="Leaderboard" />

      <table>
        <thead>
          <tr class="table-headers">
            <th className="titleHeader">Rank</th>
            <th className="titleHeader">Name</th>
            <th className="titleHeader">Points</th>
          </tr>
        </thead>
        <tbody>
          {
            leaderboardInfo.map((person, index) => (
              <tr key={index}>
                <td>{rank(index)}</td>
                <td>{`${person.firstName} ${person.lastName}`}</td>
                <td>{person.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
};

export default Leaderboard;
