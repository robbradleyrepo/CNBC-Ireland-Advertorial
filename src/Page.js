import React from "react";

import Header from "./sections/Header.js";
import Section01 from "./sections/Section01.js";
import Section02 from "./sections/Section02.js";
import Section03 from "./sections/Section03.js";
import Section04 from "./sections/Section04.js";
import Footer from "./sections/Footer.js";

function Page() {
  return (
    <div className="catalyst-campaign" id="catalyst-ida-2020-q3-hub">
      <div className="catalyst-campaign__wrapper">
        <Header />
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Footer />
      </div>
    </div>
  );
}

export default Page;
