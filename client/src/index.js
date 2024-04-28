// index.js
// This file is the entry point for the React application. It sets up the router and wraps the entire app in the AuthProvider.
// It defines the main routes and their corresponding components for the application.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  // Adjust the path accordingly if the AuthContext is elsewhere
import App from "./App";
import LoginUser from "./LoginUser";
import CreateUserForm from "./CreateUserForm";
import LoggedInUser from "./LoggedInUser";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
import OrgOverview from "./OrgOverview";

// Setup of the React Router with the routes and corresponding components
const router = createBrowserRouter([
  {
    path: "/",  // Root path that loads the main application page
    element: <App />,
  },
  {
    path: "/CreateUserForm",  // Route for the user creation form
    element: <CreateUserForm />,
  },
  {
    path: "/LoginUser",  // Route for the login page
    element: <LoginUser />,
  },
  {
    path: "/LoggedInUser",  // Route for displaying the logged-in user's page
    element: <LoggedInUser />,
  },
  {
    path: "/UpdateUserInfoForm",  // Route for updating user information
    element: <UpdateUserInfoForm />,
  },
  {
    path: "/OrgOverview",  // Route for the organization overview page
    element: <OrgOverview />,
  },
]);

// Render the application with AuthProvider at the top level for managing authentication context
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
