/* eslint react/jsx-no-target-blank:0 */
import React from "react";
import PropTypes from "prop-types";

const Article = props => {
  return (
    <div className="component component-article">
      <a href={props.link} target="_blank" className="component__link">
        {/* Thumb */}
        {props.image && (
          <div
            className="component__thumb"
            style={{
              backgroundImage: `url(${props.image})`
            }}
          ></div>
        )}
        {/* Heading */}
        <div className="component__heading">
          <h3 className="component__heading__title">{props.title}</h3>
        </div>
      </a>
    </div>
  );
};

// Types
Article.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default Article;
