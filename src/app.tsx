import { createRoot } from "react-dom/client";
import { Startup, ThemeProvider } from "./lib";

const root = createRoot(document.body);
root.render(
  <ThemeProvider>
    <Startup />
  </ThemeProvider>
);
