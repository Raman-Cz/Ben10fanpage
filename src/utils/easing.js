export const EASES = {
  cinematic: "power3.inOut",
  pulse: "sine.inOut",
  slam: "back.out(3)",
  appleReveal: "customReveal", // Registered below
};

// Premium Apple-style revealing curve
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function registerEasing() {
  CustomEase.create("customReveal", "0.19, 1, 0.22, 1");
  return EASES;
}
