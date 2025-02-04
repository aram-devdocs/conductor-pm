import { createRoot } from "react-dom/client";
import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider,
  useColorMode,
  ColorModeProvider,
  SPAProvider,
  useSPA,
  SPA,
} from "./lib";
import Layout from "./lib/ui/layout/Layout";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Lazy load screens
const StartupScreen = lazy(() =>
  import("./lib/screens/landing/StartupScreen").then((module) => ({
    default: module.StartupScreen,
  }))
);

const WelcomeScreen = lazy(() =>
  import("./lib/screens/landing/WelcomeScreen").then((module) => ({
    default: module.WelcomeScreen,
  }))
);

const ChatScreen = lazy(() =>
  import("./lib/screens/chat/ChatScreen").then((module) => ({
    default: module.ChatScreen,
  }))
);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <SPAProvider>{children}</SPAProvider>
      </ColorModeProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const { mode } = useColorMode();
  const { showLayout, registerScreen } = useSPA();

  // Register screens
  React.useEffect(() => {
    // Register starting points
    registerScreen("welcome", WelcomeScreen, "Welcome", true);
    registerScreen("chat", ChatScreen, "Chat", true);

    // Register regular screens
    registerScreen("startup", StartupScreen, "Getting Started");
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
