import { useEffect, useRef } from "react";

interface Props {
  closeFc: (value) => void;
  value: string | boolean;
  stopBubbling?: boolean;
}

function useClickoutSide({ closeFc, value, stopBubbling = true }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    function handler(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeFc(value);
      }
    }

    window.addEventListener("click", handler, stopBubbling);

    return () => window.removeEventListener("click", handler, stopBubbling);
  }, [closeFc, ref, value, stopBubbling]);

  return ref;
}

export default useClickoutSide;
