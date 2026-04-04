export function attachUpgradeEffect(panel) {
  const canvas = document.createElement("canvas");
  canvas.className = "upgrade-canvas";
  panel.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.003,
    speedY: (Math.random() - 0.5) * 0.003,
    alpha: Math.random() * 0.5 + 0.3
  }));

  let time = 0;

  function resize() {
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;
      
      const x = p.x * canvas.width;
      const y = p.y * canvas.height;
      const pulse = Math.sin(time * 2 + p.x * 10) * 0.2 + 0.8;
      
      ctx.fillStyle = `rgba(153, 102, 255, ${p.alpha * pulse})`;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = `rgba(180, 150, 255, ${p.alpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    requestAnimationFrame(draw);
  }

  draw();
}
