import { createTheme, PaletteOptions } from "@mui/material";

// Light palette
const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  secondary: {
    main: "#9c27b0",
    light: "#ba68c8",
    dark: "#7b1fa2",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

// Dark palette
const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
  },
  secondary: {
    main: "#ce93d8",
    light: "#f3e5f5",
    dark: "#ab47bc",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
};

// Theme configuration
const getTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    shape: {
      borderRadius: 8,
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
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: "all 0.3s ease-in-out",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
    },
  });
};

export default getTheme;
