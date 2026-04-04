export function attachImpactRing(panel) {
  const ring = document.createElement("span");
  ring.className = "impact-ring";
  panel.appendChild(ring);
  return ring;
}
