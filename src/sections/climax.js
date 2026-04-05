import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initClimax(sceneContext) {
  const section = document.querySelector("#climax");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const split = section.querySelector(".climax-split");
  const heroImg = section.querySelector(".climax-hero-img");
  const villainImg = section.querySelector(".climax-villain-img");
  const vs = section.querySelector(".climax-vs");

  // Tag + heading (scrubbed)
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "none",
    scrollTrigger: { trigger: section, start: "top 80%", end: "top 55%", scrub: 1 },
  });

  gsap.fromTo(heading, { opacity: 0, filter: "blur(4px)" }, {
    opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "none",
    scrollTrigger: { trigger: section, start: "top 75%", end: "top 45%", scrub: 1 },
  });

  // Split entrance — hero slides from left, villain from right (scrubbed)
  if (heroImg) {
    gsap.fromTo(heroImg, { opacity: 0, x: -60, scale: 0.8 }, {
      opacity: 1, x: 0, scale: 1, duration: 1, ease: "none",
      scrollTrigger: { trigger: split, start: "top 80%", end: "top 45%", scrub: 1 },
    });
  }

  if (villainImg) {
    gsap.fromTo(villainImg, { opacity: 0, x: 60, scale: 0.8 }, {
      opacity: 1, x: 0, scale: 1, duration: 1, ease: "none",
      scrollTrigger: { trigger: split, start: "top 80%", end: "top 45%", scrub: 1 },
    });
  }

  // VS text (scrubbed)
  if (vs) {
    gsap.fromTo(vs, { opacity: 0, scale: 0 }, {
      opacity: 0.4, scale: 1, duration: 0.6, ease: "none",
      scrollTrigger: { trigger: split, start: "top 75%", end: "top 40%", scrub: 1 },
    });
  }

  // Narration lines (scrubbed)
  lines.forEach((line) => {
    gsap.fromTo(line, { opacity: 0, y: 25, filter: "blur(4px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "none",
      scrollTrigger: {
        trigger: line,
        start: "top 92%",
        end: "top 65%",
        scrub: 1,
      },
    });
  });

  // Energy clash pulsing at center
  const clashZone = document.createElement("div");
  clashZone.className = "energy-clash";
  split?.appendChild(clashZone);
  
  gsap.fromTo(clashZone,
    { opacity: 0, scale: 0.5 },
    {
      opacity: 0.6,
      scale: 1.2,
      duration: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        end: "bottom 60%",
        scrub: 1,
      }
    }
  );

  // Flash at the climactic moment — triggered deep into scroll
  const flash = document.querySelector("#flash-overlay");
  if (flash) {
    ScrollTrigger.create({
      trigger: section,
      start: "center center",
      onEnter: () => {
        gsap.timeline()
          .to(flash, { opacity: 0.7, duration: 0.12, ease: "power2.in" })
          .to(flash, { opacity: 0, duration: 0.5, ease: "power2.out" });
      },
      once: true,
    });
  }

  // Camera — dramatic pull-in
  gsap.to(sceneContext.camera.position, {
    z: 3,
    y: 0.5,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });

  // Energy light intensifies
  gsap.to(sceneContext.energyLight, {
    intensity: 35,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });
}
