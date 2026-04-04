export function initResponsive() {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  document.body.setAttribute("data-mobile", mobile ? "true" : "false");
  document.body.setAttribute("data-reduced-motion", reducedMotion ? "true" : "false");

  if (reducedMotion) {
    document.documentElement.style.setProperty("--animation-duration", "0ms");
  }
}
