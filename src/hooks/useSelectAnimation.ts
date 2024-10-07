import { useState } from 'react';
import { SpringValue, useSpring } from '@react-spring/three';

export function useSelectAnimation(): [SpringValue<number>, () => void] {
  const [selected, setSelected] = useState(false);

  const [{ opacity }] = useSpring(
    {
      from: { opacity: 0 },
      to: async (next) => {
        await next({ opacity: selected ? 0.5 : 0 });
        await next({ opacity: 0 });
      },
      onRest: () => setSelected(false),
    },
    [selected],
  );

  const select = () => setSelected(true);

  return [opacity, select];
}
