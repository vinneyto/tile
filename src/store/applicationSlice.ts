import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppMaterialId = 'walls' | 'floor';

export interface ApplicationState {
  environment: PresetsType;
  materialId: AppMaterialId;
}

export const initialState: ApplicationState = {
  environment: 'forest',
  materialId: 'walls',
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setEnvironment: (state, action: PayloadAction<PresetsType>) => {
      state.environment = action.payload;
    },
    setMaterialId: (state, action: PayloadAction<AppMaterialId>) => {
      state.materialId = action.payload;
    },
  },
});

export const { setEnvironment, setMaterialId } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
