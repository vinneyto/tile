import React, { useEffect, useRef } from 'react';

export function useDebounceEffect(
  fn: React.EffectCallback,
  delay: number,
  values: React.DependencyList,
) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      fn();
      return;
    }

    const handler = setTimeout(() => {
      fn();
    }, delay);

    return () => clearTimeout(handler);
  }, values);
}
