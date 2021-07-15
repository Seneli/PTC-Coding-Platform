import React from "react";
import Style from "../styles/Footer.css";
import data from "../content/footer";

const Footer = () => {
  return (
    <div className="section">
      <div className="footer-container">
        <div className="ptc-container">
          <img className="ptc-icon" src={data.ptcIcon} alt="icons"></img>
          <div className="ptc-title">Project Tech Conferences</div>
          <div className="ptc-motto">stay in the loop</div>
          <div className="social-icons">
            {data.social.map((socialLink) => (
              <a
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                key={socialLink.key}
              >
                <img src={socialLink.img} alt="icons"></img>
              </a>
            ))}
          </div>
        </div>

        <div className="legal-container">
          <div className="legal-title">LEGAL</div>
          <a
            href="https://www.projecttechconferences.com/privacy-policy"
            className="legal-content"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.projecttechconferences.com/agreement"
            className="legal-content"
          >
            Event Agreement
          </a>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Footer;
