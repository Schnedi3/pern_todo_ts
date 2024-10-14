import { useAuthContext } from "../../context/useAuthContext";
import styles from "./logout.module.css";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <button className={styles.logout} onClick={logout}>
      Logout
    </button>
  );
};
