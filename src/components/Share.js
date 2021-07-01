import React from "react";
import useAnimation from "../hooks/useAnimation";

const Share = () => {
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

  return (
    <div className="component component-share">
      <div className="component__wrapper">
        <div className="component__content">
          {/* Heading */}
          <div className="component__content__heading">
            <h2 className="component__content__heading__title" ref={refTitle}>
              Welcome to the
              <br />
              IDA Ireland hub
            </h2>
            <div
              className="component__content__heading__line"
              ref={refLine}
            ></div>
          </div>
          {/* Share */}
          <div className="component__content__share">
            <div id="social_bar" className="gigyasharebar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
