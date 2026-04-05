import { gsap, ScrollTrigger } from "../core/scroll.js";
import { createMasqTextReveal, attachParallax } from "../utils/animations.js";
import { splitCharsAndWords } from "../utils/textSplit.js";

export function initDiscovery(sceneContext) {
  const section = document.querySelector("#discovery");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const imageWrap = section.querySelector(".discovery-image-wrap");
  const meteor = section.querySelector(".meteor-trail");
  const heading = section.querySelector("h2");
  const tag = section.querySelector(".chapter-tag");

  // Format heading and lines for Apple-style masking
  if (heading) splitCharsAndWords(heading);
  lines.forEach(line => splitCharsAndWords(line));

  // Tag entrance
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 80%", end: "top 60%", scrub: 1 },
  });

  // Masked Text Reveal for Heading
  if (heading) {
    const headingWords = heading.querySelectorAll(".word-inner");
    gsap.fromTo(headingWords, 
      { yPercent: 120, opacity: 0 }, 
      {
        yPercent: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%", end: "top 50%", scrub: 1 },
      }
    );
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

  // Hero image cinematic entrance and parallax
  if (imageWrap) {
    gsap.fromTo(
      imageWrap,
      { opacity: 0, scale: 0.85, x: 50, clipPath: "inset(0% 100% 0% 0%)" },
      {
        opacity: 1, scale: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 65%", end: "top 40%", scrub: 1.5 },
      }
    );

    attachParallax(imageWrap, {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    }, -60);
  }

  // Meteor parallax
  if (meteor) {
    attachParallax(meteor, {
      trigger: section,
      start: "top 80%",
      end: "bottom top",
      scrub: 1,
    }, 120);
    
    gsap.fromTo(meteor, { opacity: 0 }, {
      opacity: 0.8, duration: 1.5, ease: "none",
      scrollTrigger: { trigger: section, start: "top 60%", end: "top 30%", scrub: 1 },
    });
  }

  // Move camera along continuous path
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0.15 }; // Start where prologue left off
    gsap.to(camPosition, {
      t: 0.35, 
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
    // Fallback
    gsap.to(sceneContext.camera.position, {
      x: 0.15, z: 4.8, ease: "none",
      scrollTrigger: { trigger: section, start: "top center", end: "bottom center", scrub: 2 },
    });
  }

  // Smooth light transition
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    onEnter: () => {
      gsap.to(sceneContext.energyLight.color, { r: 0, g: 1, b: 0.25, duration: 1.5, ease: "power1.inOut" });
      gsap.to(sceneContext.energyLight, { intensity: 25, duration: 1 });
    },
    onLeaveBack: () => gsap.to(sceneContext.energyLight.color, { r: 0, g: 1, b: 0.25, duration: 1.5, ease: "power1.inOut" }),
  });
}

