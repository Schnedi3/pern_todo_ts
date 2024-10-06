import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../context/useAuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/Login" replace />;

  return <Outlet />;
};
