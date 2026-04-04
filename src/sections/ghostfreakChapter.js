import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initGhostfreakChapter(sceneContext) {
  const section = document.querySelector("#ghostfreak-chapter");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const img = section.querySelector(".ghostfreak-img");
  const tendrils = section.querySelector(".ghostfreak-tendrils");
  const glowRing = section.querySelector(".ghostfreak-glow-ring");

  // Tag + heading
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(heading, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });

  // Ghostfreak image — dramatic entrance
  if (img) {
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.7, filter: "brightness(0) blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 40px rgba(119,51,204,0.5)) brightness(0.9) contrast(1.1)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Tendrils fade in
  if (tendrils) {
    gsap.fromTo(tendrils, { opacity: 0 }, {
      opacity: 1, duration: 2, ease: "power1.out",
      scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
    });
  }

  // Glow ring
  if (glowRing) {
    gsap.fromTo(glowRing, { opacity: 0, scale: 0.5 }, {
      opacity: 0.5, scale: 1, duration: 1.5, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
    });
  }

  // Narration lines — slower, more atmospheric reveal
  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Chapter-reactive lighting — shift to purple
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });

  tl.to(sceneContext.energyLight, { intensity: 8, duration: 0.5 }, 0);
  tl.to(sceneContext.camera.position, { x: 0.1, z: 5.5, duration: 0.5 }, 0);
}
