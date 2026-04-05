import { gsap, ScrollTrigger } from "../core/scroll.js";
import { splitCharsAndWords } from "../utils/textSplit.js";
import { audioManager } from "../core/audio.js";

export function initGhostfreakChapter(sceneContext) {
  const section = document.querySelector("#ghostfreak-chapter");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const img = section.querySelector(".ghostfreak-img");
  const tendrils = section.querySelector(".ghostfreak-tendrils");
  const glowRing = section.querySelector(".ghostfreak-glow-ring");

  if (heading) splitCharsAndWords(heading);
  lines.forEach(line => splitCharsAndWords(line));

  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 80%", end: "top 55%", scrub: 1 },
  });

  if (heading) {
      gsap.fromTo(heading.querySelectorAll(".word-inner"), { yPercent: 120, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%", end: "top 45%", scrub: 1 },
      });
  }

  // Ghostfreak image — dramatic entrance with clip-path reveal
  if (img) {
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.7, filter: "brightness(0)", clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
      {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 40px rgba(119,51,204,0.5)) brightness(1)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "top 30%",
          scrub: 1.2,
          onEnter: () => audioManager.createOscillatorPulse(150, 2) // Deep hum
        },
      }
    );
  }

  if (tendrils) {
    gsap.fromTo(tendrils, { opacity: 0, scale: 0.8 }, {
      opacity: 1, scale: 1.2, duration: 2, ease: "power1.inOut",
      scrollTrigger: { trigger: section, start: "top 60%", end: "top 25%", scrub: 2 },
    });
  }

  if (glowRing) {
    gsap.fromTo(glowRing, { opacity: 0, scale: 0.5 }, {
      opacity: 0.5, scale: 1.1, duration: 1.5, ease: "none",
      scrollTrigger: { trigger: section, start: "top 60%", end: "top 25%", scrub: 1 },
    });
  }

  // Narration lines Mask Reveal
  lines.forEach((line) => {
    const lineWords = line.querySelectorAll(".word-inner");
    if (lineWords.length > 0) {
      gsap.fromTo(lineWords, 
        { yPercent: 120, opacity: 0 }, 
        {
          yPercent: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            end: "top 70%",
            scrub: 1.5,
          },
        }
      );
    }
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
      gsap.to(sceneContext.energyLight.color, { r: 0.46, g: 0.2, b: 0.8, duration: 2, ease: "power1.inOut" });
      gsap.to(sceneContext.energyLight, { intensity: 15, duration: 1.5 });
    },
    onLeaveBack: () => {
      gsap.to(sceneContext.energyLight.color, { r: 1, g: 0, b: 0.2, duration: 2, ease: "power1.inOut" });
      gsap.to(sceneContext.energyLight, { intensity: 25, duration: 1.5 });
    },
  });

  // Camera track tracking
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0.75 }; 
    gsap.to(camPosition, {
      t: 0.85, 
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
      onUpdate: () => {
        const point = sceneContext.cameraPath.getPointAt(camPosition.t);
        sceneContext.camera.position.copy(point);
      }
    });
  } else {
    // Smooth camera movement fallback
    gsap.to(sceneContext.camera.position, {
      x: 0.1, z: 5.3, ease: "none",
      scrollTrigger: { trigger: section, start: "top center", end: "bottom center", scrub: 2 },
    });
  }
}
