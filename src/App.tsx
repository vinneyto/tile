import { Layout, Slider, Row, Col, ColorPicker, Select } from 'antd';
import { Vector2 } from 'three';
import { Scene } from './features/Scene';
import { useState } from 'react';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';

const { Sider, Content } = Layout;

const environments = [
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

export const App = () => {
  const [environment, setEnvironment] = useState<PresetsType>('forest');
  const [color, setColor] = useState('#5F5F89');
  const [edgeRatio, setEdgeRatio] = useState(0.02);
  const [edgeSmoothness, setEdgeSmoothness] = useState(2);
  const [tileRepeat, setTileRepeat] = useState(10);
  const [tileRoughness, setTileRoughness] = useState(0.1);
  const [tileMetalness, setTileMetalness] = useState(0.1);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Scene
          env={environment}
          tileEdgeRatio={edgeRatio}
          tileEdgeSmoothness={edgeSmoothness}
          tileRepeat={new Vector2(tileRepeat, tileRepeat)}
          tileColor={color}
          tileRoughness={tileRoughness}
          tileMetalness={tileMetalness}
        />
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
                onChange={(value: PresetsType) => setEnvironment(value)}
              >
                {environments.map((env) => (
                  <Select.Option key={env} value={env}>
                    {env.charAt(0).toUpperCase() + env.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <label>Color:</label>
            </Col>
            <Col span={16}>
              <ColorPicker
                value={color}
                onChange={(c) => setColor(c.toHexString())}
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
                value={edgeRatio}
                onChange={setEdgeRatio}
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
                value={edgeSmoothness}
                onChange={setEdgeSmoothness}
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
                value={tileRepeat}
                onChange={setTileRepeat}
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
                value={tileRoughness}
                onChange={setTileRoughness}
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
                value={tileMetalness}
                onChange={setTileMetalness}
              />
            </Col>
          </Row>
        </div>
      </Sider>
    </Layout>
  );
};
