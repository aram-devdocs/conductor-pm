import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./createTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
  mode?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  mode = "light",
}) => {
  const themeToUse = mode === "dark" ? darkTheme : lightTheme;
  return <MuiThemeProvider theme={themeToUse}>{children}</MuiThemeProvider>;
};
