const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ======================================
// 🌎 CIENCIAS - CICLO DEL AGUA
// ======================================

// GET general (todas las fases)
app.get("/api/ciencias/ciclo-agua", (req, res) => {
  res.json({
    title: "Ciclo del Agua",
    description: "Fases principales del ciclo del agua.",
    stages: {
      evaporacion:
        "El Sol calienta el agua de mares, ríos y lagos, transformándola en vapor que sube hacia el cielo.",
      condensacion:
        "El vapor de agua se enfría en las capas altas de la atmósfera y forma nubes.",
      precipitacion:
        "Cuando las nubes están muy cargadas, el agua cae en forma de lluvia.",
      escorrentia:
        "El agua de lluvia se desliza por montañas, ríos y suelos hasta regresar a mares o lagos.",
    },
  });
});

// GET - Evaporación
app.get("/api/ciencias/ciclo-agua/evaporacion", (req, res) => {
  res.json({
    id: "evaporacion",
    title: "☀️ Evaporación",
    description:
      "El Sol calienta el agua de mares, ríos y lagos, convirtiéndola en vapor que asciende al cielo.",
  });
});

// GET - Condensación
app.get("/api/ciencias/ciclo-agua/condensacion", (req, res) => {
  res.json({
    id: "condensacion",
    title: "☁️ Condensación",
    description:
      "El vapor de agua se enfría en la atmósfera y se convierte en pequeñas gotas que forman nubes.",
  });
});

// GET - Precipitación
app.get("/api/ciencias/ciclo-agua/precipitacion", (req, res) => {
  res.json({
    id: "precipitacion",
    title: "🌧️ Precipitación",
    description:
      "Las gotas de agua en las nubes se unen, se hacen pesadas y caen como lluvia.",
  });
});

// GET - Escorrentía
app.get("/api/ciencias/ciclo-agua/escorrentia", (req, res) => {
  res.json({
    id: "escorrentia",
    title: "🌊 Escorrentía",
    description:
      "El agua de lluvia corre por el suelo, riachuelos y ríos hasta volver a mares o lagos.",
  });
});

// ======================================
// 🚀 INICIAR SERVIDOR
// ======================================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});
// ======================================
// ➗ MATEMÁTICAS - GEOMETRÍA 3D
// ======================================

// GET general - lista de figuras 3D
app.get("/api/matematicas/geometry3d", (req, res) => {
  res.json({
    title: "Figuras Geométricas 3D",
    description:
      "Resumen de las figuras 3D utilizadas en el recurso interactivo: cubo, esfera, pirámide y cilindro.",
    figures: [
      {
        id: "cubo",
        name: "Cubo",
        edges: 12,
        faces: 6,
        vertices: 8,
        description:
          "Figura con 6 caras cuadradas iguales. Todos sus lados tienen la misma longitud."
      },
      {
        id: "esfera",
        name: "Esfera",
        edges: 0,
        faces: 1,
        vertices: 0,
        description:
          "Figura redonda como una pelota. Todos los puntos de la superficie están a la misma distancia del centro."
      },
      {
        id: "piramide",
        name: "Pirámide",
        edges: 8,
        faces: 5,
        vertices: 5,
        description:
          "Base cuadrada y 4 caras triangulares que se unen en un vértice superior."
      },
      {
        id: "cilindro",
        name: "Cilindro",
        edges: 2,
        faces: 3,
        vertices: 0,
        description:
          "Dos bases circulares paralelas unidas por una superficie curva."
      }
    ]
  });
});

// GET - Cubo
app.get("/api/matematicas/geometry3d/cubo", (req, res) => {
  res.json({
    id: "cubo",
    name: "Cubo",
    edges: 12,
    faces: 6,
    vertices: 8,
    description:
      "Figura 3D donde todas las caras son cuadrados iguales. Ideal para enseñar volumen y área."
  });
});

// GET - Esfera
app.get("/api/matematicas/geometry3d/esfera", (req, res) => {
  res.json({
    id: "esfera",
    name: "Esfera",
    edges: 0,
    faces: 1,
    vertices: 0,
    description:
      "Figura redonda similar a una pelota. Se usa para explicar radios, diámetros y circunferencia."
  });
});

// GET - Pirámide
app.get("/api/matematicas/geometry3d/piramide", (req, res) => {
  res.json({
    id: "piramide",
    name: "Pirámide",
    edges: 8,
    faces: 5,
    vertices: 5,
    description:
      "Figura con base cuadrada y caras triangulares que se unen en un punto. Útil para ver altura y caras."
  });
});

// GET - Cilindro
app.get("/api/matematicas/geometry3d/cilindro", (req, res) => {
  res.json({
    id: "cilindro",
    name: "Cilindro",
    edges: 2,
    faces: 3,
    vertices: 0,
    description:
      "Figura con dos bases circulares y una superficie curva. Útil para aprender área lateral y volumen."
  });
});
// ======================================
// 🌍 SOCIALES - GLOBO TERRAQUEO
// ======================================

// GET general - Información del globo y continentes
app.get("/api/sociales/globo-terraqueo", (req, res) => {
  res.json({
    title: "Globo Terráqueo Interactivo",
    description:
      "Recurso para ubicar continentes, océanos y reconocer la posición de Colombia en el mundo.",
    continents: [
      { id: "america", name: "América", info: "Continente extendido de norte a sur. Incluye América del Norte, Central y del Sur." },
      { id: "europa", name: "Europa", info: "Continente con muchos países pequeños, historia antigua y economías desarrolladas." },
      { id: "asia", name: "Asia", info: "El continente más grande. Tiene la mayor población del mundo." },
      { id: "africa", name: "África", info: "Cuna de la humanidad, con gran diversidad cultural y natural." },
      { id: "oceania", name: "Oceanía", info: "Incluye Australia, Nueva Zelanda e islas del Pacífico." },
      { id: "antartida", name: "Antártida", info: "Continente helado en el sur, cubierto casi totalmente de hielo." }
    ],
    focusCountry: {
      id: "colombia",
      name: "Colombia",
      info: "País en América del Sur, ubicado cerca de la línea del Ecuador, con salida a dos océanos."
    }
  });
});

// GET - Lista simple de continentes
app.get("/api/sociales/globo-terraqueo/continentes", (req, res) => {
  res.json([
    "América",
    "Europa",
    "Asia",
    "África",
    "Oceanía",
    "Antártida"
  ]);
});

// GET - América
app.get("/api/sociales/globo-terraqueo/america", (req, res) => {
  res.json({
    id: "america",
    name: "América",
    description:
      "Se divide en América del Norte, Central y del Sur. Colombia está en América del Sur.",
    highlights: [
      "Gran diversidad de climas",
      "Cordillera de los Andes",
      "Selva Amazónica"
    ]
  });
});

// GET - Europa
app.get("/api/sociales/globo-terraqueo/europa", (req, res) => {
  res.json({
    id: "europa",
    name: "Europa",
    description:
      "Continente con muchos países cercanos entre sí, importante en historia, ciencia y arte."
  });
});

// GET - Asia
app.get("/api/sociales/globo-terraqueo/asia", (req, res) => {
  res.json({
    id: "asia",
    name: "Asia",
    description:
      "El continente más grande, con países como China, India y Japón."
  });
});

// GET - África
app.get("/api/sociales/globo-terraqueo/africa", (req, res) => {
  res.json({
    id: "africa",
    name: "África",
    description:
      "Rico en culturas, idiomas y fauna. Atraviesa la línea del Ecuador."
  });
});

// GET - Oceanía
app.get("/api/sociales/globo-terraqueo/oceania", (req, res) => {
  res.json({
    id: "oceania",
    name: "Oceanía",
    description:
      "Incluye Australia, Nueva Zelanda y muchas islas del Pacífico."
  });
});

// GET - Antártida
app.get("/api/sociales/globo-terraqueo/antartida", (req, res) => {
  res.json({
    id: "antartida",
    name: "Antártida",
    description:
      "Continente cubierto de hielo, sin población permanente, usado para investigación científica."
  });
});

// GET - Colombia (enfocado, útil si tu Globo la resalta)
app.get("/api/sociales/globo-terraqueo/colombia", (req, res) => {
  res.json({
    id: "colombia",
    name: "Colombia",
    continent: "América",
    description:
      "Ubicada en el norte de América del Sur. Tiene costas en el océano Pacífico y el mar Caribe.",
    features: [
      "Cerca de la línea del Ecuador",
      "Gran biodiversidad",
      "Cordillera de los Andes atraviesa el país"
    ]
  });
});
