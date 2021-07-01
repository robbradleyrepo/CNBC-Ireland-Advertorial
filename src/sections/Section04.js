import React from "react";

import Hero from "../components/Hero.js";
import News from "../components/News.js";

const Section04 = () => {
  return (
    <div className="catalyst-campaign__section" id="section-04">
      <div className="catalyst-campaign__section__wrapper">
        <Hero
          title={<span>News</span>}
          image="http://localhost:8080/images/news-01.jpg"
        />
        <News />
      </div>
    </div>
  );
};

export default Section04;
