import React, { useRef, useEffect } from "react";
import { isAuthenticated } from "../App";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated() && !hasShownToast.current) {
      toast.error("Please login first");
      hasShownToast.current = true;
    }
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
