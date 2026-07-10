import { GAME_MANIFEST } from "../content/game-manifest.js";
import { createIntoTheMeadowGame } from "../game/create-into-the-meadow-game.js";
import { exposeGameHost } from "../boot/expose-game-host.js";
import { createRenderPlanEnhancer } from "../game/enhance-render-plan.js";
import { createMeadowWebglRendererV2 } from "../renderers/meadow-webgl-renderer-v2-compatible.js";

async function loadExternalKits() {
  const meadowAreaEntry = GAME_MANIFEST.externalKits.find((entry) => entry.id === "meadow-area-kit");
  if (!meadowAreaEntry?.url) throw new Error("GAME_MANIFEST is missing meadow-area-kit URL");
  const meadowAreaModule = await import(meadowAreaEntry.url);
  if (typeof meadowAreaModule.createMeadowAreaKit !== "function") {
    throw new Error("meadow-area-kit did not expose createMeadowAreaKit");
  }
  return Object.freeze({ createMeadowAreaKit: meadowAreaModule.createMeadowAreaKit });
}

export async function startWebHost({ canvas, hud, statusEl, loadingEl, debug = false } = {}) {
  if (!canvas) throw new Error("IntoTheMeadow web host requires a canvas.");
  const externalKits = await loadExternalKits();
  const game = await createIntoTheMeadowGame({ externalKits });
  const renderer = createMeadowWebglRendererV2({ canvas });
  const planEnhancer = createRenderPlanEnhancer();
  let lastPlan = null;
  let lastRender = null;
  let stopped = false;

  exposeGameHost({
    ...game,
    renderer,
    planEnhancer,
    getRenderPlan: () => lastPlan ?? planEnhancer.enhance(game.getRenderPlan(0)),
    getRenderSnapshot: () => lastRender ?? renderer.getSnapshot(),
    getRenderEnhancerSnapshot: () => planEnhancer.getSnapshot(),
    getSnapshot: () => ({
      ...game.getSnapshot(),
      enhancedRenderPlan: lastPlan,
      render: lastRender ?? renderer.getSnapshot(),
      renderEnhancer: planEnhancer.getSnapshot()
    })
  });

  if (hud) hud.hidden = !debug;
  if (loadingEl) loadingEl.hidden = true;

  function showFatal(error) {
    stopped = true;
    if (hud) hud.hidden = false;
    if (statusEl) statusEl.textContent = String(error?.stack ?? error?.message ?? error);
    if (loadingEl) {
      loadingEl.hidden = false;
      loadingEl.textContent = "IntoTheMeadow renderer stopped";
    }
    console.error(error);
  }

  function frame(now) {
    if (stopped) return;
    try {
      const time = now / 1000;
      game.tick({ time, dt: 1 / 60 });
      const rawPlan = game.getRenderPlan(time);
      const plan = planEnhancer.enhance(rawPlan);
      if (!plan.contract?.validation?.passed) {
        throw new Error(`meadow render contract failed: ${plan.contract?.validation?.failures?.join("; ")}`);
      }
      lastPlan = plan;
      lastRender = renderer.render(plan);

      if (debug && statusEl) {
        const diagnostics = game.getDiagnostics();
        const counts = plan.contract.descriptorCounts;
        statusEl.textContent = [
          diagnostics.validation.passed ? "ok" : "bad",
          `schema:v${plan.schemaVersion}`,
          `grass:${counts.grassInstances}`,
          `flowers:${counts.flowerClusters}`,
          `rocks:${counts.rocks}`,
          `vertices:${lastRender.vertexCount}`,
          `gpu:${lastRender.cacheState}`,
          `plan:${plan.runtime?.enhancerCache?.state ?? "warming"}`
        ].join(" · ");
      }
      requestAnimationFrame(frame);
    } catch (error) {
      showFatal(error);
    }
  }

  requestAnimationFrame(frame);
  return Object.freeze({
    game,
    renderer,
    planEnhancer,
    stop() { stopped = true; },
    start() {
      if (!stopped) return;
      stopped = false;
      requestAnimationFrame(frame);
    }
  });
}
