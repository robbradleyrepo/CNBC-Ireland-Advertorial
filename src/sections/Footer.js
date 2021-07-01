/* eslint react/jsx-no-target-blank:0 */
import React from "react";
import useAnimation from "../hooks/useAnimation";

import Series from "../components/Series.js";

const Footer = () => {
  const { ref: refTitle } = useAnimation({
    animationName: "fadeInLeft",
    duration: 800,
    delay: 400,
    loop: false,
    autoStart: true
  });

  const { ref: refLine } = useAnimation({
    animationName: "fadeInLeft",
    duration: 800,
    delay: 600,
    loop: false,
    autoStart: true
  });

  const { ref: refCTA } = useAnimation({
    animationName: "fadeInUp",
    duration: 800,
    delay: 800,
    loop: false,
    autoStart: true
  });

  return (
    <div className="catalyst-campaign__footer">
      {/* Series */}
      <Series image="http://localhost:8080/images/series-01.jpg" />
      <div className="catalyst-campaign__footer__wrapper">
        <div className="catalyst-campaign__footer__grid">
          <div className="catalyst-campaign__footer__grid__row">
            <div className="catalyst-campaign__footer__grid__row__col catalyst-campaign__footer__grid__row__col--left">
              {/* Heading */}
              <div className="catalyst-campaign__footer__heading">
                <h3
                  className="catalyst-campaign__footer__heading__title"
                  ref={refTitle}
                >
                  Why invest in Ireland?
                </h3>
                <div
                  className="catalyst-campaign__footer__heading__line"
                  ref={refLine}
                ></div>
              </div>
            </div>
            <div className="catalyst-campaign__footer__grid__row__col catalyst-campaign__footer__grid__row__col--right">
              {/* CTA */}
              <div className="catalyst-campaign__footer__cta" ref={refCTA}>
                <p>
                  Forbes magazine has ranked Ireland as one of the best
                  countries for business. This is not just for large
                  multinationals, but also the potential multinationals of the
                  future. IDA nurtures these high-growth companies, helping them
                  forge their future success in Ireland.
                </p>
                <a
                  href="https://ad.doubleclick.net/ddm/clk/480143769;286383612;q"
                  target="_blank"
                >
                  Discover more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
