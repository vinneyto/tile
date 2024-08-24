import { configureStore } from '@reduxjs/toolkit';
import { materialsReducer, MaterialsState } from './materialsSlice';
import { applicationReducer, ApplicationState } from './applicationSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export interface RootState {
  materials: MaterialsState;
  application: ApplicationState;
}

const deserializeState = () => {
  const url = new URL(window.location.href);
  const serializedState = url.searchParams.get('state');

  if (serializedState) {
    try {
      return JSON.parse(decodeURIComponent(serializedState)) as RootState;
    } catch (error) {
      console.warn('Failed to deserialize state:', error);
    }
  }

  return undefined;
};

export const store = configureStore<RootState>({
  reducer: {
    materials: materialsReducer,
    application: applicationReducer,
  },
  preloadedState: deserializeState(),
});

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
