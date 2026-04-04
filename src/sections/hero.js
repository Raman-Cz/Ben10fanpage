import { gsap, ScrollTrigger } from "../core/scroll.js";

function splitChars(node) {
  const text = node.textContent ?? "";
  node.textContent = "";
  const chars = text.split("");
  chars.forEach((c, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = c === " " ? "\u00A0" : c;
    span.style.animationDelay = `${i * 0.04}s`;
    node.appendChild(span);
  });
}

export function initHeroSection(sceneContext) {
  const section = document.querySelector("#hero");
  const title = document.querySelector("#hero-title");
  const cue = document.querySelector(".scroll-cue");
  const badge = document.querySelector(".hero-badge");
  const copy = document.querySelector(".hero-copy");
  const stats = document.querySelector(".hero-stats");
  const imageContainer = document.querySelector(".hero-image-container");
  const heroBg = document.querySelector(".hero-bg");

  splitChars(title);
  const chars = title.querySelectorAll(".char");

  gsap.fromTo(heroBg, 
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.1 }
  );

  gsap.fromTo(imageContainer, 
    { opacity: 0, scale: 0.8, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
  );

  gsap.fromTo(badge, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.5 }
  );

  gsap.fromTo(chars, 
    { opacity: 0, y: 40, rotateX: 90 },
    { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.6, ease: "back.out(1.5)", delay: 0.7 }
  );

  gsap.fromTo(copy, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.2 }
  );

  gsap.fromTo(stats, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.4 }
  );

  gsap.to(cue, {
    y: 10,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    delay: 2
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      scrub: 1.5,
      pin: true
    }
  });

  tl.to(imageContainer, { opacity: 0, scale: 0.7, y: -50, duration: 0.4 }, 0);
  tl.to(sceneContext.omnitrix.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.4, ease: "power2.out" }, 0);
  tl.to(sceneContext.energyLight, { intensity: 35, duration: 0.3 }, 0.1);
  tl.to(sceneContext.camera.position, { z: 2.5, y: 0.3, duration: 0.3 }, 0.2);
  tl.to([badge, copy, stats], { opacity: 0, y: -30, duration: 0.2 }, 0);
  tl.to(chars, { opacity: 0, scale: 1.1, stagger: 0.01, duration: 0.2 }, 0);
  tl.to(cue, { opacity: 0, duration: 0.15 }, 0.1);

  ScrollTrigger.refresh();
}
