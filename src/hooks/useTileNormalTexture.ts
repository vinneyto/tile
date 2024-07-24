import { useEffect, useMemo } from 'react';
import { RepeatWrapping, Texture, Vector2 } from 'three';
import { drawTileNormalMap } from '../helpers/drawTexture';

export const TILE_SIZE = 512;

export function useTileNormalTexture(
  edgeRatio: number,
  edgeSmoothness: number,
  repeat: Vector2
) {
  const texture = useMemo(() => {
    const texture = new Texture();
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.flipY = true;
    return texture;
  }, []);

  const ctx = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = TILE_SIZE;
    return canvas.getContext('2d')!;
  }, []);

  useEffect(() => {
    const edgeWidth = TILE_SIZE * edgeRatio;

    drawTileNormalMap(ctx, TILE_SIZE, edgeWidth, edgeSmoothness);

    texture.image = ctx.canvas;
    texture.needsUpdate = true;
  }, [texture, ctx, edgeSmoothness, edgeRatio]);

  useEffect(() => {
    texture.repeat.copy(repeat);
  }, [texture, repeat]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}
