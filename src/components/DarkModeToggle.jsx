import React, { useEffect, useState } from "react";
import './DarkModeToggle.css';
import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      className="dark-toggle"
      onClick={() => setDarkMode((d) => !d)}
      aria-label="Toggle dark mode"
    >
      <img
        src={darkMode ? sunIcon : moonIcon}
        alt={darkMode ? "Light Mode" : "Dark Mode"}
        className="toggle-icon"
      />
    </button>
  );
}
