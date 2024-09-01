import { useAppSelector } from '../store';
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce.ts';

export const SyncStateWithQuery = () => {
  const state = useAppSelector((state) => state);

  const [debouncedState] = useDebounce([state], 500);

  useEffect(() => {
    const serializedState = encodeURIComponent(JSON.stringify(debouncedState));
    const url = new URL(window.location.href);
    url.searchParams.set('state', serializedState);
    window.history.replaceState(null, '', url.toString());

    console.log('update state url');
  }, [debouncedState]);

  return null;
};
