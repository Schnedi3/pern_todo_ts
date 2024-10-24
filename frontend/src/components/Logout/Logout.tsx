import { useLogout } from "../../api/auth";
import styles from "./logout.module.css";

export const Logout = () => {
  const { mutate: logout } = useLogout();

  return (
    <button className={styles.logout} onClick={() => logout()}>
      Logout
    </button>
  );
};
