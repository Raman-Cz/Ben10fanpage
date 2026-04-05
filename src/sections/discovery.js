import { gsap, ScrollTrigger } from "../core/scroll.js";
import { splitHeadingWords } from "../utils/textSplit.js";

export function initDiscovery(sceneContext) {
  const section = document.querySelector("#discovery");
  if (!section) return;

  const lines = section.querySelectorAll(".narration-line");
  const imageWrap = section.querySelector(".discovery-image-wrap");
  const meteor = section.querySelector(".meteor-trail");
  const heading = section.querySelector("h2");
  const tag = section.querySelector(".chapter-tag");

  // Split heading into words for word-level reveal
  if (heading) {
    splitHeadingWords(heading);
  }

  // Scroll-triggered entrance for heading (scrubbed)
  gsap.fromTo(
    tag,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 80%", end: "top 60%", scrub: 1 },
    }
  );

  gsap.fromTo(
    heading,
    { opacity: 0, filter: "blur(4px)" },
    {
      opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "none",
      scrollTrigger: { trigger: section, start: "top 75%", end: "top 50%", scrub: 1 },
    }
  );

  // Narration lines reveal one by one on scroll (scrubbed)
  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 25, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: "top 92%",
          end: "top 65%",
          scrub: 1,
        },
      }
    );
  });

  // Hero image entrance (scrubbed)
  if (imageWrap) {
    gsap.fromTo(
      imageWrap,
      { opacity: 0, scale: 0.85, x: 50 },
      {
        opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "none",
        scrollTrigger: { trigger: section, start: "top 65%", end: "top 35%", scrub: 1 },
      }
    );

    // Hero image parallax during scroll
    gsap.to(imageWrap, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Meteor trail animation (scrubbed)
  if (meteor) {
    gsap.fromTo(
      meteor,
      { opacity: 0, y: -80 },
      {
        opacity: 0.8, y: 60, duration: 1.5, ease: "none",
        scrollTrigger: { trigger: section, start: "top 60%", end: "top 30%", scrub: 1 },
      }
    );
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
