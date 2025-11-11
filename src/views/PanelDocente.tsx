import React, { useState } from "react";

interface Actividad {
  id: number;
  titulo: string;
  materia: "Matemáticas" | "Ciencias" | "Sociales";
  grado: "4°" | "5°";
  estado: "Pendiente" | "En curso" | "Completada";
}

const PanelDocente: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([
    {
      id: 1,
      titulo: "Figuras 3D básicas",
      materia: "Matemáticas",
      grado: "4°",
      estado: "Completada",
    },
    {
      id: 2,
      titulo: "Ciclo del Agua - Observación",
      materia: "Ciencias",
      grado: "5°",
      estado: "En curso",
    },
    {
      id: 3,
      titulo: "Ubicación de continentes",
      materia: "Sociales",
      grado: "4°",
      estado: "Pendiente",
    },
  ]);

  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] =
    useState<Actividad["materia"]>("Matemáticas");
  const [grado, setGrado] = useState<Actividad["grado"]>("4°");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo) return;

    setActividades((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        titulo,
        materia,
        grado,
        estado: "Pendiente",
      },
    ]);
    setTitulo("");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Panel Docente</h1>
      <p className="text-sm text-slate-600">
        Visualiza módulos disponibles y gestiona actividades para tus
        estudiantes de 4° y 5°.
      </p>

      {/* Módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg shadow p-3 border">
          <h2 className="font-semibold">Matemáticas</h2>
          <p className="text-xs text-slate-600">
            Explorador 3D de figuras geométricas.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border">
          <h2 className="font-semibold">Ciencias</h2>
          <p className="text-xs text-slate-600">
            Ciclo del Agua interactivo.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border">
          <h2 className="font-semibold">Sociales</h2>
          <p className="text-xs text-slate-600">
            Globo terráqueo interactivo.
          </p>
        </div>
      </div>

      {/* Form agregar actividad */}
      <form
        onSubmit={handleAdd}
        className="bg-slate-50 border rounded-lg p-3 flex flex-wrap gap-2 items-end"
      >
        <div className="flex-1">
          <label className="block text-xs mb-1">Título de la actividad</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm"
            placeholder="Ej: Quiz sobre ciclo del agua"
            required
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Materia</label>
          <select
            value={materia}
            onChange={(e) =>
              setMateria(e.target.value as Actividad["materia"])
            }
            className="px-2 py-1 border rounded text-sm"
          >
            <option>Matemáticas</option>
            <option>Ciencias</option>
            <option>Sociales</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Grado</label>
          <select
            value={grado}
            onChange={(e) =>
              setGrado(e.target.value as Actividad["grado"])
            }
            className="px-2 py-1 border rounded text-sm"
          >
            <option>4°</option>
            <option>5°</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-emerald-500 text-white text-sm rounded"
        >
          Agregar
        </button>
      </form>

      {/* Tabla (fake) */}
      <div className="bg-white rounded-lg shadow p-3 border">
        <h2 className="font-semibold mb-2 text-sm">
          Actividades asignadas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1 pr-2">Título</th>
                <th className="py-1 pr-2">Materia</th>
                <th className="py-1 pr-2">Grado</th>
                <th className="py-1 pr-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((a) => (
                <tr key={a.id} className="border-b last:border-0">
                  <td className="py-1 pr-2">{a.titulo}</td>
                  <td className="py-1 pr-2">{a.materia}</td>
                  <td className="py-1 pr-2">{a.grado}</td>
                  <td className="py-1 pr-2">{a.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PanelDocente;
