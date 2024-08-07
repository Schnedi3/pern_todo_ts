import axios from "axios";

import { useAuthContext } from "../context/useAuthContext";
import { API_URL } from "../api/api";
import "../css/logout.css";

export const Logout = () => {
  const { setIsAuthenticated } = useAuthContext();

  const handleLogOut = () => {
    axios.post(`${API_URL}/auth/logout`);
    setIsAuthenticated(false);
  };

  return (
    <button className="logout" onClick={handleLogOut}>
      Logout
    </button>
  );
};
