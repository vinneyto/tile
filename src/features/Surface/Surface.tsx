import { Vector2 } from 'three';
import { TileViewer } from '../TileViewer';
import { useTileNormalTexture } from '../../hooks/useTileNormalTexture';
import { MeshProps } from '@react-three/fiber';
import { Material } from '../../store/materialsSlice';

export interface SurfaceProps extends MeshProps {
  tile: Material;
  tileDebug?: 'map' | 'normalMap';
}

export function Surface({ tile, tileDebug, ...rest }: SurfaceProps) {
  const tileNormalTexture = useTileNormalTexture(
    tile.edgeRatio,
    tile.edgeSmoothness,
    new Vector2(tile.repeat, tile.repeat)
  );

  return (
    <TileViewer
      color={tile.color}
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
