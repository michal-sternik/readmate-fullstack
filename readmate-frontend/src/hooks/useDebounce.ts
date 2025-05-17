import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 400) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 400);

    return () => clearInterval(timer);
  }, [value, delay]);
  return debounceValue;
};
