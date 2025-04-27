import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, false);

      return () => {
        document.removeEventListener("click", handleClick, false);
      };
    },
    [handler]
  );

  return ref;
}
