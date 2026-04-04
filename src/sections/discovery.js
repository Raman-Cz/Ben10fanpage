import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initDiscovery(sceneContext) {
  const section = document.querySelector("#discovery");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const imageWrap = section.querySelector(".discovery-image-wrap");
  const meteor = section.querySelector(".meteor-trail");
  const heading = section.querySelector("h2");
  const tag = section.querySelector(".chapter-tag");

  // Scroll-triggered entrance for heading
  gsap.fromTo(
    tag,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
    }
  );

  gsap.fromTo(
    heading,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
    }
  );

  // Narration lines reveal one by one on scroll
  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Hero image entrance
  if (imageWrap) {
    gsap.fromTo(
      imageWrap,
      { opacity: 0, scale: 0.85, x: 50 },
      {
        opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
      }
    );
  }

  // Meteor trail animation
  if (meteor) {
    gsap.fromTo(
      meteor,
      { opacity: 0, y: -80 },
      {
        opacity: 0.8, y: 60, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
      }
    );

    gsap.to(meteor, {
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
      scrollTrigger: { trigger: section, start: "top 50%", toggleActions: "play none none reverse" },
    });
  }

  // Subtle camera parallax
  gsap.to(sceneContext.camera.position, {
    x: 0.15,
    z: 4.8,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });
}
