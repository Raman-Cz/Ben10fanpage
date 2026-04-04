import * as THREE from "three";

export function createOmnitrix() {
  const group = new THREE.Group();

  const ringGeometry = new THREE.TorusGeometry(1.4, 0.18, 32, 128);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0x001a0a,
    emissiveIntensity: 0.8
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.06, 16, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0a2a15,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0x00ff41,
      emissiveIntensity: 0.5
    })
  );
  innerRing.rotation.x = Math.PI / 2;

  const coreGeometry = new THREE.CylinderGeometry(0.95, 0.95, 0.35, 6);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    emissive: 0x00ff41,
    emissiveIntensity: 1.2,
    metalness: 0.6,
    roughness: 0.2,
    transparent: true,
    opacity: 0.95
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.rotation.y = Math.PI / 6;

  const innerCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.4, 6),
    new THREE.MeshStandardMaterial({
      color: 0x00cc33,
      emissive: 0x00ff41,
      emissiveIntensity: 2,
      metalness: 0.3,
      roughness: 0.1
    })
  );
  innerCore.rotation.y = Math.PI / 12;
  innerCore.position.y = 0.05;

  const dial = new THREE.Group();
  for (let i = 0; i < 10; i += 1) {
    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.25),
      new THREE.MeshStandardMaterial({
        color: 0x003311,
        emissive: 0x00ff41,
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.2
      })
    );
    const a = (Math.PI * 2 * i) / 10;
    marker.position.set(Math.cos(a) * 1.28, 0, Math.sin(a) * 1.28);
    marker.lookAt(0, 0, 0);
    dial.add(marker);
  }

  const centerGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.15, 0),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00ff41,
      emissiveIntensity: 3,
      metalness: 0.1,
      roughness: 0
    })
  );
  centerGem.position.y = 0.25;

  group.add(ring, innerRing, core, innerCore, dial, centerGem);
  group.userData.dial = dial;
  group.userData.core = core;
  group.userData.centerGem = centerGem;
  
  return group;
}
