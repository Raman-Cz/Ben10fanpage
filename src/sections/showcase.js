import { gsap, ScrollTrigger } from "../core/scroll.js";
import { attachFireCanvas } from "../effects/fire.js";
import { attachSpeedLines } from "../effects/speed.js";
import { attachImpactRing } from "../effects/impact.js";
import { attachCrystalEffect } from "../effects/crystal.js";

export function initShowcaseSection(sceneContext) {
  const panels = document.querySelectorAll(".alien-panel");
  const heatblast = document.querySelector(".alien-panel.heatblast");
  const fourarms = document.querySelector(".alien-panel.fourarms");
  const xlr8 = document.querySelector(".alien-panel.xlr8");
  const diamondhead = document.querySelector(".alien-panel.diamondhead");

  if (heatblast) attachFireCanvas(heatblast);
  if (xlr8) attachSpeedLines(xlr8);
  if (fourarms) attachImpactRing(fourarms);
  if (diamondhead) attachCrystalEffect(diamondhead);

  panels.forEach((panel, i) => {
    const imageWrapper = panel.querySelector(".alien-image-wrapper");
    const title = panel.querySelector("h3");
    const subtitle = panel.querySelector(".alien-subtitle");
    const body = panel.querySelector("p");
    const stats = panel.querySelectorAll(".stat-bar");

    const direction = i % 2 === 0 ? -60 : 60;

    gsap.fromTo(imageWrapper,
      { opacity: 0, x: direction, scale: 0.85 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.1);
    tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.25);
    tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
    tl.fromTo(stats, { scaleX: 0 }, { scaleX: 1, stagger: 0.15, duration: 0.8, ease: "power2.out" }, 0.55);

    gsap.to(sceneContext.camera.position, {
      x: (i % 2 === 0 ? 0.25 : -0.25),
      z: 4.5,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: panel,
        start: "top center",
        end: "bottom center",
        scrub: 1.5
      }
    });
  });

  ScrollTrigger.refresh();
}
