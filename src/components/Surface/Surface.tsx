import { Vector2 } from 'three';
import { TileViewer } from '../TileViewer';
import { useTileNormalMap } from '../../hooks/useTileNormalMap.ts';
import { MeshProps } from '@react-three/fiber';
import { Material } from '../../store/materialsSlice';
import { useTileColorMap } from '../../hooks/useTileColorMap.ts';
import { useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { SpringValue } from '@react-spring/three';
// import { useMemo } from 'react';

export interface SurfaceProps extends MeshProps {
  tile: Material;
  tileDebug?: 'map' | 'normalMap';
  selectionOpacity?: number | SpringValue<number>;
}

export function Surface({ tile, tileDebug, ...rest }: SurfaceProps) {
  const repeat = new Vector2(tile.repeat, tile.repeat);

  const [pattern] = useDebounce([tile.pattern], 300);

  const [edgeRatio, edgeSmoothness, patternSize] = useDebounce(
    [tile.edgeRatio, tile.edgeSmoothness, tile.pattern.length],
    300,
  );

  const tileColorMap = useTileColorMap(pattern, repeat);
  const tileNormalTexture = useTileNormalMap(
    edgeRatio,
    edgeSmoothness,
    patternSize,
    repeat,
  );

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto';
  }, []);

  return (
    <TileViewer
      map={tileColorMap}
      normalMap={tileNormalTexture}
      debug={tileDebug}
      roughness={tile.roughness}
      metalness={tile.metalness}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...rest}
    >
      {/* <axesHelper /> */}
    </TileViewer>
  );
}
