// src/components/Ciencias/CicloAgua.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type StageId = "evaporacion" | "condensacion" | "precipitacion" | "escorrentia";

const stageDescriptions: Record<StageId, string> = {
  evaporacion:
    "El Sol calienta el agua del océano o lago. Parte del agua se transforma en vapor y sube hacia el cielo.",
  condensacion:
    "El vapor de agua se enfría en la atmósfera y se agrupa formando nubes más grandes y densas.",
  precipitacion:
    "Las nubes muy cargadas dejan caer el agua en forma de lluvia sobre montañas, bosques y ríos.",
  escorrentia:
    "El agua de lluvia baja por riachuelos y ríos hasta llegar nuevamente al océano o lago, recuperando su nivel.",
};

const CicloAgua: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<StageId>("evaporacion");
  const [currentStage, setCurrentStage] = useState<StageId>("evaporacion");

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 420;

    // Escena y cámara (vista panorámica/isométrica)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(16, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Controles (mouse)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 14;
    controls.maxDistance = 32;
    controls.maxPolarAngle = Math.PI / 2.1;

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(-15, 20, 10);
    scene.add(dir);

    // Terreno
    const groundGeo = new THREE.PlaneGeometry(50, 30);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x4f8a3b });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    scene.add(ground);

    // Océano: lado izquierdo, orgánico, con escala animable
    const oceanGeo = new THREE.PlaneGeometry(18, 12, 1, 1);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      shininess: 80,
      transparent: true,
      opacity: 0.95,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.set(-13, -1.9, 0);
    ocean.scale.set(0.5, 0.5, 1); // empieza más pequeño, crecerá con el ciclo
    scene.add(ocean);

    // Montaña principal
    const mountainGeo = new THREE.ConeGeometry(4.5, 8, 40);
    const mountainMat = new THREE.MeshPhongMaterial({ color: 0x446633 });
    const mountain = new THREE.Mesh(mountainGeo, mountainMat);
    mountain.position.set(9, 1, -2);
    scene.add(mountain);

    // Vegetación (árboles)
    const makeTree = (x: number, z: number) => {
      const tree = new THREE.Group();

      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.25, 1.4, 8);
      const trunkMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = -1.4 + 0.7;
      tree.add(trunk);

      const leavesGeo = new THREE.ConeGeometry(1, 1.9, 12);
      const leavesMat = new THREE.MeshPhongMaterial({ color: 0x2e8b57 });
      const leaves = new THREE.Mesh(leavesGeo, leavesMat);
      leaves.position.y = -1.4 + 2.0;
      tree.add(leaves);

      tree.position.set(x, 0, z);
      scene.add(tree);
    };

    makeTree(4, 4);
    makeTree(6, 2);
    makeTree(8, -3);
    makeTree(2, -2);
    makeTree(-4, 3);

    // Sol sobre el océano
    const sunGeo = new THREE.SphereGeometry(1.7, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.set(-15, 9, -8);
    scene.add(sun);

    // Nubes
    const clouds: THREE.Mesh[] = [];
    const baseCloudMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.97,
    });

    const createCloud = (x: number, y: number, z: number) => {
      const g = new THREE.SphereGeometry(0.9 + Math.random() * 0.6, 18, 18);
      const m = baseCloudMat.clone();
      const c = new THREE.Mesh(g, m);
      c.position.set(x, y, z);
      scene.add(c);
      clouds.push(c);
    };

    createCloud(-1, 8, -2);
    createCloud(2, 8.4, -1);
    createCloud(5, 8, -2);

    // Vapor desde el océano
    const vaporParticles: THREE.Mesh[] = [];
    const vaporGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const vaporMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    for (let i = 0; i < 60; i++) {
      const p = new THREE.Mesh(vaporGeo, vaporMat.clone());
      p.position.set(
        ocean.position.x + (Math.random() - 0.5) * 10,
        -1.9 + Math.random() * 0.4,
        (Math.random() - 0.5) * 5
      );
      p.visible = false;
      scene.add(p);
      vaporParticles.push(p);
    }

    // Riachuelos: montaña -> quebrada -> río -> océano
    const streamMat = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      transparent: true,
      opacity: 0.9,
    });

    // riachuelo alto
    const stream1 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 0.4),
      streamMat.clone()
    );
    stream1.rotation.x = -Math.PI / 2;
    stream1.rotation.z = -Math.PI / 10;
    stream1.position.set(8.5, -1.9, -1);
    stream1.visible = false;
    scene.add(stream1);

    // quebrada media
    const stream2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 0.6),
      streamMat.clone()
    );
    stream2.rotation.x = -Math.PI / 2;
    stream2.rotation.z = -Math.PI / 14;
    stream2.position.set(5.5, -1.92, 0);
    stream2.visible = false;
    scene.add(stream2);

    // río ancho hacia el océano
    const stream3 = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 1),
      streamMat.clone()
    );
    stream3.rotation.x = -Math.PI / 2;
    stream3.rotation.z = -Math.PI / 16;
    stream3.position.set(0, -1.94, 0.5);
    stream3.visible = false;
    scene.add(stream3);

    // Lluvia
    const raindrops: THREE.Mesh[] = [];
    const dropGeo = new THREE.CylinderGeometry(0.03, 0.01, 0.4, 6);
    const dropMat = new THREE.MeshPhongMaterial({ color: 0x00bfff });
    for (let i = 0; i < 180; i++) {
      const d = new THREE.Mesh(dropGeo, dropMat);
      d.rotation.x = Math.PI / 2;
      d.position.set(
        2 + (Math.random() - 0.5) * 8,
        8 + Math.random() * 2,
        -1 + (Math.random() - 0.5) * 5
      );
      d.visible = false;
      scene.add(d);
      raindrops.push(d);
    }

    // Variables de animación
    let oceanScale = 0.5; // tamaño del océano (escala)
    let targetOceanScale = 0.5;

    const darkCloudColor = new THREE.Color(0x444444);
    const whiteCloudColor = new THREE.Color(0xffffff);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const stage = stageRef.current;

      // Sol suave
      sun.rotation.y += 0.002;

      // Por defecto
      vaporParticles.forEach((p) => (p.visible = false));

      // EVAPORACIÓN
      if (stage === "evaporacion") {
        targetOceanScale = 0.45; // baja un poco
        sunMat.color.set(0xffd700);

        vaporParticles.forEach((p) => {
          p.visible = true;
          p.position.y += 0.04;
          if (p.position.y > 7) p.position.y = -1.9;
        });

        clouds.forEach((c, i) => {
          const mat = c.material as THREE.MeshPhongMaterial;
          mat.color.lerp(whiteCloudColor, 0.3);
          c.scale.set(1, 1, 1);
          c.position.x += Math.sin(t * 0.25 + i) * 0.003;
        });

        raindrops.forEach((d) => (d.visible = false));
        stream1.visible = stream2.visible = stream3.visible = false;
      }

      // CONDENSACIÓN
      if (stage === "condensacion") {
        targetOceanScale = 0.45;
        clouds.forEach((c, i) => {
          c.scale.set(1.4, 1.25, 1.4);
          c.position.x += Math.sin(t * 0.6 + i) * 0.01;
          const mat = c.material as THREE.MeshPhongMaterial;
          mat.color.lerp(darkCloudColor, 0.06);
        });
        raindrops.forEach((d) => (d.visible = false));
        stream1.visible = stream2.visible = stream3.visible = false;
      }

      // PRECIPITACIÓN
      if (stage === "precipitacion") {
        // Nubes oscuras que descargan
        clouds.forEach((c) => {
          c.scale.set(1.5, 1.3, 1.5);
          const mat = c.material as THREE.MeshPhongMaterial;
          mat.color.lerp(darkCloudColor, 0.08);
        });

        raindrops.forEach((d) => {
          d.visible = true;
          d.position.y -= 0.3;
          if (d.position.y < -2) d.position.y = 8.5;
        });

        // El océano empieza a crecer poco a poco
        targetOceanScale = 0.7;

        // Aparecen los primeros tramos de agua bajando (suave)
        stream1.visible = true;
        stream2.visible = true;
        (stream1.material as THREE.MeshPhongMaterial).opacity = 0.6;
        (stream2.material as THREE.MeshPhongMaterial).opacity = 0.4;
        stream3.visible = false;
      }

      // ESCORRENTÍA
      if (stage === "escorrentia") {
        raindrops.forEach((d) => (d.visible = false));

        // Nubes se van aclarando
        clouds.forEach((c) => {
          const mat = c.material as THREE.MeshPhongMaterial;
          mat.color.lerp(whiteCloudColor, 0.06);
          c.scale.set(1.2, 1.15, 1.2);
        });

        // Riachuelos y río completos
        stream1.visible = stream2.visible = stream3.visible = true;
        const pulse = (Math.sin(t * 3) + 1) / 2;
        (stream1.material as THREE.MeshPhongMaterial).color.setHSL(
          0.55,
          0.9,
          0.45 + pulse * 0.02
        );
        (stream2.material as THREE.MeshPhongMaterial).color.setHSL(
          0.55,
          0.9,
          0.43 + pulse * 0.02
        );
        (stream3.material as THREE.MeshPhongMaterial).color.setHSL(
          0.55,
          0.9,
          0.4 + pulse * 0.02
        );

        // El océano termina de recuperar nivel/tamaño
        targetOceanScale = 1.0;
      }

      // Interpolación suave del tamaño del océano
      oceanScale += (targetOceanScale - oceanScale) * 0.04;
      ocean.scale.set(oceanScale, oceanScale, 1);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const changeStage = (stage: StageId) => {
    setCurrentStage(stage);
    stageRef.current = stage;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        Ciclo del Agua 3D Interactivo
      </h1>
      <p className="text-slate-700 dark:text-slate-300 mb-3 max-w-4xl">
        Paisaje completo con océano, montaña, ríos, nubes y vegetación. Usa el
        mouse para girar la escena y selecciona cada fase para ver cómo el agua
        se mueve a través del ciclo.
      </p>

      {/* Controles de fases */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => changeStage("evaporacion")}
          className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border ${
            currentStage === "evaporacion"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100"
          }`}
        >
          ☀️ Evaporación
        </button>
        <button
          onClick={() => changeStage("condensacion")}
          className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border ${
            currentStage === "condensacion"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100"
          }`}
        >
          ☁️ Condensación
        </button>
        <button
          onClick={() => changeStage("precipitacion")}
          className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border ${
            currentStage === "precipitacion"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100"
          }`}
        >
          🌧️ Precipitación
        </button>
        <button
          onClick={() => changeStage("escorrentia")}
          className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border ${
            currentStage === "escorrentia"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100"
          }`}
        >
          🌊 Escorrentía
        </button>
      </div>

      {/* Canvas 3D único */}
      <div
        ref={mountRef}
        className="w-full max-w-6xl mx-auto rounded-xl shadow-md bg-black mb-4"
        style={{ height: 420 }}
      />

      {/* Texto SOLO de la fase actual */}
      <div className="max-w-6xl mx-auto mt-2">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs">
          <strong className="block mb-1">
            {currentStage === "evaporacion" && "☀️ Evaporación"}
            {currentStage === "condensacion" && "☁️ Condensación"}
            {currentStage === "precipitacion" && "🌧️ Precipitación"}
            {currentStage === "escorrentia" && "🌊 Escorrentía"}
          </strong>
          <span className="text-slate-700 dark:text-slate-300">
            {stageDescriptions[currentStage]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CicloAgua;
