import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import customAxios from "./axios";
import { useAuthStore } from "../store/authStore";
import { IUser } from "../types/types";

export const useLoginGoogle = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (accessToken: string) => {
      return customAxios.post("/auth/google", { accessToken });
    },
    onSuccess: ({ data }) => {
      authData(data.result);
      navigate("/");
    },
  });
};

export const useLogin = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return customAxios.post("/auth/login", user);
    },
    onSuccess: ({ data }) => {
      authData(data.result);
      navigate("/");
    },
  });
};

export const useRegister = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return customAxios.post("/auth/register", user);
    },
    onSuccess: ({ data }) => {
      authData(data.result);
      navigate("/");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return customAxios.put("/auth/reset-password", user);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      navigate("/login");
    },
  });
};

export const generateRefreshToken = () => {
  return customAxios.post("/auth/refresh-token");
};

customAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.log(`Token refresh error: ${refreshError}`);
      }
    }
    return Promise.reject(error);
  }
);
