import { configureStore } from '@reduxjs/toolkit';
import { materialsReducer } from './materialsSlice';
import { applicationReducer } from './applicationSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    materials: materialsReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
