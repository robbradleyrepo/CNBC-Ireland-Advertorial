import React from "react";
import PropTypes from "prop-types";

const OverlayVideo = props => {
  // Hide overlay video
  const hideVideo = ev => {
    ev.preventDefault();

    props.setVideo(null);
  };

  return (
    <div className="component component-overlay-video">
      {props.src && (
        <div className="component__overlay">
          <div className="component__wrapper">
            <div className="component__wrapper__inner">
              <div className="component__content">
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
                {/* Close */}
                <a
                  href="#close"
                  onClick={ev => hideVideo(ev)}
                  className="component__content__close"
                >
                  <ion-icon name="close-outline"></ion-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Types
OverlayVideo.propTypes = {
  src: PropTypes.string,
  setVideo: PropTypes.func.isRequired
};

export default OverlayVideo;
