import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginRequest, registerRequest } from "../api/auth";
import { AuthContextType, ILogin, IRegister } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ILogin | IRegister | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerUser = async (user: IRegister) => {
    try {
      const response = await registerRequest(user);

      if (response.data.success) {
        setUser(response.data.result);
        toast.success(response.data.message);
        setIsAuthenticated(true);
        Cookies.set("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const loginUser = async (user: ILogin) => {
    try {
      const response = await loginRequest(user);

      if (response.data.success) {
        setUser(response.data.result);
        toast.success(response.data.message);
        setIsAuthenticated(true);
        Cookies.set("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
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
        registerUser,
        loginUser,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
