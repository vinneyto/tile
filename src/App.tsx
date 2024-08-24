import { Divider, Layout, Select, Slider } from 'antd';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useAppSelector } from './store';
import { useDispatch } from 'react-redux';
import {
  AppMaterialId,
  setEnvironment,
  setMaterialId,
} from './store/applicationSlice';
import {
  DEFAULT_PATTERN_1X1,
  DEFAULT_PATTERN_2X2,
  DEFAULT_PATTERN_3X3,
  updateMaterialEdgeRatio,
  updateMaterialEdgeSmoothness,
  updateMaterialPattern,
  updateMaterialTileMetalness,
  updateMaterialTileRepeat,
  updateMaterialTileRoughness,
} from './store/materialsSlice';
import cl from './App.module.css';
import { SidebarItem } from './components/UI/SidebarItem/SidebarItem';
import { Scene } from './containers/Scene';
import { TilePatternEditor } from './components/TilePatternEditor';
import { SyncStateWithQuery } from './containers/SyncStateWithQuery.tsx';

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

const TILE_PATTERN_SIZE_LIST = ['1x1', '2x2', '3x3'];

const TILE_PATTERN_MAP = {
  '1x1': DEFAULT_PATTERN_1X1,
  '2x2': DEFAULT_PATTERN_2X2,
  '3x3': DEFAULT_PATTERN_3X3,
};

const MATERIALS_LIST = ['floor', 'walls'];

export const App = () => {
  const { environment, materialId } = useAppSelector(
    (state) => state.application,
  );

  const materials = useAppSelector((state) => state.materials);

  const material = materials[materialId];

  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SyncStateWithQuery />

      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Scene />
      </Content>
      <Sider width={300} theme="light" className={cl.sidebar}>
        <SidebarItem name="Env">
          <Select
            defaultValue={environment}
            style={{ width: '100%' }}
            onChange={(value: PresetsType) => dispatch(setEnvironment(value))}
          >
            {ENVIRONMENTS_LIST.map((env) => (
              <Select.Option key={env} value={env}>
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </SidebarItem>

        <SidebarItem name="Material">
          <Select
            defaultValue={materialId}
            style={{ width: '100%' }}
            onChange={(value: AppMaterialId) => dispatch(setMaterialId(value))}
          >
            {MATERIALS_LIST.map((env) => (
              <Select.Option key={env} value={env}>
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </SidebarItem>

        <Divider />

        <SidebarItem name="Pattern">
          <Select
            defaultValue="3x3"
            style={{ width: '100%' }}
            onChange={(value: keyof typeof TILE_PATTERN_MAP) => {
              dispatch(
                updateMaterialPattern({
                  id: materialId,
                  pattern: TILE_PATTERN_MAP[value],
                }),
              );
            }}
          >
            {TILE_PATTERN_SIZE_LIST.map((size) => (
              <Select.Option key={size} value={size}>
                {size}
              </Select.Option>
            ))}
          </Select>
        </SidebarItem>

        <SidebarItem name="Color">
          <TilePatternEditor
            pattern={material.pattern}
            onChangePattern={(pattern) =>
              dispatch(
                updateMaterialPattern({
                  id: materialId,
                  pattern,
                }),
              )
            }
          />
        </SidebarItem>

        <SidebarItem name="Edge">
          <Slider
            min={0.001}
            max={0.1}
            step={0.001}
            value={material.edgeRatio}
            onChange={(edgeRatio) =>
              dispatch(updateMaterialEdgeRatio({ id: materialId, edgeRatio }))
            }
          />
        </SidebarItem>

        <SidebarItem name="Smooth">
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
                }),
              )
            }
          />
        </SidebarItem>

        <SidebarItem name="Repeat">
          <Slider
            min={2}
            max={20}
            step={1}
            value={material.repeat}
            onChange={(tileRepeat) =>
              dispatch(updateMaterialTileRepeat({ id: materialId, tileRepeat }))
            }
          />
        </SidebarItem>

        <SidebarItem name="Roughness">
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
                }),
              )
            }
          />
        </SidebarItem>

        <SidebarItem name="Metalness">
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
                }),
              )
            }
          />
        </SidebarItem>
      </Sider>
    </Layout>
  );
};
