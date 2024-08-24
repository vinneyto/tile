import { Vector2 } from 'three';
import { TileViewer } from '../TileViewer';
import { useTileNormalMap } from '../../hooks/useTileNormalMap.ts';
import { MeshProps } from '@react-three/fiber';
import { Material } from '../../store/materialsSlice';
import { useTileColorMap } from '../../hooks/useTileColorMap.ts';
// import { useMemo } from 'react';

export interface SurfaceProps extends MeshProps {
  tile: Material;
  tileDebug?: 'map' | 'normalMap';
}

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFFFFF',
  '#000000',
  '#808080',
];

export function Surface({ tile, tileDebug, ...rest }: SurfaceProps) {
  const repeat = new Vector2(tile.repeat, tile.repeat);

  const tileColorMap = useTileColorMap(colors, 3, repeat);

  const tileNormalTexture = useTileNormalMap(
    tile.edgeRatio,
    tile.edgeSmoothness,
    repeat,
    3,
  );

  return (
    <TileViewer
      map={tileColorMap}
      normalMap={tileNormalTexture}
      debug={tileDebug}
      roughness={tile.roughness}
      metalness={tile.metalness}
      {...rest}
    >
      {/* <axesHelper /> */}
    </TileViewer>
  );
}
