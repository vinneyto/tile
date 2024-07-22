import { DoubleSide, Texture } from 'three';

export interface MaterialViewerProps {
  map?: Texture;
  normalMap?: Texture;
}

export function MaterialViewer({ map, normalMap }: MaterialViewerProps = {}) {
  return (
    <mesh>
      <planeGeometry args={[4, 4]} />
      <meshPhysicalMaterial
        color="hotpink"
        side={DoubleSide}
        roughness={0.1}
        metalness={0.3}
        map={map}
        bumpMap={normalMap}
      />
    </mesh>
  );
}
