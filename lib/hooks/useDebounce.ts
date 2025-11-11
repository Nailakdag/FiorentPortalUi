import { useCallback, useRef } from "react";

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<any>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

export default useDebounce;
