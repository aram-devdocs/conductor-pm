import { createRoot } from "react-dom/client";
import { Startup, ThemeProvider, useColorMode, ColorModeProvider } from "./lib";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ColorModeProvider>{children}</ColorModeProvider>;
};

const App = () => {
  const { mode } = useColorMode();

  return (
    <ThemeProvider mode={mode}>
      <Startup />
    </ThemeProvider>
  );
};

const root = createRoot(document.body);
root.render(
  <ContextWrapper>
    <App />
  </ContextWrapper>
);
