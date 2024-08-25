import { Vector2 } from 'three';
import { TILE_SIZE, useCanvasTexture } from './useTileNormalMap.ts';
import { useEffect } from 'react';
import { drawTileColorPatternMap } from '../helpers/drawTexture';
import { useDebounceEffect } from './useDebounceEffect.ts';

export function useTileColorMap(pattern: string[][], repeat: Vector2) {
  const [texture, ctx] = useCanvasTexture(TILE_SIZE);

  useDebounceEffect(
    () => {
      drawTileColorPatternMap(ctx, pattern);

      texture.needsUpdate = true;
    },
    300,
    [texture, ctx, pattern],
  );

  useEffect(() => {
    texture.repeat.copy(repeat);
  }, [texture, repeat]);

  return texture;
}
