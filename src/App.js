import React from "react";
import Home from "./components/Homepage/Home";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/theme/Theme";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
