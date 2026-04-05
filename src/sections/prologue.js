import { gsap, ScrollTrigger } from "../core/scroll.js";
import { createMasqTextReveal, createFadeUp } from "../utils/animations.js";
import { EASES } from "../utils/easing.js";
import * as THREE from "three";

export function initPrologue(sceneContext) {
  const section = document.querySelector("#prologue");
  const title = document.querySelector("#prologue-title");
  const cue = document.querySelector(".scroll-cue");
  const badge = document.querySelector(".prologue-badge");
  const subtitle = document.querySelector(".prologue-subtitle");
  const stats = document.querySelector(".prologue-stats");
  const hero = document.querySelector(".prologue-hero");
  const visuals = document.querySelector(".prologue-visuals");

  if (!section || !title) return;

  // Master Intro Timeline (Plays on load)
  const introTl = gsap.timeline();

  introTl.add(createFadeUp(badge, { duration: 0.8, y: 20 }), 0.3);
  
  // Custom visual reveal
  gsap.set(visuals, { opacity: 0, x: -30, scale: 0.95 });
  introTl.to(visuals, { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" }, 0.4);

  // Cinematic masked text reveal for title
  introTl.add(createMasqTextReveal(title, { duration: 1.2, stagger: 0.05 }), 0.8);

  introTl.add(createFadeUp(subtitle, { duration: 0.8 }), 1.4);
  introTl.add(createFadeUp(stats, { duration: 0.8 }), 1.6);
  
  // Scroll cue pulse animation
  gsap.to(cue, {
    y: 8,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    delay: 2.2,
  });

  // Scroll Sequence (Scrubbed)
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=400%",
      scrub: 2,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Parallax out everything
  scrollTl.to(hero, { x: -100, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0);
  
  // Gather nested word elements for reverse mask scroll-out
  const words = title.querySelectorAll(".word-inner");
  if (words.length > 0) {
    scrollTl.to(words, { yPercent: -120, opacity: 0, stagger: 0.02, duration: 0.3, ease: "power2.in" }, 0);
  }

  scrollTl.to([badge, subtitle, stats, cue], { opacity: 0, y: -25, duration: 0.25, ease: "power2.in" }, 0.05);
  
  // Omnitrix expansion effect
  scrollTl.to(
    sceneContext.omnitrix.scale,
    { x: 1.4, y: 1.4, z: 1.4, duration: 0.5, ease: "power2.out" },
    0
  );
  scrollTl.to(sceneContext.energyLight, { intensity: 40, duration: 0.3 }, 0.1);
  
  // Move camera along path
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0 };
    scrollTl.to(camPosition, {
      t: 0.15, // Move 15% along the path during prologue scroll out
      duration: 0.5,
      ease: "sine.inOut",
      onUpdate: () => {
        const point = sceneContext.cameraPath.getPointAt(camPosition.t);
        sceneContext.camera.position.copy(point);
      }
    }, 0);
  } else {
    scrollTl.to(sceneContext.camera.position, { z: 3.5, duration: 0.3 }, 0.2);
  }
}

