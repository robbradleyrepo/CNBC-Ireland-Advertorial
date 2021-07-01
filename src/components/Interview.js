import React from "react";
import PropTypes from "prop-types";

const Interview = props => {
  // Show overlay video
  const showVideo = (ev, id) => {
    ev.preventDefault();

    if (!id) return;

    props.setVideo(id);
  };

  return (
    <div className="component component-interview">
      {/* Thumb */}
      {props.item.thumb && (
          <a
              href="#view"
              onClick={ev => showVideo(ev, props.item.video)}
              className="component__link"
          >
            <div
                className={
                  "component__thumb " +
                  (props.item.video ? "thumb-active" : "thumb-inactive")
                }
                style={{
                  backgroundImage: `url(http://localhost:8080/images/${props.item.thumb})`
                }}
            >
              <div className="component__thumb__icon">
                <ion-icon name="play-outline"></ion-icon>
              </div>
            </div>
          </a>
      )}
      {/* Heading */}
      <div className="component__heading">
        <h3 className="component__heading__title">{props.item.title}</h3>
        {props.item.date && (
          <div className="component__heading__date">{props.item.date}</div>
        )}
        {props.item.link && (
            <a href={props.item.link} className="component__heading__button">Read more</a>
        )}
      </div>
    </div>
  );
};

// Types
Interview.propTypes = {
  item: PropTypes.object.isRequired,
  setVideo: PropTypes.func.isRequired
};

export default Interview;
