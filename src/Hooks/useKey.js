import { useEffect } from "react";
export const useKey = (key, callbackFunction) => {
  useEffect(() => {
    const callback = (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callbackFunction?.();
      }
    };
    document.addEventListener("keyup", callback);
    return () => {
      document.removeEventListener("keyup", callback);
    };
  }, [callbackFunction, key]);
};
