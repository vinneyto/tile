import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Material {
  pattern: string[][];
  edgeRatio: number;
  edgeSmoothness: number;
  repeat: number;
  roughness: number;
  metalness: number;
}

export interface MaterialsState {
  [id: string]: Material;
}

export const DEFAULT_PATTERN_1X1 = [
  ['#FAEBD7'], // Антиква
];

export const DEFAULT_PATTERN_2X2 = [
  ['#FFEFD5', '#FFF8DC'], // Папайя, Корниш
  ['#F5F5DC', '#FFE4C4'], // Бежевый, Бисквит
];

export const DEFAULT_PATTERN_3X3 = [
  ['#FFFACD', '#E6E6FA', '#F0FFF0'], // Лимонный шифон, Лавандовый, Медовая роса
  ['#F5FFFA', '#F0FFFF', '#F0F8FF'], // Мята, Голубой алис, Голубая лаванда
  ['#FFF5EE', '#FAEBD7', '#FFEFD5'], // Морская ракушка, Антиква, Папайя
];

export const createBaseMaterial = (): Material => ({
  pattern: DEFAULT_PATTERN_3X3,
  edgeRatio: 0.02,
  edgeSmoothness: 2,
  repeat: 4,
  roughness: 0.1,
  metalness: 0.1,
});

const initialState: MaterialsState = {
  floor: createBaseMaterial(),
  walls: createBaseMaterial(),
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    addMaterial: (
      state,
      action: PayloadAction<{ id: string; material: Material }>,
    ) => {
      const { id, material } = action.payload;
      state[id] = material;
    },
    updateMaterial: (
      state,
      action: PayloadAction<{ id: string; material: Partial<Material> }>,
    ) => {
      const { id, material } = action.payload;
      state[id] = { ...state[id], ...material };
    },
    removeMaterial: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state[id];
    },
    updateMaterialPattern: (
      state,
      action: PayloadAction<{ id: string; pattern: string[][] }>,
    ) => {
      const { id, pattern } = action.payload;
      if (state[id]) {
        state[id].pattern = pattern;
      }
    },
    updateMaterialEdgeRatio: (
      state,
      action: PayloadAction<{ id: string; edgeRatio: number }>,
    ) => {
      const { id, edgeRatio } = action.payload;
      if (state[id]) {
        state[id].edgeRatio = edgeRatio;
      }
    },
    updateMaterialEdgeSmoothness: (
      state,
      action: PayloadAction<{ id: string; edgeSmoothness: number }>,
    ) => {
      const { id, edgeSmoothness } = action.payload;
      if (state[id]) {
        state[id].edgeSmoothness = edgeSmoothness;
      }
    },
    updateMaterialTileRepeat: (
      state,
      action: PayloadAction<{ id: string; tileRepeat: number }>,
    ) => {
      const { id, tileRepeat } = action.payload;
      if (state[id]) {
        state[id].repeat = tileRepeat;
      }
    },
    updateMaterialTileRoughness: (
      state,
      action: PayloadAction<{ id: string; tileRoughness: number }>,
    ) => {
      const { id, tileRoughness } = action.payload;
      if (state[id]) {
        state[id].roughness = tileRoughness;
      }
    },
    updateMaterialTileMetalness: (
      state,
      action: PayloadAction<{ id: string; tileMetalness: number }>,
    ) => {
      const { id, tileMetalness } = action.payload;
      if (state[id]) {
        state[id].metalness = tileMetalness;
      }
    },
  },
});

export const {
  addMaterial,
  updateMaterial,
  removeMaterial,
  updateMaterialPattern,
  updateMaterialEdgeRatio,
  updateMaterialEdgeSmoothness,
  updateMaterialTileRepeat,
  updateMaterialTileRoughness,
  updateMaterialTileMetalness,
} = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;
