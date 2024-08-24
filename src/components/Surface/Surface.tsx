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

export function Surface({ tile, tileDebug, ...rest }: SurfaceProps) {
  const repeat = new Vector2(tile.repeat, tile.repeat);

  const tileColorMap = useTileColorMap(tile.pattern, repeat);

  const tileNormalTexture = useTileNormalMap(
    tile.edgeRatio,
    tile.edgeSmoothness,
    tile.pattern.length,
    repeat,
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
