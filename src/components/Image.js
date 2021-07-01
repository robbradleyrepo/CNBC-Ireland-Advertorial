import React from "react";
import PropTypes from "prop-types";
import useAnimation from "../hooks/useAnimation";

const Image = props => {
  const { ref: refImage } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  return (
    <div className="component component-image" ref={refImage}>
      <div className="component__content">
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
};

// Types
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export default Image;
