import { useEffect, useState } from "react";

export const useTheme = () => {
  const getDefaultTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkTheme ? "theme-dark" : "theme-light";
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem("theme", theme);

    return () => {
      document.body.className = "";
    };
  }, [theme]);

  return { theme, setTheme };
};
