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
    <section className="header">
      <h1>todo</h1>
      <img
        src={theme === "theme-light" ? iconMoon : iconSun}
        alt="change theme icon"
        onClick={toggleTheme}
      />
    </section>
  );
};
