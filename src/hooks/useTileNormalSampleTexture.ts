import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function useTileNormalSampleTexture() {
  const texturePath = '/9548-normal.jpg';
  const texture = useLoader(TextureLoader, texturePath);
  return texture;
}
