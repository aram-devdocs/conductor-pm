import React, { Suspense } from 'react';
import { useSPA } from '../contexts/SPAContext';
import { CircularProgress, Stack, Box } from '../ui';

const LoadingFallback = () => (
  <Stack 
    justifyContent="center" 
    alignItems="center" 
    sx={{ height: '100%' }}
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<LoadingFallback />}>
        <CurrentScreen {...screenProps} />
      </Suspense>
    </Box>
  );
}; 