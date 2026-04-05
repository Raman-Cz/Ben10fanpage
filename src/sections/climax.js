import { gsap, ScrollTrigger } from "../core/scroll.js";
import { splitCharsAndWords } from "../utils/textSplit.js";
import { audioManager } from "../core/audio.js";

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

  // Split entrance — hero slides from left, villain from right
  const tl = gsap.timeline({
    scrollTrigger: { trigger: split, start: "top 80%", end: "top 40%", scrub: 1.5 },
  });

  if (heroImg) {
    tl.fromTo(heroImg, { opacity: 0, x: -100, scale: 0.8, filter: "brightness(0)" }, {
      opacity: 1, x: 0, scale: 1, filter: "brightness(1)", duration: 1, ease: "power3.out",
    }, 0);
  }

  if (villainImg) {
    tl.fromTo(villainImg, { opacity: 0, x: 100, scale: 0.8, filter: "brightness(0)" }, {
      opacity: 1, x: 0, scale: 1, filter: "brightness(1)", duration: 1, ease: "power3.out",
    }, 0);
  }

  // VS text 
  if (vs) {
    tl.fromTo(vs, { opacity: 0, scale: 0 }, {
      opacity: 0.6, scale: 1.2, duration: 0.8, ease: "back.out(2)",
    }, 0.2);
  }

  // Narration lines Mask Reveal
  lines.forEach((line) => {
    const lineWords = line.querySelectorAll(".word-inner");
    if (lineWords.length > 0) {
      gsap.fromTo(lineWords, 
        { yPercent: 120, opacity: 0 }, 
        {
          yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power2.out",
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

  // Energy clash pulsing at center
  const clashZone = document.createElement("div");
  clashZone.className = "energy-clash";
  split?.appendChild(clashZone);
  
  gsap.fromTo(clashZone,
    { opacity: 0, scale: 0.5 },
    {
      opacity: 0.8,
      scale: 1.5,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        end: "bottom 60%",
        scrub: 1,
        onEnter: () => audioManager.createOscillatorPulse(500, 2)
      }
    }
  );

  // Flash at the climactic moment
  const flash = document.querySelector("#flash-overlay");
  if (flash) {
    ScrollTrigger.create({
      trigger: section,
      start: "center center",
      onEnter: () => {
        gsap.timeline()
          .to(flash, { opacity: 0.9, duration: 0.1, ease: "power2.in" })
          .to(flash, { opacity: 0, duration: 1.5, ease: "power3.out" });
        audioManager.createOscillatorPulse(800, 0.5); // High pitch flash
      },
      once: true,
    });
  }

  // Camera track tracking
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0.85 }; 
    gsap.to(camPosition, {
      t: 1.0, 
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
    gsap.to(sceneContext.camera.position, {
      z: 3, y: 0.5, ease: "none",
      scrollTrigger: { trigger: section, start: "top center", end: "bottom center", scrub: 2 },
    });
  }

  // Energy light intensifies
  gsap.to(sceneContext.energyLight, {
    intensity: 45,
    ease: "power2.in",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });

  // Smooth transition to white-green when entering climax
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    onEnter: () => {
      gsap.to(sceneContext.energyLight.color, { r: 0.67, g: 1, b: 0.8, duration: 2, ease: "power1.inOut" });
      gsap.to(sceneContext.energyLight, { intensity: 30, duration: 1.5 });
    },
    onLeaveBack: () => {
      gsap.to(sceneContext.energyLight.color, { r: 0.46, g: 0.2, b: 0.8, duration: 2, ease: "power1.inOut" });
      gsap.to(sceneContext.energyLight, { intensity: 15, duration: 1.5 });
    },
  });
}
