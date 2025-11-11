// src/components/Matematicas/Geometry3D.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type ShapeId = "cubo" | "esfera" | "piramide" | "cilindro" | "prisma";

interface ShapeInfo {
  id: ShapeId;
  nombre: string;
  descripcion: string;
  caras: number | string;
  aristas: number | string;
  vertices: number | string;
  color: number;
}

const SHAPES: ShapeInfo[] = [
  {
    id: "cubo",
    nombre: "Cubo",
    descripcion:
      "Todos sus lados son cuadrados iguales. Ideal para introducir volumen y simetría.",
    caras: 6,
    aristas: 12,
    vertices: 8,
    color: 0x2563eb,
  },
  {
    id: "esfera",
    nombre: "Esfera",
    descripcion:
      "Figura redonda como una pelota. No tiene vértices ni aristas definidos.",
    caras: "Superficie curva",
    aristas: 0,
    vertices: 0,
    color: 0x22c55e,
  },
  {
    id: "piramide",
    nombre: "Pirámide (base cuadrada)",
    descripcion:
      "Tiene una base cuadrada y caras triangulares que se unen en un vértice superior.",
    caras: 5,
    aristas: 8,
    vertices: 5,
    color: 0xf97316,
  },
  {
    id: "cilindro",
    nombre: "Cilindro",
    descripcion:
      "Dos bases circulares unidas por una superficie curva. Como una lata de gaseosa.",
    caras: "3 (2 planas + 1 curva)",
    aristas: 2,
    vertices: 0,
    color: 0x8b5cf6,
  },
  {
    id: "prisma",
    nombre: "Prisma triangular",
    descripcion:
      "Dos triángulos paralelos unidos por rectángulos. Útil para estudiar caras paralelas.",
    caras: 5,
    aristas: 9,
    vertices: 6,
    color: 0xec4899,
  },
];

function createGeometry(id: ShapeId): THREE.BufferGeometry {
  switch (id) {
    case "cubo":
      return new THREE.BoxGeometry(1.6, 1.6, 1.6);
    case "esfera":
      return new THREE.SphereGeometry(1.4, 48, 32);
    case "piramide": {
      const geom = new THREE.ConeGeometry(1.5, 2.2, 4);
      geom.rotateY(Math.PI / 4);
      return geom;
    }
    case "cilindro":
      return new THREE.CylinderGeometry(1.1, 1.1, 2.2, 40);
    case "prisma": {
      const shape = new THREE.Shape();
      shape.moveTo(0, 1);
      shape.lineTo(-1, -1);
      shape.lineTo(1, -1);
      shape.lineTo(0, 1);

      const extrude = new THREE.ExtrudeGeometry(shape, {
        depth: 1.6,
        bevelEnabled: false,
      });
      extrude.center();
      return extrude;
    }
    default:
      return new THREE.BoxGeometry(1, 1, 1);
  }
}

const Geometry3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [selectedId, setSelectedId] = useState<ShapeId>("cubo");
  const [info, setInfo] = useState<ShapeInfo>(SHAPES[0]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x111827, 1.1);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(4, 6, 4);
    dir.castShadow = true;
    scene.add(dir);

    const baseGeo = new THREE.CircleGeometry(2.8, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x020817,
      roughness: 0.95,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.rotation.x = -Math.PI / 2;
    base.position.y = -1.4;
    base.receiveShadow = true;
    scene.add(base);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    const initial = SHAPES[0];
    const geom = createGeometry(initial.id);
    const mat = new THREE.MeshStandardMaterial({
      color: initial.color,
      roughness: 0.35,
      metalness: 0.35,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    meshRef.current = mesh;
    scene.add(mesh);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.004;
      }
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      const m = mountRef.current;
      if (!m || !cameraRef.current || !rendererRef.current) return;
      const w = m.clientWidth || 600;
      const h = 360;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        if (rendererRef.current.domElement.parentElement === mount) {
          mount.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const shape = SHAPES.find((s) => s.id === selectedId)!;
    setInfo(shape);

    if (meshRef.current) {
      scene.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      (meshRef.current.material as THREE.Material).dispose();
      meshRef.current = null;
    }

    const geom = createGeometry(shape.id);
    const mat = new THREE.MeshStandardMaterial({
      color: shape.color,
      roughness: 0.35,
      metalness: 0.35,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    meshRef.current = mesh;
    scene.add(mesh);
  }, [selectedId]);

  const handlePrev = () => {
    const idx = SHAPES.findIndex((s) => s.id === selectedId);
    const nextIndex = (idx - 1 + SHAPES.length) % SHAPES.length;
    setSelectedId(SHAPES[nextIndex].id);
  };

  const handleNext = () => {
    const idx = SHAPES.findIndex((s) => s.id === selectedId);
    const nextIndex = (idx + 1) % SHAPES.length;
    setSelectedId(SHAPES[nextIndex].id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-100">
        Explorador 3D de Figuras Geométricas
      </h1>
      <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 max-w-3xl">
        Gira la figura con el mouse y cambia entre cuerpos geométricos para
        visualizar caras, aristas y vértices.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {SHAPES.map((shape) => (
          <button
            key={shape.id}
            onClick={() => setSelectedId(shape.id)}
            className={`px-3 py-2 rounded-full text-xs sm:text-sm border transition font-medium ${
              selectedId === shape.id
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100"
            }`}
          >
            {shape.nombre}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-3 mb-4">
        <button
          onClick={handlePrev}
          className="px-3 py-2 rounded-full border text-xs sm:text-sm bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          ⬅️
        </button>

        <div
          ref={mountRef}
          className="flex-1 max-w-xl h-[360px] rounded-2xl shadow-lg bg-slate-900/90 overflow-hidden"
        />

        <button
          onClick={handleNext}
          className="px-3 py-2 rounded-full border text-xs sm:text-sm bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          ➡️
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {info.nombre}
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            {info.descripcion}
          </p>
          <div className="flex flex-wrap gap-6 text-xs mt-1">
            <div>
              <span className="font-semibold">Caras: </span>
              <span>{info.caras}</span>
            </div>
            <div>
              <span className="font-semibold">Aristas: </span>
              <span>{info.aristas}</span>
            </div>
            <div>
              <span className="font-semibold">Vértices: </span>
              <span>{info.vertices}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geometry3D;
