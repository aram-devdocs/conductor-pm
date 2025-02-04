import { createTheme } from "@mui/material/styles";

// Light mode palette
// Accessible and complementary colors based on Olive Green (#3d550c),
// Lime Green (#81b622), Yellow Green (#ecf87f), Green (#59981a)
const lightPalette = {
  primary: {
    main: "#81b622", // Lime Green
    light: "#ecf87f", // Yellow Green
    dark: "#59981a", // Green
    contrastText: "#000000",
  },
  secondary: {
    main: "#3d550c", // Olive Green
    light: "#81b622", // Lime Green
    dark: "#1b2a06", // Darkened Olive Green for contrast
    contrastText: "#ffffff",
  },
  background: {
    default: "#f0f7e8", // Light green tint
    paper: "#ffffff",
  },
  text: {
    primary: "#1b2a06", // Darkened Olive Green for readability
    secondary: "#3d550c", // Olive Green
    disabled: "#adb5bd",
  },
  divider: "#81b622", // Lime Green
};

// Dark mode palette
// Accessible and complementary colors based on Olive Green (#3d550c),
// Lime Green (#81b622), Yellow Green (#ecf87f), Green (#59981a)
const darkPalette = {
  primary: {
    main: "#59981a", // Green
    light: "#81b622", // Lime Green
    dark: "#1b2a06", // Darkened Olive Green
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#ecf87f", // Yellow Green
    light: "#f5ffd7", // Lightened Yellow Green for contrast
    dark: "#81b622", // Lime Green
    contrastText: "#000000",
  },
  background: {
    default: "#1b2a06", // Darkened Olive Green
    paper: "#3d550c", // Olive Green
  },
  text: {
    primary: "#ffffff",
    secondary: "#ecf87f", // Yellow Green
    disabled: "#adb5bd",
  },
  divider: "#59981a", // Green
};

const theme = createTheme({
  palette: {
    mode: "light", // Default mode
    ...lightPalette,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    htmlFontSize: 16,
    h1: { fontSize: "2.5rem", fontWeight: 500 },
    h2: { fontSize: "2rem", fontWeight: 500 },
    // ... other typography settings
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2)",
    // ... full shadow array up to 24
    /* eslint-disable @typescript-eslint/no-explicit-any */
  ] as any,
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "default",
        variant: "outlined",
      },
    },
    // ... other component overrides
  },
  // Responsive breakpoints for media queries
  // ref: https://mui.com/material-ui/customization/breakpoints/
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Create dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    ...darkPalette,
  },
  /* eslint-disable @typescript-eslint/no-explicit-any */
  shadows: Array(25).fill("none") as any,
});

// Create light theme variant
export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: "light",
    ...lightPalette,
  },
});

// Type augmentation for theme customization
// ref: https://mui.com/material-ui/customization/theming/#custom-variables
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export default theme;
