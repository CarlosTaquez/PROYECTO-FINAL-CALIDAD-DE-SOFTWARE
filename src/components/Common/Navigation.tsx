import React from "react";
import { NavLink } from "react-router-dom";

const linkBase =
  "hover:underline";
const active =
  "font-bold";

const Navigation: React.FC = () => {
  return (
    <nav
      data-testid="main-nav"
      className="bg-slate-900 text-white px-6 py-3 shadow-md"
    >
      <ul className="flex gap-6 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/matematicas"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Matemáticas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ciencias"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Ciencias
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logica"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Lógica
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
