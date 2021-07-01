import React from "react";
import PropTypes from "prop-types";

const Copy = props => {
  return (
    <div className="component component-copy">
      <div className="component__content">{props.copy}</div>
    </div>
  );
};

// Types
Copy.propTypes = {
  copy: PropTypes.object.isRequired
};

export default Copy;
