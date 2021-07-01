import { useState, useEffect } from "react";

const usePointerPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    const setFromTouchEvent = e => {
      setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };
    window.addEventListener("mousemove", setFromEvent);
    window.addEventListener("touchmove", setFromTouchEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.removeEventListener("touchmove", setFromTouchEvent);
    };
  }, []);
  return position;
};

export default usePointerPosition;
