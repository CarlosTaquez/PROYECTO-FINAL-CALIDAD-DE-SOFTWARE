import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";

// Vistas públicas
import ContextoProyecto from "../views/ContextoProyecto";
import Registro from "../views/Registro";
import Login from "../views/Login";

// Vistas privadas
import { Geometry3D } from "../components/Matematicas";
import { CicloAgua } from "../components/Ciencias";
import { GloboTerraqueo } from "../components/Sociales";
import Perfil from "../views/Perfil";
import PanelDocente from "../views/PanelDocente";
import HomePage from "../views/HomePage";

// --------- Helpers de sesión ---------

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

const ProtectedRoute: React.FC<{
  children: React.ReactElement;
  onlyDocente?: boolean;
}> = ({ children, onlyDocente }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (onlyDocente && user.rol !== "docente") {
    return <Navigate to="/app" replace />;
  }

  return children;
};

// --------- Acerca / Créditos ---------

const Acerca: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-2">Acerca / Créditos</h1>
    <p className="mb-2">
      Plataforma "Mentes Creativas" diseñada como proyecto educativo para
      estudiantes de 4° y 5°.
    </p>
    <p className="font-semibold">
      Creado por: Carlos Taquez, Juan Ordoñez, Felipe Alfaro
    </p>
  </div>
);

// --------- Definición de rutas ---------

export default function AppRoutes() {
  return (
    <Routes>
      {/* Bienvenida inicial */}
      <Route path="/" element={<ContextoProyecto />} />

      {/* Público */}
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      {/* Área privada */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Inicio dentro de la app */}
        <Route index element={<HomePage />} />

        {/* Estudiante - módulos */}
        <Route path="matematicas/geometria-3d" element={<Geometry3D />} />
        <Route path="ciencias/ciclo-agua" element={<CicloAgua />} />
        <Route path="sociales/globo" element={<GloboTerraqueo />} />

        {/* Perfil */}
        <Route path="perfil" element={<Perfil />} />

        {/* Solo docentes */}
        <Route
          path="docente"
          element={
            <ProtectedRoute onlyDocente>
              <PanelDocente />
            </ProtectedRoute>
          }
        />

        {/* Acerca */}
        <Route path="acerca" element={<Acerca />} />

        {/* 404 interna → redirige al dashboard */}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>

      {/* Cualquier otra ruta → vuelve a la bienvenida */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

