import React from "react";
import PropTypes from "prop-types";
import useAnimation from "../hooks/useAnimation";

const Video = props => {
  const { ref: refVideo } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  return (
    <div className="component component-video" ref={refVideo}>
      <div className="component__content">
        {/* Title */}
        {props.title && (
          <h2 className="component__content__title">{props.title}</h2>
        )}
        <div className="component__content__inner">
          <iframe
            src={
              "https://player.vimeo.com/video/" +
              props.src +
              "?title=0&byline=0&portrait=0"
            }
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Types
Video.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default Video;
