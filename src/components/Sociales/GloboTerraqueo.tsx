// src/components/Sociales/GloboTerraqueo.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type MarkerId =
  | "colombia"
  | "suramerica"
  | "norteamerica"
  | "europa"
  | "africa"
  | "asia"
  | "oceania"
  | "global";

interface MarkerInfo {
  id: MarkerId;
  name: string;
  description: string;
  lat: number; // grados
  lon: number; // grados
  activity: string;
}

// Coordenadas aproximadas, solo con fines didácticos.
const MARKERS: MarkerInfo[] = [
  {
    id: "colombia",
    name: "Colombia",
    lat: 4,
    lon: -74,
    description:
      "Colombia está ubicada en el noroeste de América del Sur. Tiene costas en el océano Pacífico y el mar Caribe, cordillera de los Andes y gran diversidad cultural y natural.",
    activity:
      "Pide a los estudiantes ubicar Colombia en el globo y mencionar con qué océanos limita y en qué continente se encuentra.",
  },
  {
    id: "suramerica",
    name: "América del Sur",
    lat: -15,
    lon: -60,
    description:
      "América del Sur incluye países como Colombia, Brasil, Argentina, Perú y Chile. Destaca por la selva amazónica y la cordillera de los Andes.",
    activity:
      "Invita a los estudiantes a nombrar al menos tres países de América del Sur y un elemento natural importante de la región.",
  },
  {
    id: "norteamerica",
    name: "América del Norte",
    lat: 40,
    lon: -100,
    description:
      "América del Norte incluye Canadá, Estados Unidos y México, con gran variedad de climas y ciudades importantes.",
    activity:
      "Pide que comparen la ubicación de América del Norte con América del Sur y mencionen un país de cada región.",
  },
  {
    id: "europa",
    name: "Europa",
    lat: 50,
    lon: 10,
    description:
      "Europa se encuentra al norte de África y al oeste de Asia. Posee gran riqueza histórica y cultural.",
    activity:
      "Solicita a los estudiantes identificar un país europeo y comentar un aporte cultural o histórico conocido.",
  },
  {
    id: "africa",
    name: "África",
    lat: 8,
    lon: 21,
    description:
      "África es el segundo continente más grande. Alberga el Sahara, la sabana y el río Nilo, entre otros.",
    activity:
      "Pregunta qué desierto famoso está en África y en qué parte del continente se encuentra aproximadamente.",
  },
  {
    id: "asia",
    name: "Asia",
    lat: 30,
    lon: 100,
    description:
      "Asia es el continente más grande y poblado, con países como China, India y Japón.",
    activity:
      "Pide ubicar Asia y mencionar por qué se dice que es el continente más poblado.",
  },
  {
    id: "oceania",
    name: "Oceanía",
    lat: -20,
    lon: 135,
    description:
      "Oceanía incluye Australia, Nueva Zelanda y numerosas islas del Pacífico.",
    activity:
      "Invita a los estudiantes a localizar Australia en el globo y decir con qué océano está rodeada.",
  },
  {
    id: "global",
    name: "Planeta Tierra",
    lat: 0,
    lon: 0,
    description:
      "La Tierra es nuestro hogar. Este globo permite observar la distribución general de continentes y océanos.",
    activity:
      "Pide que identifiquen cuántos continentes se observan y nombren al menos tres océanos.",
  },
];

// lat/lon → posición 3D en la esfera
function latLonToVector3(
  radius: number,
  latDeg: number,
  lonDeg: number
): THREE.Vector3 {
  const lat = THREE.MathUtils.degToRad(latDeg);
  const lon = THREE.MathUtils.degToRad(lonDeg);

  const x = radius * Math.cos(lat) * Math.sin(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.cos(lon);

  return new THREE.Vector3(x, y, z);
}

const GloboTerraqueo: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<MarkerInfo | null>(
    MARKERS.find((m) => m.id === "colombia") || MARKERS[0]
  );

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number | null>(null);

  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const mouseRef = useRef<THREE.Vector2 | null>(null);
  const markerMeshesRef = useRef<{ mesh: THREE.Mesh; info: MarkerInfo }[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = 420;

    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020817);
    sceneRef.current = scene;

    // Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 100);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 5, 5);
    dir.castShadow = true;
    scene.add(dir);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.7;
    controls.minDistance = 5;
    controls.maxDistance = 12;
    controlsRef.current = controls;

    // Grupo del globo
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const radius = 2.2;

    // Textura de la Tierra
    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
    const texLoader = new THREE.TextureLoader();

    const earthTexture = texLoader.load(
      "/textures/earth/earth.jpg",
      undefined,
      undefined,
      () => {
        console.warn(
          "No se pudo cargar /textures/earth/earth.jpg. Verifica la ruta."
        );
      }
    );

    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.95,
      metalness: 0.0,
    });

    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    globeGroup.add(sphere);

    // Wireframe suave
    const wireGeo = new THREE.SphereGeometry(radius + 0.01, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wire);

    // Raycaster y mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    raycasterRef.current = raycaster;
    mouseRef.current = mouse;

    // Marcadores (color tomate)
    const markerColor = 0xf97316;
    markerMeshesRef.current = [];

    MARKERS.forEach((info) => {
      const pos = latLonToVector3(radius + 0.08, info.lat, info.lon);
      const geo = new THREE.SphereGeometry(0.11, 18, 18);
      const mat = new THREE.MeshBasicMaterial({ color: markerColor });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.lookAt(pos.clone().multiplyScalar(2));

      globeGroup.add(mesh);
      markerMeshesRef.current.push({ mesh, info });
    });

    // Click sobre marcadores
    const handleClick = (event: MouseEvent) => {
      if (
        !rendererRef.current ||
        !cameraRef.current ||
        !raycasterRef.current ||
        !mouseRef.current
      ) {
        return;
      }

      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current.set(x, y);
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const meshes = markerMeshesRef.current.map((m) => m.mesh);
      const intersects = raycasterRef.current.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = markerMeshesRef.current.find((m) => m.mesh === hit);
        if (found) {
          setSelected(found.info);
        }
      }
    };

    renderer.domElement.addEventListener("click", handleClick);

    // Animación (sin giro automático, solo controles del usuario)
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Resize
    const handleResize = () => {
      const m = mountRef.current;
      if (!m || !cameraRef.current || !rendererRef.current) return;
      const w = m.clientWidth || 600;
      const h = 420;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handleClick);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      if (rendererRef.current) {
        if (rendererRef.current.domElement.parentElement === mount) {
          mount.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }

      markerMeshesRef.current = [];

      if (globeGroupRef.current && sceneRef.current) {
        sceneRef.current.remove(globeGroupRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 text-slate-800 dark:text-slate-100">
      <h1 className="text-2xl font-bold mb-1">
        Ciencias Sociales - Globo Terráqueo Interactivo
      </h1>
      <p className="text-sm mb-2 max-w-3xl">
        Explora el planeta Tierra en 3D. Usa el mouse para girar el globo y haz
        clic sobre los puntos de color tomate para ver información básica de
        cada región.
      </p>
      <p className="text-[11px] text-amber-400 mb-3">
        ⚠ Nota: la ubicación de los puntos es aproximada y con fines didácticos;
        no representa coordenadas geográficas exactas.
      </p>

      <div
        ref={mountRef}
        className="w-full h-[420px] rounded-2xl shadow-lg bg-slate-900/90 overflow-hidden mb-4"
      />

      {selected && (
        <div className="max-w-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm space-y-1">
          <div className="text-xs uppercase text-slate-500">
            Región seleccionada
          </div>
          <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {selected.name}
          </h2>
          <p className="text-slate-700 dark:text-slate-200">
            {selected.description}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Actividad sugerida: {selected.activity}
          </p>
        </div>
      )}
    </div>
  );
};

export default GloboTerraqueo;
