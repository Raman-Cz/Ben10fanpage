export function initCursor() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  if (isMobile) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  
  const cursorDot = document.createElement("div");
  cursorDot.className = "custom-cursor-dot";
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Smooth dragging
  const speed = 0.15;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + (distX * speed);
    cursorY = cursorY + (distY * speed);

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animate);
  }
  
  animate();

  // Magnetic hover effects
  const magneticElements = document.querySelectorAll("button, a, .chapter-dot, .magnetic");
  
  magneticElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursorDot.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursorDot.classList.remove("hover");
    });
  });
}
