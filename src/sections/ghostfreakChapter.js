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

  // Tag + heading (scrubbed)
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "none",
    scrollTrigger: { trigger: section, start: "top 80%", end: "top 55%", scrub: 1 },
  });

  gsap.fromTo(heading, { opacity: 0, filter: "blur(4px)" }, {
    opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "none",
    scrollTrigger: { trigger: section, start: "top 75%", end: "top 45%", scrub: 1 },
  });

  // Ghostfreak image — dramatic entrance with clip-path reveal
  if (img) {
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.7, filter: "brightness(0) blur(10px)", clipPath: "circle(0% at 50% 50%)" },
      {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 40px rgba(119,51,204,0.5)) brightness(0.9) contrast(1.1)",
        clipPath: "circle(100% at 50% 50%)",
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );
  }

  // Tendrils fade in (scrubbed)
  if (tendrils) {
    gsap.fromTo(tendrils, { opacity: 0 }, {
      opacity: 1, duration: 2, ease: "none",
      scrollTrigger: { trigger: section, start: "top 60%", end: "top 25%", scrub: 1 },
    });
  }

  // Glow ring (scrubbed)
  if (glowRing) {
    gsap.fromTo(glowRing, { opacity: 0, scale: 0.5 }, {
      opacity: 0.5, scale: 1, duration: 1.5, ease: "none",
      scrollTrigger: { trigger: section, start: "top 60%", end: "top 25%", scrub: 1 },
    });
  }

  // Narration lines — slower, more atmospheric reveal (scrubbed)
  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 25, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: "top 92%",
          end: "top 60%",
          scrub: 1,
        },
      }
    );
  });

  // Background progressively darkens
  gsap.to(section.querySelector(".chapter-bg"), {
    background: "linear-gradient(180deg, #020205 0%, rgba(15,5,25,0.9) 30%, rgba(20,0,30,0.8) 60%, #020205 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Smooth transition to purple when entering ghostfreak
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    onEnter: () => {
      gsap.to(sceneContext.energyLight.color, {
        r: 0.46,
        g: 0.2,
        b: 0.8,
        duration: 2,
        ease: "power1.inOut",
      });
      gsap.to(sceneContext.energyLight, { intensity: 15, duration: 1.5 });
    },
    onLeaveBack: () => {
      gsap.to(sceneContext.energyLight.color, {
        r: 1,
        g: 0,
        b: 0.2,
        duration: 2,
        ease: "power1.inOut",
      });
      gsap.to(sceneContext.energyLight, { intensity: 25, duration: 1.5 });
    },
  });

  // Smooth camera movement
  gsap.to(sceneContext.camera.position, {
    x: 0.1,
    z: 5.3,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });
}
