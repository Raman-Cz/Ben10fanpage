import { gsap, ScrollTrigger } from "../core/scroll.js";
import { splitCharsAndWords } from "../utils/textSplit.js";
import { audioManager } from "../core/audio.js";

const VILLAINS = [
  {
    name: "Vilgax",
    summary: "The ruthless intergalactic warlord who has conquered ten worlds. Vilgax sees the Omnitrix as the ultimate weapon — and he will stop at nothing to claim it.",
    icon: "👹",
    image: "/assets/images/villlgax.png",
  },
  {
    name: "Kevin 11",
    summary: "A troubled 11-year-old with the power to absorb energy. After absorbing the Omnitrix's energy, he mutated into a grotesque fusion of all 10 aliens.",
    icon: "⚡",
    image: "/assets/images/kevin11.png",
  },
  {
    name: "Dr. Animo",
    summary: "A mad scientist consumed by bitterness. Dr. Animo uses a Transmodulator device to mutate animals into monstrous creatures.",
    icon: "🧬",
    image: "/assets/images/dranimo.png",
  },
  {
    name: "Hex",
    summary: "An ancient sorcerer wielding the five Charms of Bezel. Hex commands dark magic that even the Omnitrix cannot fully counter.",
    icon: "🔮",
    image: "/assets/images/hex.png",
  },
];

export function initVillainsChapter(sceneContext) {
  const section = document.querySelector("#villains");
  if (!section) return;

  const showcase = document.querySelector("#villain-showcase");
  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const intro = section.querySelector(".villains-intro");
  const layers = section.querySelectorAll("[data-depth]");

  // Render villain cards
  if (showcase) {
    showcase.innerHTML = "";
    for (const villain of VILLAINS) {
      const card = document.createElement("article");
      card.className = "villain-card magnetic"; // Adding magnetic class for cursor
      card.innerHTML = `
        ${villain.image ? `<img src="${villain.image}" alt="${villain.name}" class="villain-image" onerror="this.style.display='none'" />` : ""}
        <span class="villain-icon">${villain.icon}</span>
        <h3>${villain.name}</h3>
        <p>${villain.summary}</p>
      `;
      showcase.appendChild(card);
    }
  }

  // Formatting strings
  if (heading) splitCharsAndWords(heading);
  if (intro) splitCharsAndWords(intro);

  // Header animations
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

  if (intro) {
    gsap.fromTo(intro.querySelectorAll(".word-inner"), { yPercent: 120, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.02, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 70%", end: "top 40%", scrub: 1 },
    });
  }

  // Parallax layers
  if (layers.length) {
    gsap.to(layers, {
      y: (_, el) => -60 * Number(el.dataset.depth),
      x: (_, el) => 30 * Number(el.dataset.depth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Villain cards stagger entrance
  setTimeout(() => {
    const cards = section.querySelectorAll(".villain-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95, clipPath: "inset(100% 0% 0% 0%)" },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        stagger: { each: 0.15 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: showcase,
          start: "top 80%",
          end: "top 50%",
          scrub: 1.5,
          onEnter: () => audioManager.createOscillatorPulse(200, 1.5) // Menacing hum
        },
      }
    );
  }, 50);

  // Camera track tracking
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0.5 }; 
    gsap.to(camPosition, {
      t: 0.75, 
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
    // Camera reacts to villain chapter
    gsap.to(sceneContext.camera.position, {
      x: -0.1, z: 5.2, ease: "none",
      scrollTrigger: { trigger: section, start: "top center", end: "bottom center", scrub: 2 },
    });
  }

  // Smooth transition to red when entering villains
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    onEnter: () => gsap.to(sceneContext.energyLight.color, { r: 1, g: 0, b: 0.2, duration: 2, ease: "power1.inOut" }),
    onLeaveBack: () => gsap.to(sceneContext.energyLight.color, { r: 0, g: 0.5, b: 0.8, duration: 2, ease: "power1.inOut" }),
  });
}
