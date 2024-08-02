import { Environment, OrbitControls } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Canvas } from '@react-three/fiber';

export interface SceneProps {
  env: PresetsType;
  children?: React.ReactNode;
}

export function Scene({ env, children }: SceneProps) {
  return (
    <Canvas style={{ background: '#333333' }}>
      <Environment preset={env} background />
      <OrbitControls makeDefault />
      {children}
    </Canvas>
  );
}
