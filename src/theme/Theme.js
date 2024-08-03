import { createTheme } from "@mui/material/styles";
import { darkScrollbar } from "@mui/material";

const Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
      }),
    },
  },
  palette: {
    background: {
      default: "#F8F9FA",
    },
    primary: {
      main: "#0D6EFD",
    },
    secondary: {
      main: "#6C757D",
    },
  },
});
export default Theme;
