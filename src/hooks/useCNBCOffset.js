import { useState, useEffect } from "react";
import useScreenSize from "./useScreenSize";
import useScroll from "./useScroll";

const ScrollOffset = 120;
const mobileBreakpoint = 720;
const tabletBreakpoint = 1019;
const headerHeightReduxMobile = 0;
const headerHeightReduxTablet = 45;
const headerHeightReduxDesktop = 50;
const headerHeightFullMobile = 45;
const headerHeightFullTabletDesktop = 70;
const footerNavHeightMobile = 54;

function useCNBCHeaderOffset() {
  const [offset, setOffset] = useState({ tops: 0, bottom: 0 });
  const windowSize = useScreenSize();
  const windowScroll = useScroll();

  useEffect(() => {
    const getTop = () => {
      if (windowScroll.y >= ScrollOffset) {
        if (windowSize.width < mobileBreakpoint) {
          return headerHeightReduxMobile;
        } else if (windowSize.width < tabletBreakpoint) {
          return headerHeightReduxTablet;
        } else {
          return headerHeightReduxDesktop;
        }
      } else {
        if (windowSize.width < mobileBreakpoint) {
          return headerHeightFullMobile;
        } else {
          return headerHeightFullTabletDesktop;
        }
      }
    };
    const getBottom = () => {
      if (windowSize.width < mobileBreakpoint) {
        //if (windowScroll.y >= ScrollOffset) {
        return footerNavHeightMobile;
        //}
      }
      return 0;
    };
    setOffset({ top: getTop(), bottom: getBottom() });
  }, [windowScroll.y, windowSize.width]);

  return offset;
}

export default useCNBCHeaderOffset;
