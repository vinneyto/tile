import { Vector3 } from 'three';

function vectorToRGBNormal(vector: Vector3): string {
  const convert = (component: number) => (component + 1) * 0.5 * 255;

  const r = Math.round(convert(vector.x));
  const g = Math.round(convert(vector.y));
  const b = Math.round(convert(vector.z));

  return `rgb(${r}, ${g}, ${b})`;
}

function drawTileNormal(
  ctx: CanvasRenderingContext2D,
  size: number,
  padding: number,
  edgeSmoothness: number,
) {
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  const gradients = {
    top: ctx.createLinearGradient(0, 0, 0, padding),
    bottom: ctx.createLinearGradient(0, size - padding, 0, size),
    left: ctx.createLinearGradient(0, 0, padding, 0),
    right: ctx.createLinearGradient(size - padding, 0, size, 0),
  };

  const addGradientColorStops = (
    gradient: CanvasGradient,
    c1: string,
    c2: string,
  ) => {
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
  };

  addGradientColorStops(
    gradients.top,
    vectorToRGBNormal(new Vector3(0, 1, edgeSmoothness).normalize()),
    vectorToRGBNormal(new Vector3(0, 0, 1)),
  );

  addGradientColorStops(
    gradients.bottom,
    vectorToRGBNormal(new Vector3(0, 0, 1)),
    vectorToRGBNormal(new Vector3(0, -1, edgeSmoothness).normalize()),
  );

  addGradientColorStops(
    gradients.left,
    vectorToRGBNormal(new Vector3(-1, 0, edgeSmoothness).normalize()),
    vectorToRGBNormal(new Vector3(0, 0, 1)),
  );

  addGradientColorStops(
    gradients.right,
    vectorToRGBNormal(new Vector3(0, 0, 1)),
    vectorToRGBNormal(new Vector3(1, 0, edgeSmoothness).normalize()),
  );

  ctx.fillStyle = gradients.top;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size - padding, padding);
  ctx.lineTo(padding, padding);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = gradients.bottom;
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(padding, size - padding);
  ctx.lineTo(size - padding, size - padding);
  ctx.lineTo(size, size);
  ctx.fill();

  ctx.fillStyle = gradients.left;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(padding, padding);
  ctx.lineTo(padding, size - padding);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = gradients.right;
  ctx.beginPath();
  ctx.moveTo(size, 0);
  ctx.lineTo(size, size);
  ctx.lineTo(size - padding, size - padding);
  ctx.lineTo(size - padding, padding);
  ctx.closePath();
  ctx.fill();
}

export function drawTileNormalPatternMap(
  ctx: CanvasRenderingContext2D,
  size: number,
  padding: number,
  edgeSmoothness: number,
  dimension: number,
) {
  const tileSize = size / dimension;
  const tileScale = 1 / dimension;

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      ctx.save();

      ctx.translate(i * tileSize, j * tileSize);
      ctx.scale(tileScale, tileScale);

      drawTileNormal(ctx, size, padding, edgeSmoothness);

      ctx.restore();
    }
  }
}

export function drawTileColorPatternMap(
  ctx: CanvasRenderingContext2D,
  colors: string[],
  dimension: number,
) {
  const tileSize = ctx.canvas.width / dimension;

  let colorIndex = 0;

  for (let row = 0; row < dimension; row++) {
    for (let col = 0; col < dimension; col++) {
      ctx.fillStyle = colors[colorIndex] || colors[colors.length - 1];
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

      colorIndex++;
    }
  }
}
