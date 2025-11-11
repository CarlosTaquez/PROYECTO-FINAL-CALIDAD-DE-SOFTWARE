import React from "react";
import { useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    const raw = localStorage.getItem("mc_currentUser");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Perfil</h1>
        <p>No has iniciado sesión.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-3 px-3 py-1 bg-emerald-500 text-white rounded"
        >
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold mb-2">Mi Perfil</h1>
      <p>
        <strong>Nombre:</strong> {user.nombre}
      </p>
      <p>
        <strong>Correo:</strong> {user.correo}
      </p>
      <p>
        <strong>Rol:</strong>{" "}
        {user.rol === "docente" ? "Docente" : "Estudiante"}
      </p>
      {user.rol === "estudiante" && user.grado && (
        <p>
          <strong>Grado:</strong> {user.grado}°
        </p>
      )}

      {user.rol === "docente" && (
        <button
          onClick={() => navigate("/app/docente")}
          className="mt-4 px-3 py-2 bg-emerald-500 text-white rounded"
        >
          Ir al Panel Docente
        </button>
      )}
    </div>
  );
};

export default Perfil;
