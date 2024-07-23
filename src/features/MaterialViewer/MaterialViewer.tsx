import { DoubleSide, Texture, Vector2 } from 'three';

export interface MaterialViewerProps {
  map?: Texture;
  normalMap?: Texture;
}

export function MaterialViewer({ map, normalMap }: MaterialViewerProps = {}) {
  return (
    <mesh>
      <planeGeometry args={[4, 4]} />
      <meshPhysicalMaterial
        color="lightseagreen"
        side={DoubleSide}
        roughness={0.1}
        metalness={0.1}
        map={map}
        normalMap={normalMap}
        normalScale={new Vector2(1.0, -1.0)}
      />
    </mesh>
  );
}
