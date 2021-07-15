import React from "react";

import Header from "./Header";
import Banner from "./Banner";
import RulesBody from "./Rules/RulesBody";
import Footer from "./Footer";

import SignUp from "./SignUp";
import Login from "./Login";

const Rules = () => {
  return (
    <div className="section" id="home">
      <Header />
      <Banner page="Rules" />
      <RulesBody />
      <Footer />
    </div>
  );
};

export default Rules;
