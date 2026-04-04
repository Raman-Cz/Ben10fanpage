import { gsap, ScrollTrigger } from "../core/scroll.js";

const ALIENS = [
  { name: "Heatblast", species: "Pyronite", stats: "Power: 95 | Speed: 75 | Defense: 60", desc: "Living inferno from Pyros", icon: "🔥", image: "/assets/images/heatblast.png" },
  { name: "Wildmutt", species: "Vulpimancer", stats: "Power: 70 | Speed: 85 | Senses: 100", desc: "Blind beast guided by scent", icon: "🐾", image: "/assets/images/wildmutt.png" },
  { name: "Diamondhead", species: "Petrosapien", stats: "Power: 85 | Defense: 100 | Versatility: 80", desc: "Living crystal warrior", icon: "💎", image: "/assets/images/diamondhead.png" },
  { name: "XLR8", species: "Kineceleran", stats: "Speed: 100 | Reflexes: 95 | Power: 50", desc: "Velocity incarnate", icon: "⚡", image: "/assets/images/xlr8.png" },
  { name: "Grey Matter", species: "Galvan", stats: "Intelligence: 100 | Stealth: 90 | Power: 10", desc: "Galaxy's greatest mind", icon: "🧠", image: "/assets/images/greymatter.png" },
  { name: "Four Arms", species: "Tetramand", stats: "Power: 100 | Defense: 90 | Speed: 45", desc: "Four-armed bruiser", icon: "💪", image: "/assets/images/fourarms.png" },
  { name: "Stinkfly", species: "Lepidopterran", stats: "Flight: 95 | Range: 80 | Power: 55", desc: "Insectoid aerial attacker", icon: "🦟", image: "/assets/images/stinkfly.png" },
  { name: "Ripjaws", species: "Piscciss Volann", stats: "Aquatic: 100 | Power: 70 | Speed: 60", desc: "Deep ocean predator", icon: "🦈", image: "/assets/images/ripjaws.png" },
  { name: "Upgrade", species: "Galvanic Mechamorph", stats: "Tech: 100 | Adapt: 95 | Power: 55", desc: "Living machine", icon: "🤖", image: "/assets/images/upgrade.png" },
  { name: "Ghostfreak", species: "Ectonurite", stats: "Stealth: 100 | Fear: 90 | Power: 60", desc: "Ghostly infiltrator", icon: "👻", image: "/assets/images/ghostfreak.png" },
];

export function initLegacy() {
  const section = document.querySelector("#legacy");
  if (!section) return;

  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const quote = section.querySelector(".legacy-quote");
  const nodes = section.querySelectorAll(".timeline-node");
  const grid = document.querySelector("#legacy-grid");
  const detail = document.querySelector("#legacy-detail");

  // Header entrance
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(heading, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(quote, { opacity: 0, y: 15 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
  });

  // Timeline nodes stagger in
  gsap.fromTo(
    nodes,
    { opacity: 0, x: 20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Build alien selection grid
  if (grid) {
    grid.innerHTML = "";
    ALIENS.forEach((alien) => {
      const btn = document.createElement("button");
      btn.className = "legacy-alien-btn";
      btn.dataset.alien = alien.name;
      btn.innerHTML = `
        <img src="${alien.image}" alt="${alien.name}" onerror="this.style.display='none'" />
        <span>${alien.name}</span>
      `;
      grid.appendChild(btn);
    });

    // Click handlers
    const buttons = grid.querySelectorAll(".legacy-alien-btn");
    const flash = document.querySelector("#flash-overlay");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const key = btn.dataset.alien;
        const info = ALIENS.find((a) => a.name === key);
        if (!info || !detail) return;

        // Update detail panel
        const detailIcon = detail.querySelector(".detail-icon");
        const detailTitle = detail.querySelector("h4");
        const detailDesc = detail.querySelector("p");
        const detailStats = detail.querySelector(".detail-stats");

        if (detailIcon) detailIcon.textContent = info.icon;
        if (detailTitle) detailTitle.textContent = info.name;
        if (detailDesc)
          detailDesc.innerHTML = `<strong>${info.species}</strong><br>${info.desc}`;
        if (detailStats)
          detailStats.innerHTML = info.stats
            .split(" | ")
            .map((s) => `<span>${s}</span>`)
            .join("");

        // Mini flash
        if (flash) {
          gsap
            .timeline()
            .to(flash, { opacity: 0.6, duration: 0.1, ease: "power2.in" })
            .to(flash, { opacity: 0, duration: 0.3, ease: "power2.out" });
        }

        // Detail entrance
        gsap.fromTo(
          detail,
          { scale: 0.95, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
        );

        // Icon spin
        if (detailIcon) {
          gsap.fromTo(
            detailIcon,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" }
          );
        }

        // Burst particles
        burst(btn);
      });
    });
  }

  // Selection grid entrance
  gsap.from(".legacy-alien-btn", {
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.06,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".legacy-selection",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

function burst(card) {
  const rect = card.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 12;
    const dist = 30 + Math.random() * 30;
    dot.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: 5px;
      height: 5px;
      background: var(--omnitrix-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--omnitrix-green);
      pointer-events: none;
      z-index: 1000;
    `;
    document.body.appendChild(dot);
    gsap.to(dot, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => dot.remove(),
    });
  }
}
