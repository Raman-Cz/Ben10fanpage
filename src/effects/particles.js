import * as THREE from "three";

export function createEnergyParticles(parentGroup, amount = 3000) {
  const count = Math.round(amount * (Number(getComputedStyle(document.body).getPropertyValue("--particle-density")) || 1));
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const radius = 1.2 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 2.2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
    speeds[i] = 0.2 + Math.random() * 0.9;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x4eff75,
    size: 0.023,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  parentGroup.add(points);

  return {
    update(time) {
      const p = geometry.attributes.position.array;
      for (let i = 0; i < count; i += 1) {
        const index = i * 3;
        const x = p[index];
        const z = p[index + 2];
        const angle = Math.atan2(z, x) + 0.0025 * speeds[i];
        const radius = Math.hypot(x, z);
        p[index] = Math.cos(angle) * radius;
        p[index + 1] += Math.sin(time * 0.0015 + i) * 0.00035;
        p[index + 2] = Math.sin(angle) * radius;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = time * 0.05;
    }
  };
}
