import React from "react";
import PropTypes from "prop-types";

export default function BackgroundImage(props) {
  return (
    <div
      className={props.className}
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: props.overlay
        }}
      ></div>
      <div style={{ position: "relative" }}>{props.children}</div>
    </div>
  );
}

BackgroundImage.defaultProps = {
  className: "",
  overlay: "none"
};

BackgroundImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  overlay: PropTypes.string
};
