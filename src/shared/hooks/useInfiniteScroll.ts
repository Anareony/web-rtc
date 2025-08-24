import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void, reset: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries.length === 0) {
            return;
          }

          if (entries[0].isIntersecting) {
            callback();
          }
        },
        { threshold: 1 }
      );

      observer.current.observe(node);
    },
    [callback]
  );

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
      reset();
    };
  }, []);

  return lastElementRef;
};
