import { useState, useEffect } from "react";

function useScroll() {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = () => {
    setState({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", onScroll);
      setState({ x: window.scrollX, y: window.scrollY });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
}

export default useScroll;
