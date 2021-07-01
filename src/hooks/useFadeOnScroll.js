import { useEffect, useRef, useState } from "react";

/**
 *
 * @param {int} distance distance to fade 1000 -> 1 opacity at 1000 pixels of scroll
 * @param {int} offset offset from the top to start listining for fade calculation
 */

export default function useFadeOnScroll(distance, offset) {
  const [opacity, setOpacity] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      const onScroll = () => {
        if (window.scrollY > offset) {
          let op =
            window.scrollY / distance > 1 ? 1 : window.scrollY / distance;
          setOpacity(op);
        } else {
          setOpacity(0);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, []);
  return { ref, opacity };
}
