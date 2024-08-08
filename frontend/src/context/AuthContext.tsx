import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { AuthContextType, LoginType, RegisterType } from "../types/types";
import { loginRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<RegisterType | LoginType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (user: RegisterType) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setError(null);

      Cookies.set("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const login = async (user: LoginType) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setError(null);

      Cookies.set("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const checkAuth = () => {
    const token = Cookies.get("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        isAuthenticated,
        setIsAuthenticated,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
