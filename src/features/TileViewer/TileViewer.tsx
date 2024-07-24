import { DoubleSide, Texture, Vector2 } from 'three';

export type TileDebug = 'map' | 'normalMap';

export interface MaterialViewerProps {
  color?: string;
  map?: Texture;
  normalMap?: Texture;
  debug?: TileDebug;
  roughness?: number;
  metalness?: number;
}

export function TileViewer({
  color,
  map,
  normalMap,
  roughness,
  metalness,
  debug,
}: MaterialViewerProps = {}) {
  if (debug) {
    return (
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={debug === 'map' ? map : normalMap} />
      </mesh>
    );
  }

  return (
    <mesh>
      <planeGeometry args={[4, 4]} />
      <meshPhysicalMaterial
        color={color ?? 'white'}
        side={DoubleSide}
        roughness={roughness ?? 0.1}
        metalness={metalness ?? 0.1}
        map={map}
        normalMap={normalMap}
        normalScale={new Vector2(1.0, -1.0)}
      />
    </mesh>
  );
}
