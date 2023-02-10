import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const resize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    resize();
    window.addEventListener("resize", resize);
    const clean = () => {
      window.removeEventListener("resize", resize);
    };
    return clean;
  }, []);

  return windowSize;
};
export default useWindowSize;
