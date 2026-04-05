import { gsap, ScrollTrigger } from "../core/scroll.js";
import { createMasqTextReveal } from "../utils/animations.js";
import { splitCharsAndWords } from "../utils/textSplit.js";

export function initAliens(sceneContext) {
  const section = document.querySelector("#aliens");
  const carousel = document.querySelector("#aliens-carousel");
  const slides = document.querySelectorAll(".alien-slide");
  const headerArea = section?.querySelector(".aliens-header-area");

  if (!section || !carousel || slides.length === 0) return;

  // Header entrance
  if (headerArea) {
    const tag = headerArea.querySelector(".chapter-tag");
    const h2 = headerArea.querySelector("h2");
    const intro = headerArea.querySelector(".aliens-intro");
    
    if (h2) splitCharsAndWords(h2);
    if (intro) splitCharsAndWords(intro);

    gsap.fromTo(tag, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: headerArea, start: "top 80%", end: "top 55%", scrub: 1 },
    });

    if (h2) {
      gsap.fromTo(h2.querySelectorAll(".word-inner"), { yPercent: 120, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out",
        scrollTrigger: { trigger: headerArea, start: "top 75%", end: "top 45%", scrub: 1 },
      });
    }

    if (intro) {
      gsap.fromTo(intro.querySelectorAll(".word-inner"), { yPercent: 120, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.02, ease: "power2.out",
        scrollTrigger: { trigger: headerArea, start: "top 70%", end: "top 40%", scrub: 1 },
      });
    }
  }

  // Horizontal scroll setup
  const totalWidth = slides.length * window.innerWidth;

  const scrollTween = gsap.to(carousel, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Per-slide animations
  slides.forEach((slide) => {
    const img = slide.querySelector(".alien-slide-img");
    const info = slide.querySelector(".alien-slide-info");
    const bars = slide.querySelectorAll(".bar-fill");
    const h3 = slide.querySelector("h3");
    const species = slide.querySelector(".alien-species");
    const story = slide.querySelector(".alien-story");
    const visual = slide.querySelector(".alien-slide-visual");

    // Set alien-color CSS variable from data attribute
    const color = slide.dataset.color;
    if (color) {
      slide.style.setProperty("--alien-color", color);
    }
    
    if (story) splitCharsAndWords(story);

    // Entrance animation (scroll-scrubbed within horizontal scroll)
    ScrollTrigger.create({
      trigger: slide,
      containerAnimation: scrollTween,
      start: "left 80%",
      end: "left 30%",
      onEnter: () => animateSlideIn(slide, img, info, bars, h3, species, story, visual),
      onEnterBack: () => animateSlideIn(slide, img, info, bars, h3, species, story, visual),
    });

    // Image parallax within slide
    if (img) {
      gsap.fromTo(img, 
        { x: -50 },
        {
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: slide,
            containerAnimation: scrollTween,
            start: "left 90%",
            end: "left 10%",
            scrub: 1,
          }
        }
      );
    }
  });

  // Camera drifts across space path during carousel
  if (sceneContext.cameraPath) {
    const camPosition = { t: 0.35 }; 
    gsap.to(camPosition, {
      t: 0.65, 
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 2,
      },
      onUpdate: () => {
        const point = sceneContext.cameraPath.getPointAt(camPosition.t);
        sceneContext.camera.position.copy(point);
      }
    });
  }

  // Smooth color transition for aliens chapter - more gradual
  gsap.to(sceneContext.energyLight.color, {
    r: 0.4,
    g: 0.25,
    b: 0.1,
    duration: 2,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      end: "center center",
      scrub: 2,
    },
  });

  // Return to green when leaving aliens
  ScrollTrigger.create({
    trigger: "#plumbers",
    start: "top 80%",
    onEnter: () => gsap.to(sceneContext.energyLight.color, { r: 0, g: 1, b: 0.25, duration: 1.5, ease: "power1.inOut" }),
    onLeaveBack: () => gsap.to(sceneContext.energyLight.color, { r: 0.4, g: 0.25, b: 0.1, duration: 1.5, ease: "power1.inOut" }),
  });
}

function animateSlideIn(slide, img, info, bars, h3, species, story, visual) {
  const tl = gsap.timeline();

  if (visual) {
    tl.fromTo(visual, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" }, 0);
  }

  if (img) {
    tl.fromTo(img, { opacity: 0, scale: 0.9 }, {
      opacity: 1, scale: 1, duration: 1, ease: "power3.out",
    }, 0.2);
  }

  if (h3) tl.fromTo(h3, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
  
  if (species) tl.fromTo(species, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);

  if (story) {
    const words = story.querySelectorAll(".word-inner");
    tl.fromTo(words, { yPercent: 120 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.015, ease: "power2.out" }, 0.6);
  }

  // Stat bars fill on slide entrance
  bars.forEach((bar) => bar.classList.add("animated"));
}

