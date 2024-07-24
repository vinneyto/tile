import { Environment, OrbitControls } from '@react-three/drei';
import { Vector2 } from 'three';
import { TileViewer } from '../TileViewer';
import { useTileNormalTexture } from '../../hooks/useTileNormalTexture';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Canvas } from '@react-three/fiber';

export interface SceneProps {
  env: PresetsType;
  tileEdgeRatio: number;
  tileEdgeSmoothness: number;
  tileRepeat: Vector2;
  tileColor: string;
  tileRoughness: number;
  tileMetalness: number;
  tileDebug?: 'map' | 'normalMap';
}

export function Scene({
  env,
  tileEdgeRatio,
  tileEdgeSmoothness,
  tileRepeat,
  tileColor,
  tileRoughness,
  tileMetalness,
  tileDebug,
}: SceneProps) {
  const tileNormalTexture = useTileNormalTexture(
    tileEdgeRatio,
    tileEdgeSmoothness,
    tileRepeat
  );

  return (
    <Canvas style={{ background: '#333333' }}>
      <Environment preset={env} background />
      <OrbitControls makeDefault />
      <TileViewer
        color={tileColor}
        normalMap={tileNormalTexture}
        debug={tileDebug}
        roughness={tileRoughness}
        metalness={tileMetalness}
      />
    </Canvas>
  );
}
