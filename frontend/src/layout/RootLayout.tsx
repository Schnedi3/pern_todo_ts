import { Outlet } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import { Logout } from "../Routes";

export const RootLayout = () => {
  return (
    <AuthProvider>
      <Logout />
      <Outlet />
    </AuthProvider>
  );
};
