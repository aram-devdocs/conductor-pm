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
    main: "#2c5e0d", // Deeper, more muted green
    light: "#4a8c1a", // Slightly lighter muted green
    dark: "#1b3a09", // Very dark green, almost black-green
    contrastText: "#f0f0f0", // Soft off-white for better contrast
  },
  secondary: {
    main: "#c4e664", // Softer, less bright yellow-green
    light: "#d6eb8a", // Lighter, more muted yellow-green
    dark: "#8ca63c", // Darker, more subdued green
    contrastText: "#1b3a09", // Dark green for text
  },
  background: {
    default: "#121d0a", // Very dark green, almost black
    paper: "#1b3a09", // Dark green for paper/card backgrounds
  },
  text: {
    primary: "#e0e0e0", // Light gray for primary text for better contrast
    secondary: "#c4e664", // Soft yellow-green for secondary text
    disabled: "#7a7a7a", // Muted gray for disabled text
  },
  divider: "#4a8c1a", // Muted green for dividers
};

const theme = createTheme({
  palette: {
    mode: "light", // Default mode
    ...lightPalette,
  },
  //   typography: {
  //     fontFamily: [
  //       "-apple-system",
  //       "BlinkMacSystemFont",
  //       '"Segoe UI"',
  //       "Roboto",
  //       '"Helvetica Neue"',
  //       "Arial",
  //       "sans-serif",
  //     ].join(","),
  //     htmlFontSize: 16,
  //     h1: { fontSize: "2.5rem", fontWeight: 500 },
  //     h2: { fontSize: "2rem", fontWeight: 500 },
  //     // ... other typography settings
  //   },
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
  //   shadows: [
  //     "none",
  //     "0px 2px 1px -1px rgba(0,0,0,0.2)",
  //     // ... full shadow array up to 24
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   ] as any,
//   components: {
//     MuiAppBar: {
//       defaultProps: {
//         color: "default",
//         variant: "outlined",
//       },
//     },
//     // ... other component overrides
//   },
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
