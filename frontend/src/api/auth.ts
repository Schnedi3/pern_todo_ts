import axios from "./axios";

import { LoginType, RegisterType } from "../types/types";

// register request
export const registerRequest = (user: RegisterType) => {
  return axios.post("/auth/register", user);
};

// login request
export const loginRequest = (user: LoginType) => {
  return axios.post("/auth/login", user);
};
