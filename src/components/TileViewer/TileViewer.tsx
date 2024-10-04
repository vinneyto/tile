import { a, useSpring } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Texture, Vector2 } from 'three';

export type TileDebug = 'map' | 'normalMap';

export interface MaterialViewerProps extends MeshProps {
  color?: string;
  map?: Texture;
  normalMap?: Texture;
  debug?: TileDebug;
  roughness?: number;
  metalness?: number;
  children?: React.ReactNode;
  selected?: boolean;
}

export function TileViewer({
  color,
  map,
  normalMap,
  roughness,
  metalness,
  debug,
  selected,
  children,
  ...rest
}: MaterialViewerProps = {}) {
  const [{ opacity }] = useSpring(
    {
      from: { opacity: 0 },
      to: async (next) => {
        await next({ opacity: selected ? 0.5 : 0 });
        await next({ opacity: 0 });
      },
    },
    [selected],
  );

  useEffect(() => {
    opacity.stop();
  }, [opacity]);

  if (debug) {
    return (
      <mesh {...rest}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={debug === 'map' ? map : normalMap} />
        {children}
      </mesh>
    );
  }

  return (
    <mesh {...rest}>
      <planeGeometry args={[4, 4]} />
      <meshPhysicalMaterial
        color={color || 'white'}
        // side={DoubleSide}
        roughness={roughness ?? 0.1}
        metalness={metalness ?? 0.1}
        map={map}
        normalMap={normalMap}
        normalScale={new Vector2(1.0, -1.0)}
      />
      {children}
      <a.mesh position-z={0.001}>
        <planeGeometry args={[4, 4]} />
        <a.meshBasicMaterial
          depthWrite={false}
          color="white"
          transparent={true}
          opacity={opacity}
        />
      </a.mesh>
    </mesh>
  );
}
