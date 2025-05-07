import React from "react";
import { isAuthenticated } from "../App";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
