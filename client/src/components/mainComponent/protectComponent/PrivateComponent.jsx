import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  // Check if the user is authenticated
  const auth = localStorage.getItem("user");

  // If authenticated, render the child routes (Outlet), otherwise redirect to signup
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
