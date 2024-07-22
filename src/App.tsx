import {
  MeshWobbleMaterial,
  OrbitControls,
  Sphere,
  useNormalTexture,
  useTexture,
} from '@react-three/drei';
import { MaterialViewer } from './features/MaterialViewer';
import { useTileNormalTexture } from './hooks/useTileNormalTexture';
// import { useTileNormalTexture } from './hooks/useTileNormalTexture';

function ShinyBall() {
  const [normalMap] = useNormalTexture(
    1, // Индекс текстуры в коллекции drei
    { anisotropy: 8 }
  );

  return (
    <Sphere visible args={[1, 64, 64]} scale={2}>
      <MeshWobbleMaterial
        attach="material"
        color="#f3f3f3"
        factor={0.6} // Интенсивность "волны"
        speed={1} // Скорость "волны"
        bumpMap={normalMap}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
}

function App() {
  const tileNormalTexture = useTileNormalTexture();
  // const tileNormalTexture = useTexture('/9548-normal.jpg');
  // const [tileNormalTexture] = useNormalTexture(
  //   1, // index of the normal texture - https://github.com/emmelleppi/normal-maps/blob/master/normals.json
  //   // second argument is texture attributes
  //   {
  //     offset: [0, 0],
  //     anisotropy: 8,
  //   }
  // );

  return (
    <>
      <OrbitControls makeDefault />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <pointLight position={[0, 0, 10]} decay={0} intensity={Math.PI / 2}>
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </pointLight>

      <MaterialViewer normalMap={tileNormalTexture} />

      {/* <ShinyBall /> */}
    </>
  );
}

export default App;
