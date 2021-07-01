import React from "react";
import PropType from "prop-types";
export default function VimeoPlayer(props) {
  return (
    <div
      style={{
        padding: "56.25% 0 0 0",
        position: "relative",
        backgroundColor: "black"
      }}
    >
      <iframe
        src={"https://player.vimeo.com/video/" + props.videoID}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
}

VimeoPlayer.propTypes = {
  videoID: PropType.string.isRequired
};
