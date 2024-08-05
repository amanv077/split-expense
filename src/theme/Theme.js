import { createTheme } from "@mui/material/styles";
import { darkScrollbar } from "@mui/material";

// Define a spacing scale
const spacing = 8;

const Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          ...(themeParam.palette.mode === "dark" ? darkScrollbar() : {}),
          margin: 0,
          padding: 0,
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          backgroundColor:
            themeParam.palette.mode === "dark" ? "#121212" : "#F5F5F5",
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: spacing,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: spacing,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    // Add more component overrides as needed
  },
  palette: {
    mode: "light",
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#00DDFF", // Deep Teal
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#fff685", // Gold
      contrastText: "#000000",
    },
    error: {
      main: "#D32F2F", // Red
    },
    warning: {
      main: "#FFA000", // Amber
    },
    info: {
      main: "#0288D1", // Light Blue
    },
    success: {
      main: "#388E3C", // Green
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  spacing,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default Theme;
