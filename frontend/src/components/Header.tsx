import { useTheme } from "../hooks/useTheme";

import iconMoon from "../assets/icons/moon.svg";
import iconSun from "../assets/icons/sun.svg";

import "../css/header.css";
import "../css/themes.css";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  return (
    <div className="header" onClick={toggleTheme}>
      <img
        src={theme === "theme-light" ? iconMoon : iconSun}
        alt="change theme icon"
      />
      <p>{theme === "theme-light" ? "Dark theme" : " Light theme"}</p>
    </div>
  );
};
