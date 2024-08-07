import { createContext, PropsWithChildren, useState } from "react";
import axios from "axios";

import { AuthContextType } from "../types/types";
import { API_URL } from "../api/api";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{message: string} | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // prevent default form submit
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = hasAccount
      ? `${API_URL}/auth/login`
      : `${API_URL}/auth/register`;
    const payload = hasAccount
      ? { email, password }
      : { username, email, password };

    try {
      await axios.post(api, payload);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError({ message: error.response.data.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUsername,
        setEmail,
        setPassword,
        error,
        setError,
        hasAccount,
        setHasAccount,
        isAuthenticated,
        setIsAuthenticated,
        handleOnSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
