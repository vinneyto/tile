import { ThreeEvent } from '@react-three/fiber';
import { DependencyList, useCallback, useRef } from 'react';
import { Vector2 } from 'three';

export function useTap(cb: () => void, deps: DependencyList, delta = 5) {
  const pressed = useRef(false);
  const startCoordinates = useRef(new Vector2());
  const movementDistance = useRef(0);

  const onPointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    pressed.current = true;
    startCoordinates.current.set(event.clientX, event.clientY);
    movementDistance.current = 0;
  }, []);

  const onPointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const currentCoordinates = new Vector2(event.clientX, event.clientY);

      movementDistance.current += currentCoordinates.distanceTo(
        startCoordinates.current,
      );

      if (movementDistance.current > delta) {
        pressed.current = false;
      }
    },
    [delta],
  );

  const onPointerUp = useCallback(() => {
    if (pressed.current) {
      pressed.current = false;
      cb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, ...deps]);

  return { onPointerDown, onPointerMove, onPointerUp };
}
