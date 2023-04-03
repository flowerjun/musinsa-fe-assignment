import { useState, useRef, useEffect } from "react";

import { InfiniteScrollOptions } from "src/@types/InfiniteScrollOptions";

// ----------------------------------------------------------------------

const useInfiniteScroll = (
  callback: () => void,
  options: InfiniteScrollOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
  const { root = null, rootMargin = "0px", threshold = 1.0 } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          callback();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [callback, root, rootMargin, threshold]);

  return [loaderRef, isIntersecting];
};

export default useInfiniteScroll;