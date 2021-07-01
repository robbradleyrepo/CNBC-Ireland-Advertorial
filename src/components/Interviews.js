import React, { useState } from "react";
import useAnimation from "../hooks/useAnimation";
import Slider from "react-slick";

import items from "../../public/data/interviews.json?v=1.5";
import Interview from "./Interview.js";
import OverlayVideo from "./OverlayVideo.js";

const Interviews = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          rows: 2,
          slidesPerRow: 2,
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          rows: 1,
          slidesPerRow: 2,
          slidesToShow: 1,
        }
      }
    ]
  };

  const { ref: refList } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  return (
    <div className="component component-interviews">
      <div className="component__wrapper">
        <div className="component__grid" ref={refList}>
          <Slider {...settings}>
            {items.map((item, index) => (
              <div
                className={"component__grid__item grid-item-" + index}
                key={index}
              >
                <Interview item={item} setVideo={setCurrentVideo} />
              </div>
            ))}
          </Slider>
        </div>
        <OverlayVideo src={currentVideo} setVideo={setCurrentVideo} />
      </div>
    </div>
  );
};

export default Interviews;
