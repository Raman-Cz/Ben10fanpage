import * as THREE from "three";
import { createOmnitrix } from "../objects/omnitrix.js";
import { createEnergyParticles } from "../effects/particles.js";
import { createGlowComposer } from "../effects/glow.js";
import { gsap, ScrollTrigger } from "./scroll.js";

const CHAPTER_COLORS = {
  0: 0x00ff41,  // Prologue - Green
  1: 0x00ff41,  // Discovery - Green
  2: 0xff6b00,  // Aliens - Orange/Heatblast (changes per alien)
  3: 0x4488ff,  // Plumbers - Blue
  4: 0xff0033,  // Villains - Red
  5: 0x7733cc,  // Ghostfreak - Purple
  6: 0xaaffcc,  // Climax - White-green
  7: 0xd4a849,  // Legacy - Gold
};

export function initScene() {
  const canvas = document.querySelector("#three-canvas");
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010a04, 0.04);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.3, 5.5);
  camera.lookAt(0, 0, 0);

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

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0a1a0d, 0.3);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x33ff77, 0x001a05, 0.5);
  scene.add(hemiLight);

  const key = new THREE.PointLight(0x00ff41, 20, 25);
  key.position.set(0, 0.8, 3);
  scene.add(key);

  const fillLight = new THREE.PointLight(0x00cc33, 10, 20);
  fillLight.position.set(-2, 0, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x88ffaa, 6, 15);
  rimLight.position.set(2, -1, -2);
  scene.add(rimLight);

  // Omnitrix 3D Object
  const omnitrix = createOmnitrix();
  omnitrix.position.set(0, 0, 0);
  scene.add(omnitrix);

  // Particles
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const particleCount = isMobile ? 1500 : 4000;
  const particles = createEnergyParticles(omnitrix, particleCount);

  // Post-processing
  const { composer, bloom } = createGlowComposer(renderer, scene, camera);
  bloom.strength = 1.2; // Subtler bloom

  // Chapter-based color shifting
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter, index) => {
    const chapterNum = parseInt(chapter.dataset.chapter);
    const color = CHAPTER_COLORS[chapterNum] || 0x00ff41;
    
    ScrollTrigger.create({
      trigger: chapter,
      start: "top 40%",
      end: "bottom 40%",
      onEnter: () => shiftEnergyColor(key, color),
      onEnterBack: () => shiftEnergyColor(key, color),
    });
  });

  function shiftEnergyColor(light, color) {
    gsap.to(light.color, {
      r: new THREE.Color(color).r,
      g: new THREE.Color(color).g,
      b: new THREE.Color(color).b,
      duration: 0.8,
      ease: "power2.out",
    });
  }

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
        omnitrix.userData.centerGem.rotation.y = time * 0.4;
        omnitrix.userData.centerGem.rotation.x =
          Math.sin(time * 0.25) * 0.15;
      }
    },
    render() {
      composer.render();
    },
  };
}
