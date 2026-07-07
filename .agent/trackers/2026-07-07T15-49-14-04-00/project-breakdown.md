# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T15-49-14-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected because:** The central ledger scan showed `IntoTheMeadow` as the oldest eligible tracked `LuminaryLabs-Publish` repo by latest review timestamp after excluding `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.

## Source Read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game. It owns the browser route, manifest, product host, game factory, source state, snapshot seam, arrival-meadow content, story/objective/interaction descriptors, diagnostics, static validation, and GitHub Pages deployment surface.

The repo is already split cleanly enough for deterministic gameplay work:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

The blocker remains executable agency. The active render loop calls `game.tick({ time, dt })`, `advanceGameState()` only increments `frame` and records `lastTick`, and the current snapshot returns manifest/state/render/diagnostics without a dedicated gameplay contract. The content layer already defines the first real loop: path points, focal-tree affordance, two objectives, and story beats.

## Interaction Loop

### Current browser loop

```txt
open index.html
  -> mount canvas#scene, debug HUD, loading label
  -> load src/boot/boot-game.js
  -> call startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> load external kits from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival-meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> expose window.GameHost with getState/getSnapshot/getDiagnostics/render data
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> meadow.getRenderPlan({ time })
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> optional debug HUD displays validation/counts/render stats
```

### Current player-facing loop

```txt
load meadow scene
  -> see golden-hour meadow path
  -> see focal tree, grass, flowers, rocks, mushrooms, tree line, wind style
  -> no deterministic player movement is collected yet
  -> no inspect action is reduced yet
  -> no objective completion is emitted yet
  -> no gameplay journal exists yet
```

### Target playable loop

```txt
spawn on arrival path
  -> host creates ActionFrame batches each tick
  -> reducers return accepted/rejected/no-op ReducerResult records
  -> movement actions update player position and pathProgress
  -> path sampler emits deterministic path-progress events
  -> walk-the-path completes at pathProgress >= 0.35
  -> focal-tree affordance becomes available inside target radius 4.5
  -> invalid inspect actions reject with stable reason metadata
  -> valid inspect:focal-tree emits inspect and story events
  -> inspect-tree objective completes
  -> arrival meadow completes when both objectives are complete
  -> GameHost exposes gameplay snapshot, reducer journal, action journal, event journal, and objective state
  -> scripted fixtures replay the same action frames and produce the same gameplay snapshot
```

## Domains In Use

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
product-game-factory
fallback-meadow-area-kit
dsk-registry
dsk-descriptor-installer
local-dsk-descriptor-validation
external-meadow-area-bridge
external-webgl-meadow-renderer
arrival-meadow-content
arrival-path-content
focal-tree-content
grass-content
flower-content
rock-content
mushroom-content
tree-line-content
terrain-material-palette
world-wind-state
render-plan-generation
render-plan-enhancement
grass-patch-render-metadata
wind-field-render-metadata
post-process-stack-metadata
outline-policy-metadata
render-stats-diagnostics
deterministic-state-root
scene-identity
session-identity
tick-clock
last-tick-diagnostics
player-position
player-yaw
player-pitch
player-path-progress
world-state
progression-state
story-beat-ledger
objective-ledger
interaction-target-registry
host-input-ingress
scripted-input-domain
action-frame-contract
action-batch-contract
action-journal-contract
action-normalization
action-acceptance-policy
action-rejection-policy
reducer-result-contract
reducer-result-journal
ordered-reducer-pipeline
movement-integration
path-point-sampling
nearest-path-segment-sampling
path-progress-threshold-detection
gameplay-event-contract
gameplay-event-journal
interaction-affordance-evaluation
focal-tree-proximity-check
focal-tree-facing-check
inspect-event-evaluation
story-trigger-evaluation
objective-completion-evaluation
arrival-completion-state
gameplay-snapshot-contract
gameplay-render-metadata-projection
gamehost-state-contract
gamehost-snapshot-contract
gamehost-diagnostics-contract
deterministic-replay-domain
fixture-replay-domain
static-smoke-validation
dsk-registry-smoke-validation
render-plan-smoke-validation
deterministic-scene-smoke-validation
playable-loop-smoke-target
```

## Kits In Use

### External kits loaded by the product route

```txt
meadow-area-kit
  source: GAME_MANIFEST.externalKits[0]
  provides: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  source: GAME_MANIFEST.externalKits[1]
  provides: createMeadowWebglRenderKit, render, getSnapshot
```

### Active local DSK descriptors

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
post-process-stack-dsk
static-pages-deploy-dsk
```

### Full local DSK inventory tracked for this product

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
meadow-render-host-dsk
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

### Runtime cutover kits needed next

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-journal-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-result-journal-kit
meadow-reducer-seed-fixture-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
meadow-render-metadata-projection-kit
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Services The Kits Offer

### Current services

- Load product route and static shell.
- Import external meadow area and WebGL render kits from the manifest.
- Install and validate local DSK descriptors.
- Create arrival meadow render plans from source config.
- Provide fallback meadow render plan behavior if the area kit is unavailable.
- Enhance render plans with product metadata.
- Render the enhanced plan through the WebGL renderer.
- Maintain deterministic state root with scene/session/player/world/progression fields.
- Advance frame and last tick diagnostics.
- Expose GameHost state, snapshot, diagnostics, render plan, and render snapshot.
- Validate static files, DSK registry, render plan, and deterministic scene shape.

### Services needed next

- Normalize host, scripted, and future UI input into stable ActionFrame records.
- Batch, order, serialize, and summarize action frames per tick.
- Record accepted/rejected/no-op actions in an ActionJournal.
- Return ReducerResult envelopes from every reducer.
- Record reducer order, state diff summaries, events, accepted actions, rejected actions, and diagnostics.
- Maintain a reducer result journal for fixture assertions and GameHost diagnostics.
- Sample path progress against `ARRIVAL_MEADOW_CONFIG.features.path.points`.
- Complete `walk-the-path` at `pathProgress >= 0.35`.
- Evaluate focal-tree affordance against the existing target radius of `4.5`.
- Reject invalid inspect actions with stable reason codes.
- Accept valid `inspect:focal-tree` actions.
- Emit gameplay events for path progress, inspect, story, objective completion, arrival completion, and diagnostics.
- Dedupe one-shot gameplay events by stable event key.
- Project a compact `snapshot.gameplay` payload for GameHost consumers.
- Replay scripted action frames in DOM-free smoke tests and assert parity.

## Key Findings

- `index.html` is already a clean static shell and should stay unchanged for the next slice.
- `boot-game.js` correctly delegates all product startup to the web host.
- `web-host.js` owns the right seam for ActionFrame ingress because it controls frame timing and host inputs.
- `createIntoTheMeadowGame()` is the correct authority seam for reducer pipeline installation.
- `game-state.js` already contains the fields needed for first gameplay, but `advanceGameState()` is currently just a clock reducer.
- `game-snapshot.js` needs a dedicated `gameplay` projection before future UI/renderer work can depend on objective state.
- `ARRIVAL_MEADOW_CONFIG.features.path.points` is sufficient for deterministic path progress.
- `ARRIVAL_INTERACTION_TARGETS` already contains focal-tree radius and target position.
- `ARRIVAL_OBJECTIVES` already encodes both first-loop win conditions.
- The next implementation should avoid renderer extraction and input polish until ActionFrame/ReducerResult/GameplaySnapshot contracts are stable.

## Recommended Next Work

1. Preserve current browser route and rendering behavior.
2. Keep `game.tick({ time, dt })` compatible.
3. Add optional `game.tick({ time, dt, actions })` support.
4. Add `ActionFrame` normalization with stable id, source, scene id, frame, time, type, target, payload, and raw input fields.
5. Add ActionFrame batch ordering and freeze behavior.
6. Add reason codes for unsupported action, invalid scene, invalid payload, out of range, wrong target, duplicate event, and no effect.
7. Add `ReducerResult` envelope helpers.
8. Add a no-op reducer seed fixture that proves accepted/rejected/no-op shape without movement math.
9. Add ActionJournal and ReducerResultJournal summaries.
10. Add path-progress reducer using the arrival path points.
11. Add focal-tree inspect affordance evaluation using the target radius.
12. Add objective completion reducer for the existing objectives.
13. Add gameplay event journal with one-shot dedupe.
14. Add `snapshot.gameplay` with player, actions, reducers, events, objectives, story, interactions, completion, and diagnostics.
15. Add DOM-free fixtures for action normalization, reducer result shape, path progress, invalid inspect, valid inspect, objective completion, and replay parity.

## Suggested Next Vertical Slice

**Build target:** `IntoTheMeadow GameplaySnapshot Authority + ActionJournal Replay Fixture Cutover`

```txt
preserve index.html, boot-game.js, current render behavior, and GameHost compatibility
  -> keep game.tick({ time, dt }) working
  -> allow additive game.tick({ time, dt, actions })
  -> add meadow-actionframe-contract-kit
  -> add meadow-action-batch-kit
  -> add meadow-action-journal-kit
  -> add meadow-reducer-result-contract-kit
  -> add meadow-reducer-result-journal-kit
  -> add no-op reducer seed fixture
  -> route reducer pipeline through stable ReducerResult records
  -> add path-progress reducer from ARRIVAL_MEADOW_CONFIG.features.path.points
  -> complete walk-the-path at pathProgress >= 0.35
  -> add focal-tree affordance and inspect reducer from ARRIVAL_INTERACTION_TARGETS
  -> complete inspect-tree on accepted inspect:focal-tree
  -> derive arrival completion once both objectives are complete
  -> expose window.GameHost.getSnapshot().gameplay
  -> expose GameHost gameplay diagnostics helpers
  -> add DOM-free replay smoke for action journal and gameplay snapshot parity
  -> defer renderer extraction, save persistence, pointer-lock polish, and audio until gameplay snapshot parity is stable
```

## Validation Notes

No runtime source code changed in this documentation run.

No local build or smoke test was executed in this documentation run.
