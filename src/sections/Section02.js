import React from "react";

import Hero from "../components/Hero.js";
import Shows from "../components/Shows.js";

const Section02 = () => {
  return (
    <div className="catalyst-campaign__section" id="section-02">
      <div className="catalyst-campaign__section__wrapper">
        <Hero
          title={<span>Studio Shows</span>}
          copy={
            <p>
              Presenting a series of 4 Studio Shows delivering key insights for
              FDI in Ireland
            </p>
          }
          image="http://localhost:8080/images/studio-shows-01.jpg"
        />
        <Shows />
      </div>
    </div>
  );
};

export default Section02;
