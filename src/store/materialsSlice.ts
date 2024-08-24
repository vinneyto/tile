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
  ['#F4E1D2'], // Мягкий кремовый
];

export const DEFAULT_PATTERN_2X2 = [
  ['#F4E1D2', '#ECD5C4'], // Мягкие постельные тона: кремовый, светло-коричневый
  ['#EFEAD8', '#D3C5B3'], // Светлый желтоватый и светло-серый
];

export const DEFAULT_PATTERN_3X3 = [
  ['#F4E1D2', '#ECD5C4', '#D8BFAA'], // Мягкие постельные тона: кремовый, светло-коричневый, бежевый
  ['#EFEAD8', '#D3C5B3', '#B8ADA7'], // Светлый желтоватый, светло-серый, светло-розовый
  ['#D9D4CF', '#C2BAB6', '#AFAA9C'], // Светлый серо-бежевый, теплый сероватый, оливковый
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
