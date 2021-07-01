import React from "react";
import PropTypes from "prop-types";
import useAnimation from "../hooks/useAnimation";

const Hero = props => {
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

  const { ref: refCopy } = useAnimation({
    animationName: "fadeInLeft",
    duration: 800,
    delay: 800,
    loop: false,
    autoStart: true
  });

  return (
    <div
      className="component component-hero"
      style={{
        backgroundImage: `url(${props.image})`
      }}
    >
      <div className="component__inner">
        <div className="component__content">
          <div className="component__content__inner">
            <h2 className="component__content__title" ref={refTitle}>
              {props.title}
            </h2>
            <div className="component__content__line" ref={refLine}></div>
            {props.copy && (
              <div className="component__content__copy" ref={refCopy}>
                {props.copy}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Types
Hero.propTypes = {
  title: PropTypes.object.isRequired,
  copy: PropTypes.object,
  image: PropTypes.string.isRequired
};

export default Hero;
