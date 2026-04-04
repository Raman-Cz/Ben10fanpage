export function attachRipjawsEffect(panel) {
  const canvas = document.createElement("canvas");
  canvas.className = "ripjaws-canvas";
  panel.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const bubbles = Array.from({ length: 25 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 20 + 5,
    speed: Math.random() * 0.003 + 0.001,
    wobble: Math.random() * Math.PI * 2
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
    
    for (const b of bubbles) {
      b.y -= b.speed;
      if (b.y < -0.1) {
        b.y = 1.1;
        b.x = Math.random();
      }
      
      const wobbleX = Math.sin(time + b.wobble) * 10;
      const x = b.x * canvas.width + wobbleX;
      const y = b.y * canvas.height;
      
      ctx.beginPath();
      ctx.arc(x, y, b.size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(68, 136, 255, 0.4)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x - b.size * 0.3, y - b.size * 0.3, b.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 200, 255, 0.3)`;
      ctx.fill();
    }
    
    requestAnimationFrame(draw);
  }

  draw();
}
