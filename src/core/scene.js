import * as THREE from "three";
import { createOmnitrix } from "../objects/omnitrix.js";
import { createEnergyParticles } from "../effects/particles.js";
import { createGlowComposer } from "../effects/glow.js";

export function initScene() {
  const canvas = document.querySelector("#three-canvas");
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010502, 0.05);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.3, 5.5);
  camera.lookAt(0, 0, 0);

  // Cinematic Continuous Camera Path
  const curvePoints = [
    new THREE.Vector3(0, 0.3, 5.5),
    new THREE.Vector3(0.15, 0.1, 4.8),
    new THREE.Vector3(-0.2, 0.2, 5.0),
    new THREE.Vector3(0, -0.1, 6.0),
    new THREE.Vector3(0.1, 0.3, 5.3),
    new THREE.Vector3(0, 0.5, 3.0),
    new THREE.Vector3(0, 0.3, 5.5)
  ];
  const cameraPath = new THREE.CatmullRomCurve3(curvePoints);
  
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Lighting - dramatic high contrast
  const ambientLight = new THREE.AmbientLight(0x050a06, 0.4);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x33ff77, 0x000a05, 0.3);
  scene.add(hemiLight);

  const key = new THREE.PointLight(0x00ff41, 15, 30);
  key.position.set(0, 0.8, 3);
  scene.add(key);

  const fillLight = new THREE.PointLight(0x00aa33, 8, 25);
  fillLight.position.set(-2, 0, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x88ffaa, 5, 20);
  rimLight.position.set(2, -1, -2);
  scene.add(rimLight);

  // Omnitrix 3D Object
  const omnitrix = createOmnitrix();
  omnitrix.position.set(0, 0, 0);
  scene.add(omnitrix);

  // Particles
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const particleCount = isMobile ? 1000 : 3000; // Adjusted for perf
  const particles = createEnergyParticles(omnitrix, particleCount);

  // Post-processing
  const { composer, bloom } = createGlowComposer(renderer, scene, camera);
  bloom.strength = 1.0; // Subtler bloom

  const updatables = [particles];

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", handleResize);

  return {
    scene,
    camera,
    cameraPath,
    renderer,
    composer,
    bloom,
    omnitrix,
    energyLight: key,
    fillLight,
    rimLight,
    update(time) {
      for (const unit of updatables) unit.update?.(time);

      if (omnitrix.userData.centerGem) {
        omnitrix.userData.centerGem.rotation.y = time * 0.2;
        omnitrix.userData.centerGem.rotation.x = Math.sin(time * 0.15) * 0.1;
      }
    },
    render() {
      composer.render();
    },
  };
}
