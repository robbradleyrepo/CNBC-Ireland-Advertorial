import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (
  callback = () => null,
  observerOpptions = {}
) => {
  const [isIntersecting, setIntersect] = useState(false);
  const nodeRef = useRef();

  let defaultObserverOpptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  };

  const options = { ...defaultObserverOpptions, ...observerOpptions };

  const onIntersection = entries => {
    const IOEntry = entries[0];
    setIntersect(IOEntry.isIntersecting);
    if (IOEntry.isIntersecting && IOEntry.intersectionRatio > 0.25) {
      callback(nodeRef);
    }
  };

  useEffect(() => {
    if (nodeRef.current) {
      let observer = new IntersectionObserver(onIntersection, options);
      observer.observe(nodeRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [nodeRef.current]);

  return { nodeRef, isIntersecting };
};

export default useIntersectionObserver;
