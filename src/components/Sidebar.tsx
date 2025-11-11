import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFlask,
  FaShapes,
  FaGlobeAmericas,
  FaChalkboardTeacher,
  FaUserCircle,
  FaBookOpen,
} from "react-icons/fa";

interface CurrentUser {
  nombre: string;
  correo: string;
  rol: "estudiante" | "docente";
  grado?: string | null;
}

const getCurrentUser = (): CurrentUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("mc_currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const Sidebar: React.FC = () => {
  const user = getCurrentUser();
  const isDocente = user?.rol === "docente";

  const studentNav = [
    {
      label: "Ciencias",
      to: "/app/ciencias/ciclo-agua",
      icon: <FaFlask />,
    },
    {
      label: "Matemáticas",
      to: "/app/matematicas/geometria-3d",
      icon: <FaShapes />,
    },
    {
      label: "Sociales",
      to: "/app/sociales/globo",
      icon: <FaGlobeAmericas />,
    },
    {
      label: "Perfil",
      to: "/app/perfil",
      icon: <FaUserCircle />,
    },
    {
      label: "Acerca de",
      to: "/app/acerca",
      icon: <FaBookOpen />,
    },
  ];

  const docenteNav = [
    {
      label: "Panel Docente",
      to: "/app/docente",
      icon: <FaChalkboardTeacher />,
    },
    {
      label: "Perfil",
      to: "/app/perfil",
      icon: <FaUserCircle />,
    },
    {
      label: "Acerca de",
      to: "/app/acerca",
      icon: <FaBookOpen />,
    },
  ];

  const navItems = isDocente ? docenteNav : studentNav;

  return (
    <aside className="w-56 bg-slate-900 text-slate-100 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
