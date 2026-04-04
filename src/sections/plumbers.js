import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initPlumbers() {
  const section = document.querySelector("#plumbers");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const tag = section.querySelector(".chapter-tag");
  const heading = section.querySelector("h2");
  const visual = section.querySelector(".plumbers-visual");
  const revealTexts = section.querySelectorAll(".reveal-text");
  const badge = section.querySelector(".plumber-badge");
  const stamp = section.querySelector(".classified-stamp");

  // Tag + heading entrance
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(heading, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });

  // Narration lines
  lines.forEach((line) => {
    gsap.fromTo(line, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Visual panel entrance
  if (visual) {
    gsap.fromTo(visual, { opacity: 0, x: 50 }, {
      opacity: 1, x: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: visual, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }

  // Plumber badge animation
  if (badge) {
    gsap.fromTo(badge, { scale: 0, rotation: -90 }, {
      scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)",
      scrollTrigger: { trigger: badge, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }

  // Classified stamp
  if (stamp) {
    gsap.fromTo(stamp, { opacity: 0, scale: 2, rotation: -30 }, {
      opacity: 1, scale: 1, rotation: -15, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: visual, start: "top 70%", toggleActions: "play none none reverse" },
    });
  }

  // Reveal redacted text staggered
  revealTexts.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        setTimeout(() => el.classList.add("revealed"), i * 300);
      },
      onLeaveBack: () => el.classList.remove("revealed"),
    });
  });
}
