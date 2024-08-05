import { useAuth } from "../hooks/useAuth";
import "../css/logout.css";

export const Logout = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <button className="logout" onClick={handleLogOut}>
      Logout
    </button>
  );
};
