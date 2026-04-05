import "./style.css";
import { initLoader } from "./src/core/loader.js";
import { initScene } from "./src/core/scene.js";
import { setupScrollSync } from "./src/core/scroll.js";
import { initResponsive } from "./src/utils/responsive.js";
import { initChapterNav } from "./src/core/chapterNav.js";
import { registerEasing } from "./src/utils/easing.js";
import { initCursor } from "./src/effects/cursor.js";
import { initAudioUI } from "./src/core/audio.js";
import { initPrologue } from "./src/sections/prologue.js";
import { initDiscovery } from "./src/sections/discovery.js";
import { initAliens } from "./src/sections/aliens.js";
import { initPlumbers } from "./src/sections/plumbers.js";
import { initVillainsChapter } from "./src/sections/villainsChapter.js";
import { initGhostfreakChapter } from "./src/sections/ghostfreakChapter.js";
import { initClimax } from "./src/sections/climax.js";
import { initLegacy } from "./src/sections/legacy.js";

async function bootstrap() {
  initResponsive();
  registerEasing();
  initCursor();
  initAudioUI();
  await initLoader();

  const sceneContext = initScene();
  const { lenis } = setupScrollSync(sceneContext);

  initChapterNav(lenis);
  initPrologue(sceneContext);
  initDiscovery(sceneContext);
  initAliens(sceneContext);
  initPlumbers();
  initVillainsChapter(sceneContext);
  initGhostfreakChapter(sceneContext);
  initClimax(sceneContext);
  initLegacy();
}

bootstrap();

