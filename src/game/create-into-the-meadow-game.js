import { GAME_MANIFEST } from "../content/game-manifest.js";
import { ARRIVAL_MEADOW_CONFIG } from "../content/meadow-areas/arrival-meadow.js";
import { createLocalMeadowSourcePlan } from "../content/meadow-areas/create-local-meadow-source-plan.js";
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
      return createLocalMeadowSourcePlan(config, { time });
    },
    getSnapshot() {
      const plan = createLocalMeadowSourcePlan(config, { time: 0 });
      return Object.freeze({
        id: config.area?.id ?? "fallback-meadow",
        fallback: true,
        sourcePlanVersion: plan.version,
        objectCount: plan.stats.objectCount
      });
    },
    validate() {
      return Object.freeze({ passed: true, failures: [], fallback: true, representative: true });
    }
  });
}

export async function createIntoTheMeadowGame(options = {}) {
  const externalKits = options.externalKits ?? {};
  const createMeadowAreaKit = externalKits.createMeadowAreaKit ?? createFallbackMeadowAreaKit;
  const dskInstall = installDsks({ externalKits: { "meadow-area-kit": createMeadowAreaKit } });
  const meadow = createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG);
  let baseRenderPlan = meadow.getRenderPlan({ time: 0 });
  let state = createInitialGameState({
    manifest: GAME_MANIFEST,
    dskInstall,
    sceneId: ARRIVAL_MEADOW_CONFIG.area.id
  });

  function getRenderPlan(time = 0) {
    const nextTime = Number.isFinite(Number(time)) ? Number(time) : 0;
    return nextTime === 0 ? baseRenderPlan : Object.freeze({ ...baseRenderPlan, time: nextTime });
  }

  function rebuildRenderPlan() {
    baseRenderPlan = meadow.getRenderPlan({ time: 0 });
    return baseRenderPlan;
  }

  function getDiagnostics() {
    const plan = baseRenderPlan;
    const failures = [];
    if (!dskInstall.validation.passed) failures.push(...dskInstall.validation.failures);
    if (!plan.validation?.passed) failures.push(...(plan.validation?.failures ?? ["render plan validation failed"]));
    return Object.freeze({
      id: "into-the-meadow.diagnostics",
      validation: Object.freeze({ passed: failures.length === 0, failures }),
      counts: Object.freeze({
        localDsks: dskInstall.validation.localCount,
        externalDsks: dskInstall.validation.externalCount,
        renderObjects: plan.stats?.objectCount ?? 0
      }),
      renderPlan: Object.freeze({
        policy: "static-topology-with-time-overlay",
        sourcePlanCached: true,
        sourcePlanId: plan.id,
        sourcePlanVersion: plan.version ?? null
      }),
      content: Object.freeze({
        storyBeats: STORY_BEATS.length,
        objectives: ARRIVAL_OBJECTIVES.length,
        interactionTargets: ARRIVAL_INTERACTION_TARGETS.length
      })
    });
  }

  const game = {
    manifest: GAME_MANIFEST,
    content: Object.freeze({
      meadow: ARRIVAL_MEADOW_CONFIG,
      storyBeats: STORY_BEATS,
      objectives: ARRIVAL_OBJECTIVES,
      interactionTargets: ARRIVAL_INTERACTION_TARGETS
    }),
    dskInstall,
    meadow,
    getState: () => state,
    getRenderPlan,
    rebuildRenderPlan,
    getDiagnostics,
    getSnapshot: () => createGameSnapshot(game),
    tick(input = {}) {
      state = advanceGameState(state, input);
      return state;
    },
    reset() {
      state = createInitialGameState({
        manifest: GAME_MANIFEST,
        dskInstall,
        sceneId: ARRIVAL_MEADOW_CONFIG.area.id
      });
      return state;
    }
  };

  return Object.freeze(game);
}
