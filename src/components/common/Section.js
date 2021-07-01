import React from "react";
import PropTypes from "prop-types";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const Section = props => {
  const observer = useIntersectionObserver(() => {
    props.inCallback(props.path);
  });

  return (
    <div ref={observer.nodeRef} className={props.className}>
      <a name={props.path}></a>
      {props.children}
    </div>
  );
};

Section.defaultProps = {
  className: "",
  path: "#/",
  inCallback: () => {}
};

Section.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  inCallback: PropTypes.func,
  children: PropTypes.element
};

export default Section;
