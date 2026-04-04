export const EASES = {
  cinematic: "power3.inOut",
  pulse: "sine.inOut",
  slam: "back.out(3)"
};

export function registerEasing() {
  return EASES;
}
