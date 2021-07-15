//libraries
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

//components
import { AuthContextProvider } from "./Context";
import Landing from "./Landing.js";
import Rules from "./Rules";
import Leaderboard from "./Leaderboard";
import PLeaderboard from "./PLeaderboard";
import Challenges from "./Challenges.js";
import PReset from "./ResetPW.js";
import ViewSubmission from "./Challenges/ViewSubmission.js";
import ViewSubmissionAdmin from "./Challenges/ViewSubmissionAdmin";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/challenges/:week" component={Challenges} />
        <Route path="/rules" component={Rules} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/pleaderboard" component={PLeaderboard} />
        <Route path="/pw-reset/:token/:id" component={PReset} />
        <Route path="/viewSubmission/:question" component={ViewSubmission} />
        <Route
          path="/viewSubmissionAdmin/:email/:question"
          component={ViewSubmissionAdmin}
        />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
