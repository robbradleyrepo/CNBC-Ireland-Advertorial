import { useState, useEffect } from "react";

function useScreenSize() {
  const [state, setState] = useState({ width: 1, height: 1 });
  const onWindowSize = () => {
    setState({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("resize", onWindowSize);
      setState({ width: window.innerWidth, height: window.innerHeight });
    }
    return () => {
      window.removeEventListener("resize", onWindowSize);
    };
  }, []);
  return state;
}

export default useScreenSize;
