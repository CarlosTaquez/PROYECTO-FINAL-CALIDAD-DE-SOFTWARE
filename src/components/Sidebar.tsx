import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaFlask,
  FaPaintBrush,
  FaList,
  FaBookOpen,
  FaUserCircle,
  FaPlayCircle,
} from "react-icons/fa";

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

const mainItems: SidebarItem[] = [
  { label: "Inicio", route: "/", icon: <FaHome /> },
];

const thematicItems: SidebarItem[] = [
  {
    label: "Matemáticas - Tablas Interactivas",
    route: "/matematicas/tablas",
    icon: <FaCalculator />,
  },
  {
    label: "Ciencias Naturales - Ciclo del Agua",
    route: "/ciencias/ciclo-agua",
    icon: <FaFlask />,
  },
  {
    label: "Arte - Mezcla de Colores",
    route: "/arte/mezcla-color",
    icon: <FaPaintBrush />,
  },
];

const otherItems: SidebarItem[] = [
  {
    label: "Evaluaciones",
    route: "/evaluaciones",
    icon: <FaList />,
  },
  {
    label: "Recursos Multimedia",
    route: "/recursos",
    icon: <FaPlayCircle />,
  },
  {
    label: "Perfil",
    route: "/perfil",
    icon: <FaUserCircle />,
  },
  {
    label: "Acerca / Créditos",
    route: "/acerca",
    icon: <FaBookOpen />,
  },
];

export default function Sidebar() {
  const [openMain, setOpenMain] = useState(true);
  const [openThematic, setOpenThematic] = useState(true);
  const [openOther, setOpenOther] = useState(false);

  const renderNavItem = ({ label, route, icon }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-2 justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300
         hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors
         ${
           isActive
             ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
             : ""
         }`
      }
    >
      <div className="flex items-center gap-2">
        {icon} {label}
      </div>
    </NavLink>
  );

  return (
    <aside
      className="hidden md:block w-full md:w-[250px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      role="navigation"
      aria-label="Menú principal de la aplicación"
    >
      <div className="p-3 space-y-1">

        {/* Sección Principal */}
        <button
          onClick={() => setOpenMain(!openMain)}
          className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2
                     text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          aria-expanded={openMain}
        >
          Menú Principal
          <span>{openMain ? "▲" : "▼"}</span>
        </button>
        {openMain && (
          <div className="pl-4 space-y-1">{mainItems.map(renderNavItem)}</div>
        )}

        {/* Sección Temática */}
        <button
          onClick={() => setOpenThematic(!openThematic)}
          className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2
                     text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          aria-expanded={openThematic}
        >
          Áreas Temáticas
          <span>{openThematic ? "▲" : "▼"}</span>
        </button>
        {openThematic && (
          <div className="pl-4 space-y-1">{thematicItems.map(renderNavItem)}</div>
        )}

        {/* Sección Complementaria */}
        <button
          onClick={() => setOpenOther(!openOther)}
          className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2
                     text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          aria-expanded={openOther}
        >
          Otras Opciones
          <span>{openOther ? "▲" : "▼"}</span>
        </button>
        {openOther && (
          <div className="pl-4 space-y-1">{otherItems.map(renderNavItem)}</div>
        )}
      </div>
    </aside>
  );
}
