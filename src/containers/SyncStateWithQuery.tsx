import { useAppSelector } from '../store';
import { useEffect } from 'react';

export const SyncStateWithQuery = () => {
  const state = useAppSelector((state) => state);

  useEffect(() => {
    const serializedState = encodeURIComponent(JSON.stringify(state));
    const url = new URL(window.location.href);
    url.searchParams.set('state', serializedState);
    window.history.replaceState(null, '', url.toString());
  }, [state]);

  return null;
};
