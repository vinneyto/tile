import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import { Surface } from '../../components/Surface';
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { setMaterialId } from '../../store/applicationSlice.ts';
import { useTap } from '../../hooks/useTap.ts';

export const Scene = () => {
  const environment = useAppSelector((state) => state.application.environment);
  const materials = useAppSelector((state) => state.materials);

  const dispatch = useDispatch();

  const floorMaterial = materials['floor'];
  const wallsMaterial = materials['walls'];

  const floorTap = useTap(() => {
    dispatch(setMaterialId('floor'));
  }, [dispatch]);

  const wallsTap = useTap(() => {
    dispatch(setMaterialId('walls'));
  }, [dispatch]);

  return (
    <Canvas style={{ background: '#a333333' }}>
      <Environment preset={environment} background />
      <OrbitControls makeDefault />

      <Surface
        {...floorTap}
        position={new Vector3(0, -2, 0)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
        tile={floorMaterial}
      />

      <group {...wallsTap}>
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
      </group>
    </Canvas>
  );
};
