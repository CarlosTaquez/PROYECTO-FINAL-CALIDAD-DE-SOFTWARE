import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState<"estudiante" | "docente">("estudiante");
  const [grado, setGrado] = useState<"4" | "5" | "">("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !correo || !password) return;
    if (rol === "estudiante" && !grado) return;

    const nuevoUsuario = {
      nombre,
      correo,
      rol,
      grado: rol === "estudiante" ? grado : null,
      password,
    };

    const existentesRaw = localStorage.getItem("mc_users");
    const existentes = existentesRaw ? JSON.parse(existentesRaw) : [];
    existentes.push(nuevoUsuario);
    localStorage.setItem("mc_users", JSON.stringify(existentes));

    localStorage.setItem(
      "mc_currentUser",
      JSON.stringify({
        nombre,
        correo,
        rol,
        grado: rol === "estudiante" ? grado : null,
      })
    );

    navigate("/app");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 px-8 py-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Registro - Mentes Creativas
        </h1>

        <div>
          <label className="block text-sm mb-1">Nombre completo</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Eres:</label>
          <select
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
            value={rol}
            onChange={(e) => setRol(e.target.value as "estudiante" | "docente")}
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
        </div>

        {rol === "estudiante" && (
          <div>
            <label className="block text-sm mb-1">Grado</label>
            <select
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
              value={grado}
              onChange={(e) => setGrado(e.target.value as "4" | "5")}
              required={rol === "estudiante"}
            >
              <option value="">Selecciona grado</option>
              <option value="4">4°</option>
              <option value="5">5°</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 font-semibold mt-2"
        >
          Crear cuenta
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
        >
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
};

export default Registro;
