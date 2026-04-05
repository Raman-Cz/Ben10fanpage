import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupScrollSync(sceneContext) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = new Lenis({
    lerp: reduced ? 1 : 0.05,
    smoothWheel: !reduced,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    syncTouch: true,
    smoothTouch: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
    sceneContext.update(time);
    sceneContext.render();
  });

  gsap.ticker.lagSmoothing(0);

  // Delayed refresh to ensure DOM is laid out
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return { lenis };
}

export { ScrollTrigger, gsap };
