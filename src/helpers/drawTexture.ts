import { Vector3 } from 'three';

function vectorToRGBNormal(vector: Vector3): string {
  const convert = (component: number) => (component + 1) * 0.5 * 255;

  const r = Math.round(convert(vector.x));
  const g = Math.round(convert(vector.y));
  const b = Math.round(convert(vector.z));

  return `rgb(${r}, ${g}, ${b})`;
}

export function drawTileNormalMap(
  ctx: CanvasRenderingContext2D,
  size: number,
  padding: number,
  edgeSmoothness: number
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
    c2: string
  ) => {
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
  };

  addGradientColorStops(
    gradients.top,
    vectorToRGBNormal(new Vector3(0, 1, edgeSmoothness).normalize()),
    vectorToRGBNormal(new Vector3(0, 0, 1))
  );

  addGradientColorStops(
    gradients.bottom,
    vectorToRGBNormal(new Vector3(0, 0, 1)),
    vectorToRGBNormal(new Vector3(0, -1, edgeSmoothness).normalize())
  );

  addGradientColorStops(
    gradients.left,
    vectorToRGBNormal(new Vector3(-1, 0, edgeSmoothness).normalize()),
    vectorToRGBNormal(new Vector3(0, 0, 1))
  );

  addGradientColorStops(
    gradients.right,
    vectorToRGBNormal(new Vector3(0, 0, 1)),
    vectorToRGBNormal(new Vector3(1, 0, edgeSmoothness).normalize())
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
