import React from "react";
import useRSS from "../hooks/useRSS";
import useAnimation from "../hooks/useAnimation";

import Article from "./Article.js";

const News = () => {
  const { ref: refList } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  const { data, loading } = useRSS(
    "https://www.idaireland.com/reports/newsrss.aspx?rss=news"
  );

  if (loading || !data) {
    return (
      <div className="component component-news">
        <div className="component__wrapper">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="component component-news">
      <div className="component__wrapper">
        <div className="component__grid" ref={refList}>
          {data.map((item, index) => {
            if (!item.image || !item.title || !item.link) return null;

            return (
              <div
                className={"component__grid__item grid-item-" + index}
                key={index}
              >
                <Article {...item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
