import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export default function useTypeWritterAnimation(animationOptions) {
  const defaultOptions = {
    frameDuration: 200,
    loop: false,
    manualStart: false,
    onComplete: () => {}
  };
  const options = { ...defaultOptions, ...animationOptions };
  const { nodeRef, isIntersecting } = useIntersectionObserver();
  const [stringToAnimate, setSteingToAnimate] = useState("");
  const [done, setDone] = useState(false);
  const [start, setStart] = useState(!options.manualStart);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (nodeRef.current) {
      if (!stringToAnimate) {
        setSteingToAnimate(nodeRef.current.innerHTML);
        nodeRef.current.innerHTML = "";
      }
      if (isIntersecting && !done && !running && start) {
        setRunning(true);
        const textArray = stringToAnimate.split(" ");

        let framesClock = 0;
        const onFrame = () => {
          framesClock = framesClock + 1;
          nodeRef.current.innerHTML = "";
          for (let i = 0; i < framesClock; i++) {
            nodeRef.current.innerHTML =
              nodeRef.current.innerHTML + " " + textArray[i];
          }
          if (framesClock >= textArray.length) {
            clearInterval(animate);
            if (!options.loop) {
              setDone(true);
              setStart(false);
            }
            setRunning(false);

            options.onComplete();
          }
        };
        const animate = setInterval(onFrame, options.frameDuration);
      }
    }
  }, [isIntersecting, nodeRef.current, start]);
  return {
    nodeRef: nodeRef,
    play: () => {
      setStart(true);
    }
  };
}
