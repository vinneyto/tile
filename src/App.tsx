import { Environment, OrbitControls } from '@react-three/drei';
import { MaterialViewer } from './features/MaterialViewer';
import { useTileNormalTexture } from './hooks/useTileNormalTexture';

function App() {
  const tileNormalTexture = useTileNormalTexture();

  return (
    <>
      <Environment preset="sunset" background />
      <OrbitControls makeDefault />
      <MaterialViewer normalMap={tileNormalTexture} />
    </>
  );
}

export default App;
