import { Vector2 } from 'three';
import { TILE_SIZE, useCanvasTexture } from './useTileNormalMap.ts';
import { useEffect } from 'react';
import { drawTileColorPatternMap } from '../helpers/drawTexture';

export function useTileColorMap(pattern: string[][], repeat: Vector2) {
  const [texture, ctx] = useCanvasTexture(TILE_SIZE);

  useEffect(() => {
    drawTileColorPatternMap(ctx, pattern);

    texture.needsUpdate = true;
  }, [texture, ctx, pattern]);

  useEffect(() => {
    texture.repeat.copy(repeat);
  }, [texture, repeat]);

  return texture;
}
