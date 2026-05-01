import React from "react";
import { useThemeMode } from "../../context/ThemeContext";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
    </button>
  );
}
