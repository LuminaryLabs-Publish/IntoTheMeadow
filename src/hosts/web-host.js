import { GAME_MANIFEST } from "../content/game-manifest.js";
import { createIntoTheMeadowGame } from "../game/create-into-the-meadow-game.js";
import { exposeGameHost } from "../boot/expose-game-host.js";

async function loadExternalKits() {
  const [meadowAreaModule, meadowRenderModule] = await Promise.all([
    import(GAME_MANIFEST.externalKits[0].url),
    import(GAME_MANIFEST.externalKits[1].url)
  ]);
  return Object.freeze({
    createMeadowAreaKit: meadowAreaModule.createMeadowAreaKit,
    createMeadowWebglRenderKit: meadowRenderModule.createMeadowWebglRenderKit
  });
}

export async function startWebHost({ canvas, hud, statusEl, loadingEl, debug = false } = {}) {
  if (!canvas) throw new Error("IntoTheMeadow web host requires a canvas.");
  const externalKits = await loadExternalKits();
  const game = await createIntoTheMeadowGame({ externalKits });
  const renderer = externalKits.createMeadowWebglRenderKit({ canvas });
  exposeGameHost({ ...game, renderer, getSnapshot: () => ({ ...game.getSnapshot(), render: renderer.getSnapshot?.() }) });
  if (hud) hud.hidden = !debug;
  if (loadingEl) loadingEl.hidden = true;

  function frame(now) {
    const time = now / 1000;
    game.tick({ time, dt: 1 / 60 });
    const plan = game.getRenderPlan(time);
    const render = renderer.render(plan);
    if (debug && statusEl) {
      const diagnostics = game.getDiagnostics();
      statusEl.textContent = `${diagnostics.validation.passed ? "ok" : "bad"} · dsks:${diagnostics.counts.localDsks} · objects:${plan.stats.objectCount} · vertices:${render.vertexCount}`;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
  return Object.freeze({ game, renderer });
}
