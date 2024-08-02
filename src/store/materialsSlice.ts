import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Material {
  color: string;
  edgeRatio: number;
  edgeSmoothness: number;
  repeat: number;
  roughness: number;
  metalness: number;
}

export interface MaterialsState {
  [id: string]: Material;
}

export const createBaseMaterial = (): Material => ({
  color: '#5F5F89',
  edgeRatio: 0.02,
  edgeSmoothness: 2,
  repeat: 10,
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
      action: PayloadAction<{ id: string; material: Material }>
    ) => {
      const { id, material } = action.payload;
      state[id] = material;
    },
    updateMaterial: (
      state,
      action: PayloadAction<{ id: string; material: Partial<Material> }>
    ) => {
      const { id, material } = action.payload;
      state[id] = { ...state[id], ...material };
    },
    removeMaterial: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state[id];
    },
    updateMaterialColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const { id, color } = action.payload;
      if (state[id]) {
        state[id].color = color;
      }
    },
    updateMaterialEdgeRatio: (
      state,
      action: PayloadAction<{ id: string; edgeRatio: number }>
    ) => {
      const { id, edgeRatio } = action.payload;
      if (state[id]) {
        state[id].edgeRatio = edgeRatio;
      }
    },
    updateMaterialEdgeSmoothness: (
      state,
      action: PayloadAction<{ id: string; edgeSmoothness: number }>
    ) => {
      const { id, edgeSmoothness } = action.payload;
      if (state[id]) {
        state[id].edgeSmoothness = edgeSmoothness;
      }
    },
    updateMaterialTileRepeat: (
      state,
      action: PayloadAction<{ id: string; tileRepeat: number }>
    ) => {
      const { id, tileRepeat } = action.payload;
      if (state[id]) {
        state[id].repeat = tileRepeat;
      }
    },
    updateMaterialTileRoughness: (
      state,
      action: PayloadAction<{ id: string; tileRoughness: number }>
    ) => {
      const { id, tileRoughness } = action.payload;
      if (state[id]) {
        state[id].roughness = tileRoughness;
      }
    },
    updateMaterialTileMetalness: (
      state,
      action: PayloadAction<{ id: string; tileMetalness: number }>
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
  updateMaterialColor,
  updateMaterialEdgeRatio,
  updateMaterialEdgeSmoothness,
  updateMaterialTileRepeat,
  updateMaterialTileRoughness,
  updateMaterialTileMetalness,
} = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;
