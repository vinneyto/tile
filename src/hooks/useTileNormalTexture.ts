import { useEffect, useMemo } from 'react';
import { RepeatWrapping, Texture, Vector2 } from 'three';
import { drawTileNormalMap } from '../helpers/drawTexture';

export const TILE_SIZE = 512;

export function useCanvasTexture(size: number) {
  const texture = useMemo(() => {
    const texture = new Texture();
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.flipY = true;
    return texture;
  }, []);

  const ctx = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    return canvas.getContext('2d')!;
  }, [size]);

  useEffect(() => {
    texture.image = ctx.canvas;
    texture.needsUpdate = true;

    return () => {
      texture.dispose();
    };
  }, [texture, ctx]);

  return [texture, ctx] as const;
}

export function useTileNormalTexture(
  edgeRatio: number,
  edgeSmoothness: number,
  repeat: Vector2
) {
  const [texture, ctx] = useCanvasTexture(TILE_SIZE);

  useEffect(() => {
    const edgeWidth = TILE_SIZE * edgeRatio;

    drawTileNormalMap(ctx, TILE_SIZE, edgeWidth, edgeSmoothness);

    texture.needsUpdate = true;
  }, [texture, ctx, edgeSmoothness, edgeRatio]);

  useEffect(() => {
    texture.repeat.copy(repeat);
  }, [texture, repeat]);

  return texture;
}
