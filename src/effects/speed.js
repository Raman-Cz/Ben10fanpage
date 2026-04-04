export function attachSpeedLines(panel) {
  const canvas = document.createElement("canvas");
  canvas.className = "speed-canvas";
  panel.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let offset = 0;

  function resize() {
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    offset += 12;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 55; i += 1) {
      const y = (i * 26 + offset) % canvas.height;
      const alpha = 0.08 + (i % 6) * 0.02;
      ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.2, y);
      ctx.lineTo(canvas.width, y - 45);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  draw();
}
