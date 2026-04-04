import { gsap, ScrollTrigger } from "../core/scroll.js";
import { renderVillains } from "../objects/villains.js";

export function initUniverseSection() {
  const section = document.querySelector("#universe");
  const grid = document.querySelector("#villain-grid");
  const layers = section.querySelectorAll("[data-depth]");
  const header = document.querySelector(".section-header");
  
  renderVillains(grid);

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }).to(layers, {
    y: (_, el) => -80 * Number(el.dataset.depth),
    x: (_, el) => 40 * Number(el.dataset.depth),
    ease: "none"
  });

  gsap.fromTo(header,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  gsap.from(".villain-card", {
    y: 60,
    opacity: 0,
    duration: 0.7,
    stagger: { each: 0.15, from: "start" },
    ease: "power3.out",
    scrollTrigger: {
      trigger: grid,
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  const cards = document.querySelectorAll(".villain-card");
  cards.forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: -20,
      boxShadow: "0 30px 60px rgba(255, 0, 51, 0.3)"
    });
  });

  ScrollTrigger.refresh();
}
