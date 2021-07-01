import React from "react";

import Share from "../components/Share.js";
import Copy from "../components/Copy.js";
import Video from "../components/Video.js";

const Section01 = () => {
  return (
    <div className="catalyst-campaign__section" id="section-01">
      <div className="catalyst-campaign__section__wrapper">
        <Share />
        <Copy
          copy={
            <div>
              <div className="component__content__intro">
                <p>
                  In this series of articles and studio shows hosted by CNBC
                  Catalyst, we will bring you key insights into the current
                  business and investment opportunities in Ireland, a country
                  that nurtures high-growth companies, helping them forge their
                  future success.
                </p>
              </div>
              <p>
                Over the coming months we’ll be exploring a range of topics in a
                series of studio shows to deliver key insights for companies
                looking to expand or set up operations in Ireland, both now and
                in a post-Covid-19 world. We will take a deeper look at talent
                and the workforce of the future; the importance of
                collaborations and partnerships; how innovation lies at the core
                of Ireland’s success; and the resilience of the business
                community to overcome challenging times.
              </p>
            </div>
          }
        />
        <Video
          title="Green Light for Business: Partnerships & Collaborations"
          src="481673680"
        />
        <Copy
          copy={
            <p>
              Presented by CNBC Catalyst, these shows feature business
              executives from diverse, Ireland-based companies, thought-leaders
              and IDA Ireland executives, all giving their perspective on areas
              of particular value to the FDI community.
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Section01;
