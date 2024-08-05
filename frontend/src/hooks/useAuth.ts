import { useState } from "react";
import axios from "axios";

import { API_URL } from "../api/api";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = hasAccount ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
    const payload = isAuthenticated
      ? { email, password }
      : { username, email, password };

    try {
      const res = await axios.post(url, payload);
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError({ message: error.response.data.message });
    }
  };

  return {
    setUsername,
    setEmail,
    setPassword,
    error,
    hasAccount,
    setHasAccount,
    isAuthenticated,
    setIsAuthenticated,
    handleOnSubmit,
  };
};
