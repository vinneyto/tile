import { Layout, Slider, Row, Col, ColorPicker, Select, Divider } from 'antd';
import { Scene } from './features/Scene';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Surface } from './features/Surface';
import { Euler, Vector3 } from 'three';
import { useAppSelector } from './store';
import { useDispatch } from 'react-redux';
import {
  AppMaterialId,
  setEnvironment,
  setMaterialId,
} from './store/applicationSlice';
import {
  updateMaterialColor,
  updateMaterialEdgeRatio,
  updateMaterialEdgeSmoothness,
  updateMaterialTileMetalness,
  updateMaterialTileRepeat,
  updateMaterialTileRoughness,
} from './store/materialsSlice';

const { Sider, Content } = Layout;

const ENVIRONMENTS_LIST = [
  'sunset',
  'dawn',
  'night',
  'warehouse',
  'forest',
  'apartment',
  'studio',
  'city',
  'park',
  'lobby',
];

const MATERIALS_LIST = ['floor', 'walls'];

export const App = () => {
  const { environment, materialId } = useAppSelector(
    (state) => state.application
  );

  const materials = useAppSelector((state) => state.materials);

  const material = materials[materialId];
  const floorMaterial = materials['floor'];
  const wallsMaterial = materials['walls'];

  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Scene env={environment}>
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
        </Scene>
      </Content>
      <Sider width={300} theme="light">
        <div style={{ padding: '24px' }}>
          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Env:</label>
            </Col>
            <Col span={16}>
              <Select
                defaultValue={environment}
                style={{ width: '100%' }}
                onChange={(value: PresetsType) =>
                  dispatch(setEnvironment(value))
                }
              >
                {ENVIRONMENTS_LIST.map((env) => (
                  <Select.Option key={env} value={env}>
                    {env.charAt(0).toUpperCase() + env.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Material:</label>
            </Col>
            <Col span={16}>
              <Select
                defaultValue={materialId}
                style={{ width: '100%' }}
                onChange={(value: AppMaterialId) =>
                  dispatch(setMaterialId(value))
                }
              >
                {MATERIALS_LIST.map((env) => (
                  <Select.Option key={env} value={env}>
                    {env.charAt(0).toUpperCase() + env.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Divider />

          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Color:</label>
            </Col>
            <Col span={16}>
              <ColorPicker
                value={material.color}
                onChange={(c) =>
                  dispatch(
                    updateMaterialColor({
                      id: materialId,
                      color: c.toHexString(),
                    })
                  )
                }
              />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Edge:</label>
            </Col>
            <Col span={16}>
              <Slider
                min={0.001}
                max={0.1}
                step={0.001}
                value={material.edgeRatio}
                onChange={(edgeRatio) =>
                  dispatch(
                    updateMaterialEdgeRatio({ id: materialId, edgeRatio })
                  )
                }
              />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Smooth:</label>
            </Col>
            <Col span={16}>
              <Slider
                min={0}
                max={20}
                step={1}
                value={material.edgeSmoothness}
                onChange={(edgeSmoothness) =>
                  dispatch(
                    updateMaterialEdgeSmoothness({
                      id: materialId,
                      edgeSmoothness,
                    })
                  )
                }
              />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Repeat:</label>
            </Col>
            <Col span={16}>
              <Slider
                min={2}
                max={20}
                step={1}
                value={material.repeat}
                onChange={(tileRepeat) =>
                  dispatch(
                    updateMaterialTileRepeat({ id: materialId, tileRepeat })
                  )
                }
              />
            </Col>
          </Row>

          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Roughness:</label>
            </Col>
            <Col span={16}>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={material.roughness}
                onChange={(tileRoughness) =>
                  dispatch(
                    updateMaterialTileRoughness({
                      id: materialId,
                      tileRoughness,
                    })
                  )
                }
              />
            </Col>
          </Row>

          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Metalness:</label>
            </Col>
            <Col span={16}>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={material.metalness}
                onChange={(tileMetalness) =>
                  dispatch(
                    updateMaterialTileMetalness({
                      id: materialId,
                      tileMetalness,
                    })
                  )
                }
              />
            </Col>
          </Row>
        </div>
      </Sider>
    </Layout>
  );
};
