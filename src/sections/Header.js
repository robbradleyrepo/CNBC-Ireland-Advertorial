import React from "react";
import useAnimation from "../hooks/useAnimation";

const Header = () => {
  const { ref: refTitle } = useAnimation({
    animationName: "fadeInLeft",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  const { ref: refLine } = useAnimation({
    animationName: "fadeInLeft",
    duration: 800,
    delay: 600,
    loop: false,
    autoStart: true
  });

  const { ref: refLogo } = useAnimation({
    animationName: "fadeIn",
    duration: 800,
    delay: 800,
    loop: false,
    autoStart: true
  });

  return (
    <div
      className="catalyst-campaign__header"
      style={{
        backgroundImage: `url(http://localhost:8080/images/hero-01.jpg)`
      }}
    >
      <div className="catalyst-campaign__header__wrapper">
        {/* Heading */}
        <div className="catalyst-campaign__header__heading">
          <div ref={refTitle}>
            <h1 className="catalyst-campaign__header__heading__title">
              Green Light
              <br />
              for Business
            </h1>
            <div className="catalyst-campaign__header__heading__tagline">
              Insights and Opportunities
            </div>
          </div>
          <div ref={refLine}>
            <div className="catalyst-campaign__header__heading__line"></div>
          </div>
        </div>
        {/* Hexagon */}
        <div className="catalyst-campaign__header__hexagon">
          <img src="http://localhost:8080/images/hexagon-01.svg" />
        </div>
      </div>
      {/* Logo */}
      <div className="catalyst-campaign__header__logo" ref={refLogo}>
        <img
          src="http://localhost:8080/images/ida-logo-01.svg"
          alt="IDA Ireland in collaboration with Catalyst"
        />
      </div>
      {/* Hexagon */}
      <div className="catalyst-campaign__header__hexagon2">
        <img src="http://localhost:8080/images/hexagon-01.svg" />
      </div>
    </div>
  );
};

export default Header;
