import React from "react";

import Hero from "../components/Hero.js";
import Interviews from "../components/Interviews.js";

const Section03 = () => {
  return (
    <div className="catalyst-campaign__section" id="section-03">
      <div className="catalyst-campaign__section__wrapper">
        <Hero
          title={<span>Interviews</span>}
          copy={<p>Dynamic interviews focusing on key business sectors</p>}
          image="http://localhost:8080/images/interviews-01.jpg"
        />
        <Interviews />
      </div>
    </div>
  );
};

export default Section03;
