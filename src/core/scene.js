import * as THREE from "three";
import { createOmnitrix } from "../objects/omnitrix.js";
import { createEnergyParticles } from "../effects/particles.js";
import { createGlowComposer } from "../effects/glow.js";

export function initScene() {
  const canvas = document.querySelector("#three-canvas");
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010a04, 0.035);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.3, 5.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const ambientLight = new THREE.AmbientLight(0x0a1a0d, 0.4);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x33ff77, 0x001a05, 0.6);
  scene.add(hemiLight);

  const key = new THREE.PointLight(0x00ff41, 25, 25);
  key.position.set(0, 0.8, 3);
  scene.add(key);

  const fillLight = new THREE.PointLight(0x00cc33, 12, 20);
  fillLight.position.set(-2, 0, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x88ffaa, 8, 15);
  rimLight.position.set(2, -1, -2);
  scene.add(rimLight);

  const omnitrix = createOmnitrix();
  omnitrix.position.set(0, 0, 0);
  scene.add(omnitrix);

  const particleCount = window.matchMedia("(max-width: 900px)").matches ? 2000 : 5000;
  const particles = createEnergyParticles(omnitrix, particleCount);
  const { composer, bloom } = createGlowComposer(renderer, scene, camera);

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
        omnitrix.userData.centerGem.rotation.y = time * 0.5;
        omnitrix.userData.centerGem.rotation.x = Math.sin(time * 0.3) * 0.2;
      }
    },
    render() {
      composer.render();
    }
  };
}
