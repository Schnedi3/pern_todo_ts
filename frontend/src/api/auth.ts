import axios from "./axios";

import { LoginType, RegisterType } from "../types/types";

export const registerRequest = (user: RegisterType) => {
  return axios.post("/register", user);
};

export const loginRequest = (user: LoginType) => {
  return axios.post("/login", user);
};
