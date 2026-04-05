import { gsap, ScrollTrigger } from "./scroll.js";

const CHAPTERS = [
  { id: "prologue", num: "00", name: "Prologue", color: "#00ff41" },
  { id: "discovery", num: "01", name: "The Discovery", color: "#00ff41" },
  { id: "aliens", num: "02", name: "The Original 10", color: "#ff6b00" },
  { id: "plumbers", num: "03", name: "Grandpa Max's Secret", color: "#4488ff" },
  { id: "villains", num: "04", name: "The Villains Rise", color: "#ff0033" },
  { id: "ghostfreak-chapter", num: "05", name: "Ghostfreak's Escape", color: "#7733cc" },
  { id: "climax", num: "06", name: "The Final Battle", color: "#aaffcc" },
  { id: "legacy", num: "07", name: "Legacy", color: "#d4a849" },
];

export function initChapterNav(lenis) {
  const dots = document.querySelectorAll(".chapter-dot");
  const label = document.getElementById("chapter-label");
  const labelNum = label?.querySelector(".chapter-num");
  const labelName = label?.querySelector(".chapter-name");
  const nav = document.getElementById("chapter-nav");
  let currentChapter = 0;

  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "nav-progress-bar";
  nav?.appendChild(progressBar);

  // Click handler for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.dataset.chapter);
      const target = document.getElementById(CHAPTERS[idx]?.id);
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    });
  });

  // ScrollTrigger for each chapter
  CHAPTERS.forEach((ch, i) => {
    const el = document.getElementById(ch.id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "top 10%",
      onEnter: () => setActiveChapter(i),
      onEnterBack: () => setActiveChapter(i),
    });
  });

  function setActiveChapter(idx) {
    if (idx === currentChapter) return;
    currentChapter = idx;

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === idx);
      // Update dot color based on chapter theme
      const chapterColor = CHAPTERS[i]?.color || "#00ff41";
      d.style.setProperty("--dot-color", chapterColor);
      if (i === idx) {
        gsap.to(d, {
          backgroundColor: chapterColor,
          borderColor: chapterColor,
          boxShadow: `0 0 12px ${chapterColor}66`,
          duration: 0.3,
        });
      } else {
        gsap.to(d, {
          backgroundColor: "rgba(255,255,255,0.2)",
          borderColor: "rgba(255,255,255,0.15)",
          boxShadow: "none",
          duration: 0.3,
        });
      }
    });

    // Update progress bar - calculate based on scroll position within full page
    const scrollProgress = lenis?.scroll || 0;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollProgress / maxScroll) * 100, 100);
    gsap.to(progressBar, {
      height: `${progress}%`,
      backgroundColor: CHAPTERS[idx].color,
      duration: 0.2,
    });

    if (labelNum && labelName && label) {
      labelNum.textContent = CHAPTERS[idx].num;
      labelName.textContent = CHAPTERS[idx].name;
      label.classList.add("visible");

      // Update label color to match chapter
      gsap.to(labelNum, {
        color: CHAPTERS[idx].color,
        borderColor: `${CHAPTERS[idx].color}4d`,
        backgroundColor: `${CHAPTERS[idx].color}0d`,
        duration: 0.3,
      });

      // Hide after a delay if on prologue
      if (idx === 0) {
        setTimeout(() => {
          if (currentChapter === 0) label.classList.remove("visible");
        }, 2000);
      }
    }
  }

  // Show label once user starts scrolling past prologue
  ScrollTrigger.create({
    trigger: "#discovery",
    start: "top 90%",
    onEnter: () => label?.classList.add("visible"),
    onLeaveBack: () => label?.classList.remove("visible"),
  });
}
