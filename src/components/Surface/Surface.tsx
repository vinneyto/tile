import { Vector2 } from 'three';
import { TileViewer } from '../TileViewer';
import { useTileNormalTexture } from '../../hooks/useTileNormalTexture';
import { MeshProps } from '@react-three/fiber';
import { Material } from '../../store/materialsSlice';
import { useTileColorMap } from '../../hooks/useTileColorTexture';
import { useMemo } from 'react';

export interface SurfaceProps extends MeshProps {
  tile: Material;
  tileDebug?: 'map' | 'normalMap';
}

export function Surface({ tile, tileDebug, ...rest }: SurfaceProps) {
  const repeat = new Vector2(tile.repeat, tile.repeat);

  const colors = useMemo(() => [tile.color], [tile.color]);

  const tileColorMap = useTileColorMap(colors, 1, repeat);

  const tileNormalTexture = useTileNormalTexture(
    tile.edgeRatio,
    tile.edgeSmoothness,
    repeat
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
