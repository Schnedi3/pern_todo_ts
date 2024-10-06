import { useAuthContext } from "../../context/useAuthContext";
import "./logout.css";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <button className="logout" onClick={logout}>
      Logout
    </button>
  );
};
