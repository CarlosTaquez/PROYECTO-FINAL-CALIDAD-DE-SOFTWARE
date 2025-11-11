import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();

  const handleStart = () => navigate("/matematicas/tablas");
  const handleMore = () => navigate("/ciencias/ciclo-agua");

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* SVG de React */}
        <svg
          className="w-32 h-32 mx-auto mb-6"
          viewBox="0 0 841.9 595.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#61DAFB">
            <path d="M421 296.5c0-25.6 20.8-46.4 46.4-46.4s46.4 20.8 46.4 46.4-20.8 46.4-46.4 46.4-46.4-20.8-46.4-46.4z" />
            <path d="M421 183.5c-68.7 0-124.5 55.8-124.5 124.5s55.8 124.5 124.5 124.5 124.5-55.8 124.5-124.5S489.7 183.5 421 183.5zm0 219.8c-52.6 0-95.3-42.7-95.3-95.3s42.7-95.3 95.3-95.3 95.3 42.7 95.3 95.3-42.7 95.3-95.3 95.3z" />
          </g>
        </svg>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100">
          Bienvenido al Proyecto Final 🚀
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-700 dark:text-slate-300">
          Explora las secciones de{" "}
          <span className="font-bold text-emerald-500 dark:text-emerald-300">
            Matemáticas, Ciencias, Lógica y Arte
          </span>{" "}
          con actividades interactivas que te ayudarán a aprender jugando.
        </p>

        <div className="space-x-4">
          <button
            onClick={handleStart}
            className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition"
          >
            🚀 Empezar
          </button>

          <button
            onClick={handleMore}
            className="border border-emerald-600 text-emerald-600 bg-white dark:bg-slate-800 dark:text-emerald-300 px-6 py-3 rounded-2xl hover:bg-emerald-600 hover:text-white transition"
          >
            Ver más
          </button>
        </div>
      </motion.div>
    </div>
  );
}
