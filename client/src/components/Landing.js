import React from "react";
import Text from "../content/landing.js";
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import Styles from "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="section">
      <Header></Header>
      <Banner page="Welcome"></Banner>
      <div className="container">
        <div className="landingContainer">
          <div className="aboutPTC landing-box">
            <div className="aboutTitle">
              <h2>About PTC</h2>
            </div>
            <p className="welcomeContent">{Text.aboutParaOne}</p>
            <p className="welcomeContent">{Text.aboutParaTwo}</p>
          </div>

          <div className="codingChallenge landing-box">
            <div className="whatTitle">
              <h2>What is PTC's Coding Challenge?</h2>
            </div>
            <p className="welcomeContent">{Text.whatParaOne}</p>
          </div>

          <div className="learningGrowth landing-box">
            <div className="learningTitle">
              <h2>Learning and Growth</h2>
            </div>
            <p className="welcomeContent">{Text.learningParaOne}</p>
            <ul>
              <li>{Text.learningParaTwo}</li>
              <li>{Text.learningParaThree}</li>
            </ul>
          </div>

          <div className="getStarted landing-box">
            <div className="getStartedTitle">
              <h2>Get Started!</h2>
            </div>
            <p className="welcomeContent">{Text.learningParaOne}</p>
            <ol>
              <li>
                {Text.getStartedParaOne}
                <a href="rules">Account</a>
              </li>
              <li>
                {Text.getStartedParaTwo}
                <a href="rules">Rules</a>
              </li>
              <li>
                {Text.getStartedParaThree}
                <a href="challenges">Challenges</a>
              </li>
              <li>
                {Text.getStartedParaFour}
                <a href="leaderboard">Leaderboard</a>
              </li>
            </ol>
          </div>

          <div className="ptcMedia landing-box">
            <div className="ptcMediaTitle">
              <h2>PTC Media</h2>
            </div>
            <p className="welcomeContent">{Text.ptcMediaParaOne}</p>
            <a href="https://www.instagram.com/projecttechconferences/">
              *instagram*
            </a>
            <a href="https://www.tiktok.com/@projecttechconferences?">
              *tiktok*
            </a>
            <a href="https://www.linkedin.com/company/projecttc/">*linkedin*</a>
          </div>

          <div className="landing-goodluck landing-box">Good Luck!</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
