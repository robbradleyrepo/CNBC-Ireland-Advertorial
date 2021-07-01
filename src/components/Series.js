import React from "react";
import PropTypes from "prop-types";
import useAnimation from "../hooks/useAnimation";

const Series = props => {
  const { ref: refLogo } = useAnimation({
    animationName: "fadeIn",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  return (
    <div
      className="component component-series"
      style={{
        backgroundImage: `url(${props.image})`
      }}
    >
      {/* Logo */}
      <div className="component__logo" ref={refLogo}>
        <img
          src="http://localhost:8080/images/ida-logo-01.svg"
          alt="IDA Ireland in collaboration with Catalyst"
        />
      </div>
      <div className="component__hexagon2">
        <img src="http://localhost:8080/images/hexagon-01.svg" />
      </div>
    </div>
  );
};

// Types
Series.propTypes = {
  image: PropTypes.string.isRequired
};

export default Series;
