import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

import {
  loginGoogleRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../api/auth";
import { AuthContextType, IAuthResponse, IUser } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeRespose) => handleGoogleLogin(codeRespose.access_token),
    onError: (error) => console.log("Login failed", error),
  });

  const handleAuthSuccess = (data: IAuthResponse) => {
    setUser(data.result);
    toast.success(data.message);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(data.result));
  };

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const { data } = await loginGoogleRequest(accessToken);

      if (data.success) {
        handleAuthSuccess(data);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const loginUser = async (user: IUser) => {
    try {
      const { data } = await loginRequest(user);

      if (data.success) {
        handleAuthSuccess(data);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const registerUser = async (user: IUser) => {
    try {
      const { data } = await registerRequest(user);

      if (data.success) {
        handleAuthSuccess(data);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const resetPassword = async (user: IUser) => {
    try {
      const { data } = await resetPasswordRequest(user);

      if (data.success) {
        toast.success(data.message);
        navigate("/Login");
      } else {
        toast.error(data.message);
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
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
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
        loginGoogle,
        loginUser,
        registerUser,
        resetPassword,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
