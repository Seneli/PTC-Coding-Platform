import React from 'react';
import Header from './Header';
import Banner from './Banner';
import ChallengesBody from './Challenges/ChallengesBody';
import Footer from './Footer';

const Challenges = ({ match }) => {
  return (
    <div className='section' id='home'>
      <Header />
      <Banner page={`Week ${match.params.week}`} />
      <ChallengesBody week={match.params.week} />
      <Footer />
    </div>
  );
};

export default Challenges;
