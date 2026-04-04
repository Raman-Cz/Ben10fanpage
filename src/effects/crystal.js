export function attachCrystalEffect(panel) {
  const canvas = document.createElement("canvas");
  canvas.className = "crystal-canvas";
  panel.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const crystals = Array.from({ length: 25 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 40 + 15,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
    alpha: Math.random() * 0.5 + 0.2,
    hue: 160 + Math.random() * 40
  }));

  let time = 0;

  function resize() {
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function drawCrystal(x, y, size, rotation, alpha, hue) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
    gradient.addColorStop(0, `hsla(${hue}, 100%, 80%, ${alpha})`);
    gradient.addColorStop(0.5, `hsla(${hue + 20}, 100%, 60%, ${alpha * 0.8})`);
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, ${alpha * 0.5})`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 3, 0);
    ctx.lineTo(0, size / 2);
    ctx.lineTo(-size / 3, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${alpha + 0.2})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
  }

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const crystal of crystals) {
      crystal.rotation += crystal.rotSpeed;
      const wobbleX = Math.sin(time * 2 + crystal.y * 10) * 5;
      const wobbleY = Math.cos(time * 1.5 + crystal.x * 10) * 3;
      const x = crystal.x * canvas.width + wobbleX;
      const y = crystal.y * canvas.height + wobbleY;
      drawCrystal(x, y, crystal.size, crystal.rotation, crystal.alpha, crystal.hue);
    }
    
    requestAnimationFrame(draw);
  }

  draw();
}
