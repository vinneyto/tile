import { a, SpringValue } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
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
  selectionOpacity?: number | SpringValue<number>;
}

export function TileViewer({
  color,
  map,
  normalMap,
  roughness,
  metalness,
  selectionOpacity,
  debug,
  children,
  ...rest
}: MaterialViewerProps = {}) {
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
          opacity={selectionOpacity || 0}
        />
      </a.mesh>
    </mesh>
  );
}
