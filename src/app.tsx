import { createRoot } from "react-dom/client";
import React, { lazy } from "react";
import {
  ThemeProvider,
  useColorMode,
  ColorModeProvider,
  SPAProvider,
  useSPA,
  SPA,
} from "./lib";
import Layout from "./lib/ui/layout/Layout";

// Lazy load screens
const StartupScreen = lazy(() =>
  import("./lib/screens/Startup").then((module) => ({
    default: module.StartupScreen,
  }))
);

const WelcomeScreen = lazy(() =>
  import("./lib/screens/Welcome").then((module) => ({
    default: module.WelcomeScreen,
  }))
);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ColorModeProvider>
      <SPAProvider>{children}</SPAProvider>
    </ColorModeProvider>
  );
};

const AppContent = () => {
  const { mode } = useColorMode();
  const { showLayout, registerScreen } = useSPA();

  // Register screens
  React.useEffect(() => {
    registerScreen("welcome", WelcomeScreen);
    registerScreen("startup", StartupScreen);
  }, [registerScreen]);

  return (
    <ThemeProvider mode={mode}>
      {showLayout ? (
        <Layout>
          <SPA />
        </Layout>
      ) : (
        <SPA />
      )}
    </ThemeProvider>
  );
};

const root = createRoot(document.body);
root.render(
  <ContextWrapper>
    <AppContent />
  </ContextWrapper>
);
