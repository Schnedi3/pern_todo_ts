import axios from "./axios";

import { IUser } from "../types/types";

export const loginRequest = (user: IUser) => {
  return axios.post("/auth/login", user);
};

export const loginGoogleRequest = (accessToken: string) => {
  return axios.post("/auth/google", { accessToken });
};

export const registerRequest = (user: IUser) => {
  return axios.post("/auth/register", user);
};

export const resetPasswordRequest = (user: IUser) => {
  return axios.put("/auth/reset-password", user);
};
