//@flow
import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
// Animations Types please review https://daneden.github.io/animate.css/ for demo animations.
// All animations has to be included inside src/common/_animate.scss i to woek
//https://github.com/tgdev/animate-sass/blob/master/README.md
//   | fadeIn
//   | fadeInDown
//   | fadeInDownBig
//   | fadeInLeft
//   | fadeInLeftBig
//   | fadeInRight
//   | fadeInRightBig
//   | fadeInUp
//   | fadeInUpBig
//   | fadeOut
//   | fadeOutDown
//   | fadeOutDownBig
//   | fadeOutLeft
//   | fadeOutLeftBig
//   | fadeOutRight
//   | fadeOutRightBig
//   | fadeOutUp
//   | fadeOutUpBig;

// Zoom (Requires $use-zoom=true on scss)
// zoomIn
// zoomInDown
// zoomInLeft
// zoomInRight
// zoomInUp
// Zooming exits
// zoomOut
// zoomOutDown
// zoomOutLeft
// zoomOutRight
// zoomOutUp

function useAnimation(animationOptions) {
  const defaultOptions = {
    animationName: "fadeIn",
    delay: 0,
    autoStart: false,
    duration: 500,
    loop: false,
    onComplete: () => {}
  };

  const options = { ...defaultOptions, ...animationOptions };

  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);

  let autoPlay = () => {};

  if (options.autoStart) {
    autoPlay = () => {
      setStart(true);
    };
  }

  const { nodeRef, isIntersecting } = useIntersectionObserver(autoPlay);
  const reset = () => {
    setStart(false);
    setDone(false);
    nodeRef.current.classList.add("pre-animated");
  };
  useEffect(() => {
    if (nodeRef.current && isIntersecting && !done && start) {
      const handleAnimationEnd = () => {
        nodeRef.current.classList.remove("animated", options.animationName);
        nodeRef.current.removeEventListener("animationend", handleAnimationEnd);
        options.onComplete();
        if (options.loop) {
          setStart(false);
        } else {
          setDone(true);
        }
      };
      nodeRef.current.addEventListener("animationend", handleAnimationEnd);
      nodeRef.current.classList.remove("pre-animated");
      nodeRef.current.classList.add("animated", options.animationName);
      nodeRef.current.style.animationDelay = options.delay / 1000 + "s";
      nodeRef.current.style.animationDuration = options.duration / 1000 + "s";
      return () => {
        if (nodeRef.current)
          nodeRef.current.removeEventListener(
            "animationend",
            handleAnimationEnd
          );
      };
    } else if (nodeRef.current && !start && !done && !isIntersecting) {
      reset();
    }
  }, [nodeRef.current, done, start]);

  return {
    ref: nodeRef,
    play: () => {
      setStart(true);
    },
    reset: reset
  };
}

export default useAnimation;
