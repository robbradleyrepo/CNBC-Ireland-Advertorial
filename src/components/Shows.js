import React, { useState } from "react";
import useAnimation from "../hooks/useAnimation";

import items from "../../public/data/shows.json?v=1.5";
import Show from "./Show.js";
import OverlayVideo from "./OverlayVideo.js";

const Shows = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const { ref: refList } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  return (
    <div className="component component-shows">
      <div className="component__wrapper">
        <div className="component__grid" ref={refList}>
          {items.map((item, index) => (
            <div
              className={"component__grid__item grid-item-" + index}
              key={index}
            >
              <Show item={item} setVideo={setCurrentVideo} />
            </div>
          ))}
        </div>
        <OverlayVideo src={currentVideo} setVideo={setCurrentVideo} />
      </div>
    </div>
  );
};

export default Shows;
