import { gsap, ScrollTrigger } from "../core/scroll.js";
import { buildSilhouettes } from "../objects/alienSilhouettes.js";

export function initTransformationSection(sceneContext) {
  const section = document.querySelector("#transformation");
  const flash = document.querySelector("#flash-overlay");
  const stack = document.querySelector("#silhouette-stack");
  const silhouettes = buildSilhouettes(stack);
  const copy = document.querySelector(".transform-copy");
  const omnitrixImg = document.querySelector(".transform-omnitrix img");

  gsap.fromTo(copy, 
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 70%" }}
  );

  gsap.fromTo(omnitrixImg,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 70%" }}
  );

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=300%",
      scrub: 1.5,
      pin: true
    }
  });

  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 2, duration: 0.25, ease: "power1.inOut" }, 0);
  tl.to(sceneContext.energyLight, { intensity: 35, duration: 0.2 }, 0.1);

  silhouettes.forEach((sil, i) => {
    tl.to(sil, { opacity: 1, scale: 1, duration: 0.1 }, 0.15 + i * 0.05);
    tl.to(sil, { opacity: 0, scale: 1.03, duration: 0.1 }, 0.25 + i * 0.05);
  });

  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 5, duration: 0.35, ease: "power2.in" }, 0.4);
  tl.to(sceneContext.energyLight, { intensity: 55, duration: 0.12 }, 0.55);
  tl.to(flash, { opacity: 0.9, duration: 0.08 }, 0.72);
  tl.to(flash, { opacity: 0, duration: 0.15 }, 0.82);

  tl.to(sceneContext.omnitrix.userData.dial.rotation, { y: Math.PI * 8, duration: 0.2, ease: "power4.out" }, 0.8);
  tl.to(sceneContext.camera.position, { z: 3, duration: 0.2 }, 0.8);

  ScrollTrigger.refresh();
}
