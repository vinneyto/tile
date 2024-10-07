import { Environment, OrbitControls, Gltf } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import { Surface } from '../../components/Surface';
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { setMaterialId } from '../../store/applicationSlice.ts';
import { useTap } from '../../hooks/useTap.ts';
import { useSelectAnimation } from '../../hooks/useSelectAnimation.ts';

const WALLS: Array<{ position: Vector3; rotation: Euler }> = [
  { position: new Vector3(0, 0, -2), rotation: new Euler(0, 0, 0) },
  { position: new Vector3(0, 0, 2), rotation: new Euler(0, Math.PI, 0) },
  { position: new Vector3(-2, 0, 0), rotation: new Euler(0, Math.PI / 2, 0) },
  { position: new Vector3(2, 0, 0), rotation: new Euler(0, -Math.PI / 2, 0) },
];

export const Scene = () => {
  const environment = useAppSelector((state) => state.application.environment);
  const materials = useAppSelector((state) => state.materials);

  const dispatch = useDispatch();

  const floorMaterial = materials['floor'];
  const wallsMaterial = materials['walls'];

  const [floorSelectionOpacity, selectFloor] = useSelectAnimation();
  const [wallsSelectionOpacity, selectWalls] = useSelectAnimation();

  const floorTap = useTap(() => {
    dispatch(setMaterialId('floor'));
    selectFloor();
  }, [dispatch]);

  const wallsTap = useTap(() => {
    dispatch(setMaterialId('walls'));
    selectWalls();
  }, [dispatch]);

  return (
    <Canvas style={{ background: '#a333333' }}>
      <Environment preset={environment} background />
      <OrbitControls makeDefault />

      {/* "Bath" (https://skfb.ly/6nBOF) by Henry VIII is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). */}
      <Gltf
        src="/bath.glb"
        scale={0.018}
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, -0.85, -1]}
      />

      {/* "Toilet" (https://skfb.ly/6S9CM) by HippoStance is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). */}
      <Gltf
        src="/toilet.glb"
        scale={1.5}
        rotation={[0, -Math.PI / 2, 0]}
        position={[2, -2, 0.8]}
      />

      {/* "Simple Sink" (https://skfb.ly/6RrqF) by Andrew.Mischenko is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). */}
      <Gltf
        src="/sink.glb"
        scale={0.015}
        // scale={1.5}
        // rotation={[0, -Math.PI / 2, 0]}
        position={[-1.7, -1, 0.8]}
      />

      <Surface
        {...floorTap}
        position={new Vector3(0, -2, 0)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
        tile={floorMaterial}
        selectionOpacity={floorSelectionOpacity}
      />

      <group {...wallsTap}>
        {WALLS.map((wall, index) => (
          <Surface
            key={index}
            position={wall.position}
            rotation={wall.rotation}
            tile={wallsMaterial}
            selectionOpacity={wallsSelectionOpacity}
          />
        ))}
      </group>
    </Canvas>
  );
};
