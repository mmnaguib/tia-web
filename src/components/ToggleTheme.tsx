import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {isDarkTheme ? (
        <i className="fa fa-sun"></i>
      ) : (
        <i className="fa fa-moon"></i>
      )}
    </button>
  );
};

export default ToggleTheme;
