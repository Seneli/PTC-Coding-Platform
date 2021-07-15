import React from "react";
import '../styles/Banner.css';

const Banner = (props) => {
  return (
    <div className="section" id="home">
      <div className='banner'>
        <div className='banner-text'>{props.page}</div>
      </div>
    </div>
  );
};

export default Banner;
