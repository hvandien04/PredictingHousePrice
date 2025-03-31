import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1f36",
      secondary: "#67748e",
    },
    primary: {
      main: "#1a73e8",
      light: "#4285f4",
      dark: "#1557b0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7b1fa2",
      light: "#9c27b0",
      dark: "#6a1b9a",
      contrastText: "#ffffff",
    },
    info: {
      main: "#17c1e8",
      light: "#3abff8",
      dark: "#0c99c6",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2dce89",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fb8c00",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    light: {
      main: "#e9ecef",
      light: "#f8f9fa",
      dark: "#dee2e6",
      contrastText: "#1a1f36",
    },
    dark: {
      main: "#344767",
      light: "#495057",
      dark: "#212529",
      contrastText: "#ffffff",
    },
    grey: {
      50: "#f8f9fa",
      100: "#f1f3f5",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0.5,
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.1)",
    "0 4px 8px rgba(0,0,0,0.1)",
    "0 8px 16px rgba(0,0,0,0.1)",
    "0 16px 32px rgba(0,0,0,0.1)",
    "0 32px 64px rgba(0,0,0,0.1)",
    "0 64px 128px rgba(0,0,0,0.1)",
    "0 128px 256px rgba(0,0,0,0.1)",
    "0 256px 512px rgba(0,0,0,0.1)",
    "0 512px 1024px rgba(0,0,0,0.1)",
    "0 1024px 2048px rgba(0,0,0,0.1)",
    "0 2048px 4096px rgba(0,0,0,0.1)",
    "0 4096px 8192px rgba(0,0,0,0.1)",
    "0 8192px 16384px rgba(0,0,0,0.1)",
    "0 16384px 32768px rgba(0,0,0,0.1)",
    "0 32768px 65536px rgba(0,0,0,0.1)",
    "0 65536px 131072px rgba(0,0,0,0.1)",
    "0 131072px 262144px rgba(0,0,0,0.1)",
    "0 262144px 524288px rgba(0,0,0,0.1)",
    "0 524288px 1048576px rgba(0,0,0,0.1)",
    "0 1048576px 2097152px rgba(0,0,0,0.1)",
    "0 2097152px 4194304px rgba(0,0,0,0.1)",
    "0 4194304px 8388608px rgba(0,0,0,0.1)",
    "0 8388608px 16777216px rgba(0,0,0,0.1)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
  functions: {
    linearGradient: (color, colorState, angle = 195) => {
      return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
    },
  },
  borders: {
    borderRadius: {
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
      xxl: "1.5rem",
      section: "160px",
    },
  },
  boxShadows: {
    xs: "0 2px 4px rgba(0,0,0,0.1)",
    sm: "0 4px 8px rgba(0,0,0,0.1)",
    md: "0 8px 16px rgba(0,0,0,0.1)",
    lg: "0 16px 32px rgba(0,0,0,0.1)",
    xl: "0 32px 64px rgba(0,0,0,0.1)",
    xxl: "0 64px 128px rgba(0,0,0,0.1)",
    inset: "inset 0 2px 4px rgba(0,0,0,0.1)",
    colored: {
      primary: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(26, 115, 232, 0.4)",
      secondary: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(123, 31, 162, 0.4)",
      info: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(23, 193, 232, 0.4)",
      success: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(45, 206, 137, 0.4)",
      warning: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(251, 140, 0, 0.4)",
      error: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4)",
      light: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 236, 239, 0.4)",
      dark: "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(52, 71, 103, 0.4)",
    },
  },
}); 