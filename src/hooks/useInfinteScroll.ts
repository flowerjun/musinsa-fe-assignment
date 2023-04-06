import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { IntersectionOptions, UseInfiniteScrollReturnType } from 'src/@types/InfiniteScroll';

// ----------------------------------------------------------------------

const useInfiniteScroll = (
  intersectRef: RefObject<Element>,
  options: IntersectionOptions = {}
): UseInfiniteScrollReturnType => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    setIsIntersecting(target.isIntersecting);
  }, []);

  const observerOptions = useMemo(
    () => ({
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    }),
    [options.root, options.rootMargin, options.threshold]
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (intersectRef.current) {
      observer = new IntersectionObserver(handleObserver, observerOptions);
      observer.observe(intersectRef.current);
    }
    return () => observer?.disconnect();
  }, [intersectRef.current, handleObserver, observerOptions]);

  return { isIntersecting };
};

export default useInfiniteScroll;
