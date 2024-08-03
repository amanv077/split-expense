import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Main />,
//       },
//       {
//         path: "create-trip",
//         element: <CreateTrip />,
//       },
//       {
//         path: "new-expense",
//         element: <NewExpense />,
//       },
//       {
//         path: "summary",
//         element: <Overview />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" exact element={<Main />} />
      <Route path="create-trip" exact element={<CreateTrip />} />
      {/* <Route path="new-expense" element={<NewExpense />} /> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
