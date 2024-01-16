import { useEffect } from "react";

const EVENT = "mousedown";

const useClickAway = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };
    document.addEventListener(EVENT, listener);
    return () => {
      document.removeEventListener(EVENT, listener);
    };
  }, [ref, callback]);
};

export default useClickAway;
