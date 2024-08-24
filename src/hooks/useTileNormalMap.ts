import { useEffect, useMemo } from 'react';
import { RepeatWrapping, Texture, Vector2 } from 'three';
import { drawTileNormalPatternMap } from '../helpers/drawTexture';

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

export function useTileNormalMap(
  edgeRatio: number,
  edgeSmoothness: number,
  patternSize: number,
  repeat: Vector2,
) {
  const [texture, ctx] = useCanvasTexture(TILE_SIZE);

  useEffect(() => {
    const edgeWidth = TILE_SIZE * edgeRatio;

    drawTileNormalPatternMap(
      ctx,
      TILE_SIZE,
      edgeWidth,
      edgeSmoothness,
      patternSize,
    );

    texture.needsUpdate = true;
  }, [ctx, edgeRatio, edgeSmoothness, patternSize, texture]);

  useEffect(() => {
    texture.repeat.copy(repeat);
  }, [texture, repeat]);

  return texture;
}
