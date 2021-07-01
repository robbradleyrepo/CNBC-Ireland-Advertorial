import React, { useState, useEffect } from "react";
import PropType from "prop-types";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

function LazyImage(props) {
  const observer = useIntersectionObserver(() => {}, { threshold: 1 });
  const imageStyles = {};
  const [state, setState] = useState({
    loaded: false,
    loading: false
  });

  useEffect(() => {
    if (!state.loaded && !state.loading && observer.isIntersecting) {
      setState({
        loaded: false,
        loading: true
      });
      const toLoadImg = new Image();
      toLoadImg.onload = () => {
        setState({ loaded: true, loading: false });
      };
      toLoadImg.src = props.src;
    }
  }, [state, observer.isIntersecting]);

  let imageSrc = "http://localhost:8080/images/placeholder.svg";
  if (state.loading) {
    imageSrc = "http://localhost:8080/images/spin.svg";
    imageStyles.animation = `spin 1.5s linear infinite`;
    imageStyles.width = "2rem";
  } else if (state.loaded) {
    imageSrc = props.src;
    imageStyles.animation = "none";
    imageStyles.width = "100%";
    imageStyles.opacity = 1;
  } else {
    imageStyles.animation = "none";
    imageStyles.width = "5rem";
    imageStyles.opacity = 0.5;
  }

  return (
    <div ref={observer.nodeRef} style={{ ...containerStyles, ...props.style }}>
      <img
        data-src={props.src}
        src={imageSrc}
        alt={props.alt}
        style={{ ...imageStyles }}
        loading="lazy"
      />
    </div>
  );
}

LazyImage.defaultProps = {
  alt: "",
  style: {}
};

LazyImage.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string,
  style: PropType.any
};

export default LazyImage;
