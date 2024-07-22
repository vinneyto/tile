import { useEffect, useMemo } from 'react';
import { RepeatWrapping, Texture } from 'three';

export function useTileNormalTexture() {
  const texture = useMemo(() => new Texture(), []);

  useEffect(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const edgeWidth = size * 0.02;

    ctx.fillStyle = 'rgb(128, 128, 255)';
    ctx.fillRect(0, 0, size, size);

    const gradients = {
      top: ctx.createLinearGradient(0, 0, 0, edgeWidth),
      bottom: ctx.createLinearGradient(0, size - edgeWidth, 0, size),
      left: ctx.createLinearGradient(0, 0, edgeWidth, 0),
      right: ctx.createLinearGradient(size - edgeWidth, 0, size, 0),
    };

    const addGradientColorStops = (
      gradient: CanvasGradient,
      c1: string,
      c2: string
    ) => {
      gradient.addColorStop(0, c1);
      gradient.addColorStop(1, c2);
    };

    addGradientColorStops(
      gradients.top,
      'rgb(128, 255, 128)',
      'rgb(128, 128, 255)'
    );

    addGradientColorStops(
      gradients.bottom,
      'rgb(128, 128, 255)',
      'rgb(128, 0, 128)'
    );

    addGradientColorStops(
      gradients.left,
      'rgb(0, 128, 128)',
      'rgb(128, 128, 255)'
    );

    addGradientColorStops(
      gradients.right,
      'rgb(128, 128, 255)',
      'rgb(255, 128, 128)'
    );

    // Добавляем градиенты к сторонам, исключая углы
    ctx.fillStyle = gradients.top;
    ctx.fillRect(edgeWidth, 0, size - 2 * edgeWidth, edgeWidth);
    ctx.fillStyle = gradients.bottom;
    ctx.fillRect(edgeWidth, size - edgeWidth, size - 2 * edgeWidth, edgeWidth);
    ctx.fillStyle = gradients.left;
    ctx.fillRect(0, edgeWidth, edgeWidth, size - 2 * edgeWidth);
    ctx.fillStyle = gradients.right;
    ctx.fillRect(size - edgeWidth, edgeWidth, edgeWidth, size - 2 * edgeWidth);

    // // Исправление: создаем специфические градиенты для углов
    // // Верхний левый угол
    // let cornerGradient = ctx.createLinearGradient(0, 0, edgeWidth, edgeWidth);
    // cornerGradient.addColorStop(0, 'rgb(255, 128, 128)');
    // cornerGradient.addColorStop(1, 'rgb(128, 128, 255)');
    // ctx.fillStyle = cornerGradient;
    // ctx.fillRect(0, 0, edgeWidth, edgeWidth);

    // // Верхний правый угол
    // cornerGradient = ctx.createLinearGradient(
    //   size - edgeWidth,
    //   0,
    //   size,
    //   edgeWidth
    // );
    // cornerGradient.addColorStop(0, 'rgb(255, 128, 128)');
    // cornerGradient.addColorStop(1, 'rgb(128, 128, 255)');
    // ctx.fillStyle = cornerGradient;
    // ctx.fillRect(size - edgeWidth, 0, edgeWidth, edgeWidth);

    // // Нижний левый угол
    // cornerGradient = ctx.createLinearGradient(
    //   0,
    //   size - edgeWidth,
    //   edgeWidth,
    //   size
    // );
    // cornerGradient.addColorStop(0, 'rgb(255, 128, 128)');
    // cornerGradient.addColorStop(1, 'rgb(128, 128, 255)');
    // ctx.fillStyle = cornerGradient;
    // ctx.fillRect(0, size - edgeWidth, edgeWidth, edgeWidth);

    // // Нижний правый угол
    // cornerGradient = ctx.createLinearGradient(
    //   size - edgeWidth,
    //   size - edgeWidth,
    //   size,
    //   size
    // );
    // cornerGradient.addColorStop(0, 'rgb(255, 128, 128)');
    // cornerGradient.addColorStop(1, 'rgb(128, 128, 255)');
    // ctx.fillStyle = cornerGradient;
    // ctx.fillRect(size - edgeWidth, size - edgeWidth, edgeWidth, edgeWidth);

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.flipY = false;

    texture.repeat.set(4, 4);

    texture.image = canvas;
    texture.needsUpdate = true;

    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}
