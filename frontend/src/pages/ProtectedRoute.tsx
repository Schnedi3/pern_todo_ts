import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../context/useAuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" replace />;
};
