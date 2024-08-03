import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this file exists and has styles applied
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Main from "./components/Homepage/Main/page";
import CreateTrip from "./components/Trip/CreateTrip";
import StoreProvider from "./store";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/Theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Main />} />
      <Route path="create-trip" element={<CreateTrip />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={Theme}>
    <React.StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
