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

  // Tag + heading
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(heading, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });

  // Split entrance — hero slides from left, villain from right
  if (heroImg) {
    gsap.fromTo(heroImg, { opacity: 0, x: -60, scale: 0.8 }, {
      opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: split, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }

  if (villainImg) {
    gsap.fromTo(villainImg, { opacity: 0, x: 60, scale: 0.8 }, {
      opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: split, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }

  // VS text
  if (vs) {
    gsap.fromTo(vs, { opacity: 0, scale: 0 }, {
      opacity: 0.4, scale: 1, duration: 0.6, ease: "back.out(2)",
      scrollTrigger: { trigger: split, start: "top 75%", toggleActions: "play none none reverse" },
    });
  }

  // Narration lines
  lines.forEach((line) => {
    gsap.fromTo(line, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

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
