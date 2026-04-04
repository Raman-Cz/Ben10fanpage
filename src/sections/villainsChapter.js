import { gsap, ScrollTrigger } from "../core/scroll.js";

const VILLAINS = [
  {
    name: "Vilgax",
    summary:
      "The ruthless intergalactic warlord who has conquered ten worlds. Vilgax sees the Omnitrix as the ultimate weapon — and he will stop at nothing to claim it. His obsession with the device drove him to send wave after wave of drones, bounty hunters, and mercenaries to Earth.",
    icon: "👹",
    image: "/assets/images/villlgax.png",
  },
  {
    name: "Kevin 11",
    summary:
      "A troubled 11-year-old with the power to absorb energy. Kevin was the first person Ben tried to befriend after getting the Omnitrix — but Kevin's ambition turned him into a rival. After absorbing the Omnitrix's energy, he mutated into a grotesque fusion of all 10 aliens.",
    icon: "⚡",
    image: null,
  },
  {
    name: "Dr. Animo",
    summary:
      "A mad scientist consumed by bitterness after being denied a prestigious award. Dr. Animo uses a Transmodulator device to mutate animals into monstrous creatures, seeking to reshape evolution itself to prove his brilliance.",
    icon: "🧬",
    image: null,
  },
  {
    name: "Hex",
    summary:
      "An ancient sorcerer wielding the five Charms of Bezel — artifacts of immense mystical power. Hex commands dark magic that even the Omnitrix cannot fully counter, making him one of Ben's most unpredictable foes.",
    icon: "🔮",
    image: null,
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
      card.className = "villain-card";
      card.innerHTML = `
        ${villain.image ? `<img src="${villain.image}" alt="${villain.name}" class="villain-image" onerror="this.style.display='none'" />` : ""}
        <span class="villain-icon">${villain.icon}</span>
        <h3>${villain.name}</h3>
        <p>${villain.summary}</p>
      `;
      showcase.appendChild(card);
    }
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

  // Header animations
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(heading, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(intro, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
  });

  // Villain cards stagger entrance
  setTimeout(() => {
    const cards = section.querySelectorAll(".villain-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: { each: 0.15, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcase,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Subtle float on scroll
    cards.forEach((card) => {
      gsap.to(card, {
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, 50);

  // Camera reacts to villain chapter
  gsap.to(sceneContext.camera.position, {
    x: -0.1,
    z: 5.2,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });
}
