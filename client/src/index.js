import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import EngStart from "./EngStart";
import EngFinish from "./UserSucc";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/EngStart",
    element: <EngStart />,
  },
  {
    path: "/UserSucc",
    element: <EngFinish />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// ReactDOM.render(
//   <RouterProvider router={router} />,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
