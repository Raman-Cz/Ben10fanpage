import { gsap, ScrollTrigger } from "../core/scroll.js";

function splitChars(node) {
  const text = node.textContent ?? "";
  node.textContent = "";
  return text.split("").map((c, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = c === " " ? "\u00A0" : c;
    node.appendChild(span);
    return span;
  });
}

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

  const chars = splitChars(title);

  // Entrance animations - play on load (no scroll trigger for initial state)
  gsap.fromTo(
    badge,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
  );

  gsap.fromTo(
    visuals,
    { opacity: 0, x: -30, scale: 0.9 },
    { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.4 }
  );

  gsap.fromTo(
    chars,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.025,
      duration: 0.5,
      ease: "back.out(1.5)",
      delay: 0.8,
    }
  );

  gsap.fromTo(
    subtitle,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 }
  );

  gsap.fromTo(
    stats,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.5 }
  );

  // Scroll-out timeline (scrubbed) - extended duration
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=400%",
      scrub: 2,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Parallax: hero moves slower than text
  tl.to(hero, { x: -80, opacity: 0.3, duration: 0.4 }, 0);
  tl.to(
    chars,
    { opacity: 0, y: -20, stagger: 0.008, duration: 0.3 },
    0
  );
  tl.to(
    [badge, subtitle, stats, cue],
    { opacity: 0, y: -15, duration: 0.25 },
    0.05
  );
  tl.to(
    sceneContext.omnitrix.scale,
    { x: 1.2, y: 1.2, z: 1.2, duration: 0.4, ease: "power2.out" },
    0
  );
  tl.to(sceneContext.energyLight, { intensity: 30, duration: 0.3 }, 0.1);
  tl.to(
    sceneContext.camera.position,
    { z: 3.5, duration: 0.3 },
    0.2
  );

  // Scroll cue animation
  gsap.to(cue, {
    y: 8,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    delay: 2.2,
  });
}
