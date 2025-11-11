import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raw = localStorage.getItem("mc_users");
    const usuarios = raw ? JSON.parse(raw) : [];

    const encontrado = usuarios.find(
      (u: any) => u.correo === correo && u.password === password
    );

    if (!encontrado) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem(
      "mc_currentUser",
      JSON.stringify({
        nombre: encontrado.nombre,
        correo: encontrado.correo,
        rol: encontrado.rol,
        grado: encontrado.grado || null,
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
          Iniciar sesión - Mentes Creativas
        </h1>

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
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 font-semibold mt-2"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/registro")}
          className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
        >
          Crear una nueva cuenta
        </button>
      </form>
    </div>
  );
};

export default Login;
