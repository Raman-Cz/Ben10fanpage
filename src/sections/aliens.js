import { gsap, ScrollTrigger } from "../core/scroll.js";

export function initAliens(sceneContext) {
  const section = document.querySelector("#aliens");
  const carousel = document.querySelector("#aliens-carousel");
  const slides = document.querySelectorAll(".alien-slide");
  const headerArea = section?.querySelector(".aliens-header-area");

  if (!section || !carousel || slides.length === 0) return;

  // Header entrance (scrubbed)
  if (headerArea) {
    const tag = headerArea.querySelector(".chapter-tag");
    const h2 = headerArea.querySelector("h2");
    const intro = headerArea.querySelector(".aliens-intro");

    gsap.fromTo(tag, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: "none",
      scrollTrigger: { trigger: headerArea, start: "top 80%", end: "top 55%", scrub: 1 },
    });

    gsap.fromTo(h2, { opacity: 0, filter: "blur(4px)" }, {
      opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "none",
      scrollTrigger: { trigger: headerArea, start: "top 75%", end: "top 45%", scrub: 1 },
    });

    gsap.fromTo(intro, { opacity: 0, y: 15 }, {
      opacity: 1, y: 0, duration: 0.6, ease: "none",
      scrollTrigger: { trigger: headerArea, start: "top 70%", end: "top 40%", scrub: 1 },
    });
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

    // Set alien-color CSS variable from data attribute
    const color = slide.dataset.color;
    if (color) {
      slide.style.setProperty("--alien-color", color);
    }

    // Entrance animation (scroll-scrubbed within horizontal scroll)
    ScrollTrigger.create({
      trigger: slide,
      containerAnimation: scrollTween,
      start: "left 80%",
      end: "left 30%",
      onEnter: () => animateSlideIn(slide, img, info, bars, h3, species, story),
      onEnterBack: () => animateSlideIn(slide, img, info, bars, h3, species, story),
      onLeave: () => animateSlideOut(img, info),
      onLeaveBack: () => animateSlideOut(img, info),
    });

    // Image parallax within slide
    if (img) {
      gsap.fromTo(img, 
        { x: -20 },
        {
          x: 20,
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

  // Camera drifts subtly during alien carousel
  gsap.to(sceneContext.camera.position, {
    x: -0.2,
    z: 5,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 2,
    },
  });
}

function animateSlideIn(slide, img, info, bars, h3, species, story) {
  const tl = gsap.timeline();

  if (img) {
    tl.fromTo(img, { opacity: 0, scale: 0.85, x: -30 }, {
      opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "power3.out",
    }, 0);
  }

  if (h3) {
    tl.fromTo(h3, { opacity: 0, y: 25 }, {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    }, 0.15);
  }

  if (species) {
    tl.fromTo(species, { opacity: 0, y: 15 }, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
    }, 0.25);
  }

  if (story) {
    tl.fromTo(story, { opacity: 0, y: 15 }, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
    }, 0.35);
  }

  // Stat bars fill on slide entrance
  bars.forEach((bar) => {
    bar.classList.add("animated");
  });
}

function animateSlideOut(img, info) {
  // Gentle fade out not needed for horizontal scroll - elements leave naturally
}
