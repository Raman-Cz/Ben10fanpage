export function attachFireCanvas(panel) {
  const canvas = document.createElement("canvas");
  canvas.className = "fire-canvas";
  panel.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random(),
    y: Math.random(),
    s: Math.random() * 2 + 1
  }));

  function resize() {
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y -= 0.007 * p.s;
      if (p.y < -0.1) p.y = 1.1;
      const x = p.x * canvas.width;
      const y = p.y * canvas.height;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 18 * p.s);
      g.addColorStop(0, "rgba(255, 230, 100, 0.95)");
      g.addColorStop(0.35, "rgba(255, 130, 0, 0.7)");
      g.addColorStop(1, "rgba(255, 80, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 18 * p.s, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  draw();
}
