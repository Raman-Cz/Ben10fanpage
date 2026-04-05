import { gsap } from "../core/scroll.js";
import { splitCharsAndWords } from "./textSplit.js";
import { EASES } from "./easing.js";

/**
 * Creates an Apple-style masked text reveal timeline.
 */
export function createMasqTextReveal(element, { delay = 0, duration = 1.2, stagger = 0.04 } = {}) {
  const { words } = splitCharsAndWords(element);
  
  // Set initial state
  gsap.set(words, { yPercent: 120, opacity: 0 });

  return gsap.to(words, {
    yPercent: 0,
    opacity: 1,
    duration,
    stagger,
    ease: EASES.appleReveal,
    delay
  });
}

/**
 * Creates a dramatic clip-path based entrance for hero images.
 */
export function createClipPathReveal(element, { delay = 0, scale = 1.1, duration = 1.8 } = {}) {
  gsap.set(element, { 
    clipPath: "inset(100% 0% 0% 0%)", 
    scale,
    filter: "brightness(0.5)"
  });

  return gsap.to(element, {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    filter: "brightness(1)",
    duration,
    ease: EASES.cinematic,
    delay
  });
}

/**
 * Continuous subtle parallax motion scrubbed to scroll
 */
export function attachParallax(element, scrollTriggerParams, yOffset = 50) {
  return gsap.to(element, {
    y: yOffset,
    ease: "none",
    scrollTrigger: {
      ...scrollTriggerParams
    }
  });
}

/**
 * Soft fade and slight drift up
 */
export function createFadeUp(element, { delay = 0, duration = 1, y = 30 } = {}) {
  gsap.set(element, { opacity: 0, y });
  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    ease: EASES.appleReveal,
    delay
  });
}
