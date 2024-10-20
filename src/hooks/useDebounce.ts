import { useState, useEffect, useRef } from 'react';

export function useDebounce<T extends unknown[]>(values: T, delay: number): T {
  const [debouncedValues, setDebouncedValues] = useState<T>(values);
  const timerIdRef = useRef<number>();

  useEffect(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    timerIdRef.current = setTimeout(() => {
      setDebouncedValues(values);
    }, delay);

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...values, delay]);

  return debouncedValues;
}
