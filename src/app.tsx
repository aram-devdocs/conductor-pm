import { createRoot } from "react-dom/client";
import { Startup, ThemeProvider, useColorMode, ColorModeProvider } from "./lib";
import Layout from './lib/ui/layout/Layout';

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ColorModeProvider>{children}</ColorModeProvider>;
};

const App = () => {
  const { mode } = useColorMode();

  return (
    <ThemeProvider mode={mode}>
      <Layout>
        <Startup />
      </Layout>
    </ThemeProvider>
  );
};

const root = createRoot(document.body);
root.render(
  <ContextWrapper>
    <App />
  </ContextWrapper>
);
