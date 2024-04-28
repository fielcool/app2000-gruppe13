// AuthContext.js
// This file defines the authentication context for the application using React Context API.
// It provides authentication token management and functions to handle login and logout operations.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();  // Create a new Context for authentication

export const AuthProvider = ({ children }) => {
  // State hook to store and manage the authentication token
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  // login function to update the authToken state and store it in localStorage
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);  // Persist token in local storage for session management
  };

  // logout function to clear the authToken state and remove it from localStorage
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');  // Clear token from local storage
    // Additional logout logic can be implemented here
  };

  // Context provider wraps around children to provide global access to the auth context
  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the auth context easily anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");  // Error handling for misuse of the context
  }
  return context;
};
