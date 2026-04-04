import "./style.css";
import { initLoader } from "./src/core/loader.js";
import { initScene } from "./src/core/scene.js";
import { setupScrollSync } from "./src/core/scroll.js";
import { initResponsive } from "./src/utils/responsive.js";
import { initHeroSection } from "./src/sections/hero.js";
import { initTransformationSection } from "./src/sections/transformation.js";
import { initShowcaseSection } from "./src/sections/showcase.js";
import { initUniverseSection } from "./src/sections/universe.js";
import { initSelectionSection } from "./src/sections/selection.js";
import { registerEasing } from "./src/utils/easing.js";

async function bootstrap() {
  initResponsive();
  registerEasing();
  await initLoader();

  const sceneContext = initScene();
  setupScrollSync(sceneContext);

  initHeroSection(sceneContext);
  initTransformationSection(sceneContext);
  initShowcaseSection(sceneContext);
  initUniverseSection();
  initSelectionSection();
}

bootstrap();
