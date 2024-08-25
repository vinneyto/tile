import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import { Surface } from '../../components/Surface';
import { useAppSelector } from '../../store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMaterialId } from '../../store/applicationSlice.ts';

export const Scene = () => {
  const environment = useAppSelector((state) => state.application.environment);
  const materials = useAppSelector((state) => state.materials);

  const dispatch = useDispatch();

  const floorMaterial = materials['floor'];
  const wallsMaterial = materials['walls'];

  const onFloorClick = useCallback(() => {
    dispatch(setMaterialId('floor'));
  }, [dispatch]);

  const onWallsClick = useCallback(() => {
    dispatch(setMaterialId('walls'));
  }, [dispatch]);

  return (
    <Canvas style={{ background: '#a333333' }}>
      <Environment preset={environment} background />
      <OrbitControls makeDefault />

      <Surface
        onClick={onFloorClick}
        position={new Vector3(0, -2, 0)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
        tile={floorMaterial}
      />

      <Surface
        onClick={onWallsClick}
        position={new Vector3(0, 0, -2)}
        rotation={new Euler(0, 0, 0)}
        tile={wallsMaterial}
      />

      <Surface
        onClick={onWallsClick}
        position={new Vector3(0, 0, 2)}
        rotation={new Euler(0, Math.PI, 0)}
        tile={wallsMaterial}
      />

      <Surface
        onClick={onWallsClick}
        position={new Vector3(-2, 0, 0)}
        rotation={new Euler(0, Math.PI / 2, 0)}
        tile={wallsMaterial}
      />

      <Surface
        onClick={onWallsClick}
        position={new Vector3(2, 0, 0)}
        rotation={new Euler(0, -Math.PI / 2, 0)}
        tile={wallsMaterial}
      />
    </Canvas>
  );
};
