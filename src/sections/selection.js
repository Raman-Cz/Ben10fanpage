import { gsap } from "../core/scroll.js";

const DETAILS = {
  Heatblast: { species: "Pyronite", stats: "Power: 95 | Speed: 75 | Defense: 60", desc: "Living inferno from Pyros" },
  "Four Arms": { species: "Tetramand", stats: "Power: 100 | Speed: 45 | Defense: 90", desc: "Four-armed bruiser" },
  XLR8: { species: "Kineceleran", stats: "Power: 50 | Speed: 100 | Defense: 55", desc: "Speed demon" },
  Diamondhead: { species: "Petrosapien", stats: "Power: 75 | Speed: 60 | Defense: 100", desc: "Crystalline warrior" },
  Upgrade: { species: "Galvanic Mechamorph", stats: "Power: 55 | Speed: 70 | Adaptation: 100", desc: "Technological entity" },
  Ghostfreak: { species: "Ectonurite", stats: "Power: 60 | Speed: 65 | Stealth: 100", desc: "Ghostly infiltrator" }
};

function burst(card) {
  const rect = card.getBoundingClientRect();
  for (let i = 0; i < 16; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst";
    const angle = (Math.PI * 2 * i) / 16;
    const distance = 40 + Math.random() * 40;
    dot.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: 6px;
      height: 6px;
      background: var(--omnitrix-green);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--omnitrix-green);
      pointer-events: none;
      z-index: 1000;
    `;
    document.body.appendChild(dot);
    gsap.to(dot, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => dot.remove()
    });
  }
}

function triggerTransformation(flash, card, detail) {
  const tl = gsap.timeline();
  
  tl.to(flash, { opacity: 0.95, duration: 0.15, ease: "power2.in" })
    .to(flash, { opacity: 0.6, duration: 0.2, ease: "power2.out" })
    .to(flash, { opacity: 1, duration: 0.1 })
    .to(flash, { opacity: 0, duration: 0.4, ease: "power2.inOut" });

  const detailTl = gsap.timeline();
  detailTl.fromTo(detail, 
    { scale: 0.95, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
  );

  const icon = detail.querySelector(".detail-icon");
  gsap.fromTo(icon, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" });
}

export function initSelectionSection() {
  const cards = document.querySelectorAll(".alien-card");
  const detail = document.querySelector("#selection-detail");
  const title = detail.querySelector("h3");
  const copy = detail.querySelector("p");
  const stats = detail.querySelector(".detail-stats");
  const icon = detail.querySelector(".detail-icon");
  const flash = document.querySelector("#flash-overlay");

  const header = document.querySelector(".selection-header");
  gsap.from(header, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: header,
      start: "top 80%"
    }
  });

  gsap.from(cards, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".selection-grid",
      start: "top 80%"
    }
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => burst(card));

    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
      
      const key = card.dataset.alien;
      const info = DETAILS[key] || { species: "Unknown", stats: "???", desc: "Undocumented" };
      
      title.textContent = key;
      copy.innerHTML = `<strong>${info.species}</strong><br>${info.desc}`;
      
      const statItems = info.stats.split(" | ").map(s => `<span>${s}</span>`).join("");
      stats.innerHTML = statItems;
      
      const icons = { Heatblast: "🔥", "Four Arms": "💪", XLR8: "⚡", Diamondhead: "💎", Upgrade: "🤖", Ghostfreak: "👻" };
      icon.textContent = icons[key] || "⚡";

      triggerTransformation(flash, card, detail);
      
      gsap.fromTo(detail, 
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    });
  });
}
