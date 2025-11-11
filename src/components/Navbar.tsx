// src/components/Navbar.tsx
import React from "react";
import { FaMoon } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [dark, setDark] = React.useState(false);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-slate-200 dark:bg-slate-700 shadow">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white font-bold rounded">
          P
        </div>
        <span className="font-semibold text-slate-800 dark:text-slate-100">
          Proyecto Final - Calidad de Software
        </span>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-1 border rounded text-sm text-slate-700 dark:text-slate-100 border-slate-400 dark:border-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
      >
        <FaMoon />
        {dark ? "Modo claro" : "Modo oscuro"}
      </button>
    </header>
  );
};

export default Navbar;

