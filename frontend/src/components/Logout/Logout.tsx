import { useAuthStore } from "../../store/authStore";
import styles from "./logout.module.css";

export const Logout = () => {
  const { logoutAuth } = useAuthStore();

  const logOut = () => {
    logoutAuth();
  };

  return (
    <button className={styles.logout} onClick={logOut}>
      Logout
    </button>
  );
};
