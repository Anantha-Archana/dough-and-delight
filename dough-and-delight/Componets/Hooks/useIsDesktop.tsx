import { useState, useEffect } from "react";

const useIsDesktop = (minWidth = 769) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`);
    const listener = () => setIsDesktop(media.matches);

    listener(); // Initial check

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return isDesktop;
};

export default useIsDesktop;
