import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContextoProyecto: React.FC = () => {
  const navigate = useNavigate();
  const [adios, setAdios] = useState(false);

  const handleNoIngresar = () => {
    setAdios(true);
    localStorage.removeItem("mc_currentUser");
  };

  if (adios) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="bg-slate-800 px-8 py-6 rounded-2xl shadow-lg text-center max-w-md">
          <h1 className="text-2xl font-bold mb-3">Hasta pronto 👋</h1>
          <p className="text-sm">
            Para usar <strong>Mentes Creativas</strong> necesitas registrarte o
            iniciar sesión. Cuando estés listo, vuelve a intentarlo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 px-8 py-6 rounded-2xl shadow-lg max-w-lg text-center space-y-4">
        <h1 className="text-3xl font-bold">Bienvenidos a Mentes Creativas</h1>
        <p className="text-sm text-slate-300">
          Plataforma interactiva para estudiantes de 4° y 5° grado, con
          actividades de Matemáticas, Ciencias y Sociales en formato visual y
          divertido.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => navigate("/registro")}
            className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 font-semibold"
          >
            Registrarme
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Ya tengo cuenta
          </button>
          <button
            onClick={handleNoIngresar}
            className="w-full py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm"
          >
            No quiero ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextoProyecto;
