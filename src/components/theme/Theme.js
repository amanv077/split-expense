import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
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
      default: "#0d050d",
    },
    primary: {
      main: "#5b5f97",
    },
    secondary: {
      main: orange[500],
    },
  },
});
export default Theme;
