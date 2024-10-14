import { useTheme } from "../../hooks/useTheme";
import { iconTheme } from "../../Routes";

import styles from "./header.module.css";
import "./themes.css";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  return (
    <button className={styles.theme} onClick={toggleTheme}>
      <img className={styles.iconTheme} src={iconTheme} alt="change theme icon" />
      <p className={styles.themeText}>{theme === "theme-light" ? "Dark theme" : " Light theme"}</p>
    </button>
  );
};
