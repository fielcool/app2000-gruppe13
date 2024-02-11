import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import LoginUser from "./LoginUser";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";



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
    element: <LoggedInUser/>,
 }
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
