import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  // Adjust the path accordingly
import App from "./App";
import LoginUser from "./LoginUser";
import CreateUserForm from "./CreateUserForm";
import LoggedInUser from "./LoggedInUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/CreateUserForm",
    element: <CreateUserForm />,
  },
  {
    path: "/LoginUser",
    element: <LoginUser />,
  },
  {
    path: "/LoggedInUser",
    element: <LoggedInUser />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

// ReactDOM.render(
//   <RouterProvider router={router} />,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
