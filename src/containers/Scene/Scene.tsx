import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { Surface } from '../../components/Surface';
import { useAppSelector } from '../../store';

export const Scene = () => {
  const environment = useAppSelector((state) => state.application.environment);
  const materials = useAppSelector((state) => state.materials);

  const floorMaterial = materials['floor'];
  const wallsMaterial = materials['walls'];

  return (
    <Canvas style={{ background: '#a333333' }}>
      <Environment preset={environment} background />
      <OrbitControls makeDefault />

      <Surface
        position={new Vector3(0, -2, 0)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
        tile={floorMaterial}
      />

      <Surface
        position={new Vector3(0, 0, -2)}
        rotation={new Euler(0, 0, 0)}
        tile={wallsMaterial}
      />

      <Surface
        position={new Vector3(0, 0, 2)}
        rotation={new Euler(0, Math.PI, 0)}
        tile={wallsMaterial}
      />

      <Surface
        position={new Vector3(-2, 0, 0)}
        rotation={new Euler(0, Math.PI / 2, 0)}
        tile={wallsMaterial}
      />

      <Surface
        position={new Vector3(2, 0, 0)}
        rotation={new Euler(0, -Math.PI / 2, 0)}
        tile={wallsMaterial}
      />
    </Canvas>
  );
};
