import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initTransformationSection(sceneContext) {
  const section = document.querySelector("#transformation");
  const flash = document.querySelector("#flash-overlay");
  const silhouettes = document.querySelectorAll(".silhouette");
  const copy = document.querySelector(".transform-copy");
  const dnaContainer = document.querySelector("#dna-helix");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=350%",
      scrub: 1,
      pin: true
    }
  });

  tl.fromTo(copy, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.2 }, 0);
  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 2, duration: 0.3, ease: "power1.inOut" }, 0.1);
  tl.to(sceneContext.energyLight, { intensity: 40, duration: 0.2 }, 0.15);

  silhouettes.forEach((sil, i) => {
    tl.to(sil, { opacity: 1, scale: 1, duration: 0.08 }, 0.2 + i * 0.06);
    tl.to(sil, { opacity: 0, scale: 1.05, duration: 0.08 }, 0.28 + i * 0.06);
  });

  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 6, duration: 0.4, ease: "power2.in" }, 0.5);
  tl.to(sceneContext.energyLight, { intensity: 60, color: 0xffffff, duration: 0.15 }, 0.65);
  tl.to(flash, { opacity: 0.95, duration: 0.08 }, 0.8);
  tl.to(flash, { opacity: 0, duration: 0.15 }, 0.9);

  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 8, duration: 0.2, ease: "power4.out" }, 0.85);
  tl.to(sceneContext.camera.position, { z: 3, duration: 0.2 }, 0.85);

  ScrollTrigger.refresh();
}
