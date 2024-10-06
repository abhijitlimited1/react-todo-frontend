// src/Component/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const firstName = localStorage.getItem("first_name");
  const lastName = localStorage.getItem("last_name");

  if (!firstName || !lastName) {
    alert("Please log in first.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
