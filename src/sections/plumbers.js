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

  // Tag + heading entrance (scrubbed)
  gsap.fromTo(tag, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, ease: "none",
    scrollTrigger: { trigger: section, start: "top 80%", end: "top 55%", scrub: 1 },
  });

  gsap.fromTo(heading, { opacity: 0, filter: "blur(4px)" }, {
    opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "none",
    scrollTrigger: { trigger: section, start: "top 75%", end: "top 45%", scrub: 1 },
  });

  // Narration lines (scrubbed)
  lines.forEach((line) => {
    gsap.fromTo(line, { opacity: 0, y: 25, filter: "blur(4px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "none",
      scrollTrigger: {
        trigger: line,
        start: "top 92%",
        end: "top 65%",
        scrub: 1,
      },
    });
  });

  // Visual panel entrance (scrubbed)
  if (visual) {
    gsap.fromTo(visual, { opacity: 0, x: 50 }, {
      opacity: 1, x: 0, duration: 1, ease: "none",
      scrollTrigger: { trigger: visual, start: "top 80%", end: "top 50%", scrub: 1 },
    });
  }

  // Plumber badge animation (scrubbed)
  if (badge) {
    gsap.fromTo(badge, { scale: 0, rotation: -90 }, {
      scale: 1, rotation: 0, duration: 0.8, ease: "none",
      scrollTrigger: { trigger: badge, start: "top 80%", end: "top 50%", scrub: 1 },
    });

    // Badge ring speed increases on scroll
    gsap.to(badge.querySelector(".badge-ring"), {
      animationDuration: "4s",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Classified stamp (scrubbed)
  if (stamp) {
    gsap.fromTo(stamp, { opacity: 0, scale: 2, rotation: -30 }, {
      opacity: 1, scale: 1, rotation: -15, duration: 0.6, ease: "none",
      scrollTrigger: { trigger: visual, start: "top 70%", end: "top 40%", scrub: 1 },
    });
  }

  // Reveal redacted text staggered (scrubbed)
  revealTexts.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 60%",
      scrub: 1,
      onEnter: () => {
        setTimeout(() => el.classList.add("revealed"), i * 200);
      },
      onLeaveBack: () => el.classList.remove("revealed"),
    });
  });

  // Scan line animation
  const scanLine = document.createElement("div");
  scanLine.className = "scan-line";
  visual?.appendChild(scanLine);
  gsap.fromTo(scanLine,
    { top: "-100%" },
    {
      top: "100%",
      duration: 2,
      repeat: -1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    }
  );
}
