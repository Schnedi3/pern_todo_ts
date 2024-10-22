import { useAuthStore } from "../../store/authStore";
import styles from "./logout.module.css";

export const Logout = () => {
  const { logoutAuth } = useAuthStore();

  return (
    <button className={styles.logout} onClick={logoutAuth}>
      Logout
    </button>
  );
};
