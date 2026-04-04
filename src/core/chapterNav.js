import { gsap, ScrollTrigger } from "./scroll.js";

const CHAPTERS = [
  { id: "prologue", num: "00", name: "Prologue" },
  { id: "discovery", num: "01", name: "The Discovery" },
  { id: "aliens", num: "02", name: "The Original 10" },
  { id: "plumbers", num: "03", name: "Grandpa Max's Secret" },
  { id: "villains", num: "04", name: "The Villains Rise" },
  { id: "ghostfreak-chapter", num: "05", name: "Ghostfreak's Escape" },
  { id: "climax", num: "06", name: "The Final Battle" },
  { id: "legacy", num: "07", name: "Legacy" },
];

export function initChapterNav(lenis) {
  const dots = document.querySelectorAll(".chapter-dot");
  const label = document.getElementById("chapter-label");
  const labelNum = label?.querySelector(".chapter-num");
  const labelName = label?.querySelector(".chapter-name");
  let currentChapter = 0;

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
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => setActiveChapter(i),
      onEnterBack: () => setActiveChapter(i),
    });
  });

  function setActiveChapter(idx) {
    if (idx === currentChapter) return;
    currentChapter = idx;

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === idx);
    });

    if (labelNum && labelName && label) {
      labelNum.textContent = CHAPTERS[idx].num;
      labelName.textContent = CHAPTERS[idx].name;
      label.classList.add("visible");

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
