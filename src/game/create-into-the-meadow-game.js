import { GAME_MANIFEST } from "../content/game-manifest.js";
import { ARRIVAL_MEADOW_CONFIG } from "../content/meadow-areas/arrival-meadow.js";
import { STORY_BEATS } from "../content/story/story-beats.js";
import { ARRIVAL_OBJECTIVES } from "../content/objectives/arrival-objectives.js";
import { ARRIVAL_INTERACTION_TARGETS } from "../content/interaction-targets/arrival-targets.js";
import { installDsks } from "../boot/install-dsks.js";
import { createInitialGameState, advanceGameState } from "./game-state.js";
import { createGameSnapshot } from "./game-snapshot.js";

function createFallbackMeadowAreaKit(config = {}) {
  return Object.freeze({
    id: config.area?.id ?? "fallback-meadow",
    getRenderPlan({ time = 0 } = {}) {
      return Object.freeze({
        id: config.area?.id ?? "fallback-meadow",
        type: "meadow-area-render-plan",
        time,
        seed: config.seed,
        area: config.area,
        style: config.style,
        wind: config.features?.wind,
        objects: Object.freeze([
          Object.freeze({ id: "fallback-ground", type: "ground" }),
          Object.freeze({ id: "fallback-path", type: "path", ...(config.features?.path ?? {}) }),
          Object.freeze({ id: "fallback-focal-tree", type: "focal-tree", position: config.features?.focalTree?.position ?? { x: 0, y: 0, z: 24 } })
        ]),
        stats: Object.freeze({ objectCount: 3, counts: Object.freeze({ ground: 1, path: 1, focalTree: 1 }) }),
        validation: Object.freeze({ passed: true, failures: [], fallback: true })
      });
    },
    getSnapshot() { return Object.freeze({ id: config.area?.id ?? "fallback-meadow", fallback: true }); },
    validate() { return Object.freeze({ passed: true, failures: [], fallback: true }); }
  });
}

export async function createIntoTheMeadowGame(options = {}) {
  const externalKits = options.externalKits ?? {};
  const createMeadowAreaKit = externalKits.createMeadowAreaKit ?? createFallbackMeadowAreaKit;
  const dskInstall = installDsks({ externalKits: { "meadow-area-kit": createMeadowAreaKit, "meadow-webgl-render-kit": externalKits.createMeadowWebglRenderKit } });
  const meadow = createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG);
  let state = createInitialGameState({ manifest: GAME_MANIFEST, dskInstall, sceneId: ARRIVAL_MEADOW_CONFIG.area.id });

  function getRenderPlan(time = 0) {
    return meadow.getRenderPlan({ time });
  }

  function getDiagnostics() {
    const plan = getRenderPlan(0);
    const failures = [];
    if (!dskInstall.validation.passed) failures.push(...dskInstall.validation.failures);
    if (!plan.validation?.passed) failures.push(...(plan.validation?.failures ?? ["render plan validation failed"]));
    return Object.freeze({
      id: "into-the-meadow.diagnostics",
      validation: Object.freeze({ passed: failures.length === 0, failures }),
      counts: Object.freeze({ localDsks: dskInstall.validation.localCount, externalDsks: dskInstall.validation.externalCount, renderObjects: plan.stats?.objectCount ?? 0 }),
      content: Object.freeze({ storyBeats: STORY_BEATS.length, objectives: ARRIVAL_OBJECTIVES.length, interactionTargets: ARRIVAL_INTERACTION_TARGETS.length })
    });
  }

  const game = {
    manifest: GAME_MANIFEST,
    content: Object.freeze({ meadow: ARRIVAL_MEADOW_CONFIG, storyBeats: STORY_BEATS, objectives: ARRIVAL_OBJECTIVES, interactionTargets: ARRIVAL_INTERACTION_TARGETS }),
    dskInstall,
    meadow,
    getState: () => state,
    getRenderPlan,
    getDiagnostics,
    getSnapshot: () => createGameSnapshot(game),
    tick(input = {}) { state = advanceGameState(state, input); return state; },
    reset() { state = createInitialGameState({ manifest: GAME_MANIFEST, dskInstall, sceneId: ARRIVAL_MEADOW_CONFIG.area.id }); return state; }
  };

  return Object.freeze(game);
}
