import React, { Suspense } from 'react';
import { useSPA } from '../contexts/SPAContext';
import { CircularProgress, Stack } from '../ui';

const LoadingFallback = () => (
  <Stack 
    justifyContent="center" 
    alignItems="center" 
    sx={{ minHeight: '100vh' }}
  >
    <CircularProgress />
  </Stack>
);

export const SPA: React.FC = () => {
  const { currentScreen, screens } = useSPA();
  
  const CurrentScreen = screens[currentScreen]?.component;
  const screenProps = screens[currentScreen]?.props || {};

  if (!CurrentScreen) {
    return <div>Screen not found</div>;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <CurrentScreen {...screenProps} />
    </Suspense>
  );
}; 