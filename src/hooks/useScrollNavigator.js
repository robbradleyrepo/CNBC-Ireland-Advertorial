import React, { useState } from "react";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export const NavigationContext = React.createContext({
  currentSection: "#",
  navigate: () => {}
});

function useScrollNavigator(sections = [], scrollOffset = 0) {
  const [currentSection, setCurrentSection] = useState(null);
  const navigate = (path, animate = false) => {
    if (sections.indexOf(path) !== -1) {
      if (!window.animating) {
        setCurrentSection(path);
        window.location.hash = path;
        if (animate) {
          const getTop = () => {
            return document.querySelector(`[data-path='${path}']`).offsetTop;
          };

          gsap.to(window, {
            duration: 0.5,
            onStart: () => {
              window.animating = true;
            },
            onComplete: () => {
              window.animating = false;
              window.scrollTo(0, getTop() + scrollOffset);
            },
            scrollTo: getTop() + scrollOffset
          });
        }
      }
    } else {
      console.error("Path does not declared in sections inventory", path);
    }
  };
  return { currentSection, navigate };
}
export default useScrollNavigator;
