import "../css/logout.css";

import { useAuthContext } from "../context/useAuthContext";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <button className="logout" onClick={logout}>
      Logout
    </button>
  );
};
