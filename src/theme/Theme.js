import { createTheme } from "@mui/material/styles";

// Apple-inspired Premium Minimal Theme for Splitify
const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0071e3",
      light: "#2997ff",
      dark: "#0058b0",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1d1d1f",
      secondary: "#86868b",
    },
    success: {
      main: "#34c759",
      light: "#4cd964",
      dark: "#28a745",
    },
    error: {
      main: "#ff3b30",
      light: "#ff6961",
      dark: "#d63031",
    },
    warning: {
      main: "#ff9500",
      light: "#ffb340",
      dark: "#e68600",
    },
    info: {
      main: "#0071e3",
      light: "#2997ff",
      dark: "#0058b0",
    },
    grey: {
      50: "#fbfbfd",
      100: "#f5f5f7",
      200: "#e8e8ed",
      300: "#d2d2d7",
      400: "#aeaeb2",
      500: "#86868b",
      600: "#6e6e73",
      700: "#48484a",
      800: "#2c2c2e",
      900: "#1d1d1f",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "-0.005em",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "-0.011em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "-0.006em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      letterSpacing: "0",
      color: "#86868b",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "-0.006em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0, 0, 0, 0.04)",
    "0 2px 6px rgba(0, 0, 0, 0.04)",
    "0 4px 12px rgba(0, 0, 0, 0.05)",
    "0 8px 24px rgba(0, 0, 0, 0.06)",
    "0 12px 36px rgba(0, 0, 0, 0.08)",
    "0 16px 48px rgba(0, 0, 0, 0.1)",
    ...Array(18).fill("0 16px 48px rgba(0, 0, 0, 0.1)"),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
          backgroundColor: "#ffffff",
          color: "#1d1d1f",
        },
        "::selection": {
          backgroundColor: "rgba(0, 113, 227, 0.2)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 980, // Pill shape
          padding: "12px 24px",
          fontWeight: 400,
          fontSize: "0.9375rem",
          boxShadow: "none",
          letterSpacing: "-0.01em",
          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "none",
            transform: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
        contained: {
          backgroundColor: "#0071e3",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#0077ED",
          },
        },
        containedPrimary: {
          backgroundColor: "#1d1d1f",
          "&:hover": {
            backgroundColor: "#333336",
          },
        },
        outlined: {
          borderColor: "#d2d2d7",
          color: "#1d1d1f",
          borderWidth: 1,
          "&:hover": {
            borderColor: "#86868b",
            backgroundColor: "transparent",
          },
        },
        text: {
          color: "#0071e3",
          "&:hover": {
            backgroundColor: "rgba(0, 113, 227, 0.04)",
          },
        },
        sizeSmall: {
          padding: "8px 16px",
          fontSize: "0.8125rem",
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "none",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundImage: "none",
        },
        elevation0: {
          boxShadow: "none",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        },
        elevation3: {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#f5f5f7",
            transition: "all 150ms ease",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e5e5ea",
              borderWidth: 1,
            },
            "&:hover": {
              backgroundColor: "#ebebed",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d2d2d7",
              },
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0071e3",
                borderWidth: 2,
              },
            },
          },
          "& .MuiInputLabel-root": {
            color: "#86868b",
            "&.Mui-focused": {
              color: "#0071e3",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 980,
          fontWeight: 500,
          transition: "all 150ms ease",
          border: "none",
        },
        filled: {
          backgroundColor: "#f5f5f7",
          color: "#1d1d1f",
          "&:hover": {
            backgroundColor: "#e8e8ed",
          },
        },
        outlined: {
          borderColor: "#d2d2d7",
          "&:hover": {
            backgroundColor: "#f5f5f7",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          color: "#1d1d1f",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 150ms ease",
          color: "#1d1d1f",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 51,
          height: 31,
          padding: 0,
          "& .MuiSwitch-switchBase": {
            padding: 2,
            "&.Mui-checked": {
              transform: "translateX(20px)",
              color: "#ffffff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#34c759",
                opacity: 1,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            width: 27,
            height: 27,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
          "& .MuiSwitch-track": {
            borderRadius: 31 / 2,
            backgroundColor: "#e8e8ed",
            opacity: 1,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16)",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 48,
          "&.Mui-expanded": {
            minHeight: 48,
          },
        },
        content: {
          margin: "12px 0",
          "&.Mui-expanded": {
            margin: "12px 0",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 980,
          border: "1px solid #d2d2d7",
          textTransform: "none",
          fontWeight: 400,
          color: "#1d1d1f",
          "&.Mui-selected": {
            backgroundColor: "#1d1d1f",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#333336",
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 8,
          "& .MuiToggleButton-root": {
            borderRadius: 980,
            border: "1px solid #d2d2d7",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        standardError: {
          backgroundColor: "rgba(255, 59, 48, 0.08)",
          color: "#ff3b30",
        },
        standardSuccess: {
          backgroundColor: "rgba(52, 199, 89, 0.08)",
          color: "#34c759",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiAlert-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
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

export default Theme;
