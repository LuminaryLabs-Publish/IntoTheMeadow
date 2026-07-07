# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T08:10:08-04:00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected because:** the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed `LuminaryLabs-Publish/PrehistoricRush` as the latest completed eligible Publish breakdown. `IntoTheMeadow` is the next eligible tracked Publish repo in the rotation, with `LuminaryLabs-Publish/TheCavalryOfRome` excluded by rule.

## Executive summary

`IntoTheMeadow` is a clean browser-first, DSK-composed meadow exploration game shell. It has a thin static entry, a web host, external meadow area/render kits, a product game factory, local DSK descriptors, content files for arrival meadow/objectives/story/interaction targets, snapshot/diagnostics surfaces, and smoke tests.

The current runtime still stops just before playable agency. `src/hosts/web-host.js` ticks `game.tick({ time, dt })` every animation frame, and `src/game/game-state.js` only increments `frame` and records `lastTick`. The product already defines a player state, path points, objectives, story beats, and interaction targets, but no service evaluates input, movement, path progress, inspect affordances, story triggers, objective completion, arrival completion, replay, or render metadata from gameplay state.

This pass refines the next cutover into **Action Reducer Replay + Render Metadata Contract**. The strongest next move is to make normalized action frames the only gameplay input, split `advanceGameState()` into ordered pure reducers, append deterministic gameplay events, replay scripted actions to the same snapshot, and project player/objective/story/interaction metadata into GameHost and render-plan debug surfaces.

## Interaction loop

```txt
current runtime loop:
  browser opens index.html
  -> src/boot/boot-game.js starts the web host
  -> src/hosts/web-host.js imports GAME_MANIFEST external kits
  -> web host creates createIntoTheMeadowGame({ externalKits })
  -> game factory installs local DSK descriptors
  -> game factory creates arrival meadow area from ARRIVAL_MEADOW_CONFIG
  -> createInitialGameState creates frame, scene, session, player, world, progression, and DSK state
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState increments frame and records lastTick
  -> meadow-area-kit emits a render plan
  -> enhanceRenderPlan applies product/performance metadata
  -> meadow-webgl-render-kit renders the plan
  -> GameHost exposes state, snapshot, diagnostics, and last enhanced render plan

intended player loop:
  spawn at the arrival path
  -> move along the meadow path
  -> path progress passes the story threshold
  -> path-discovery story beat appears once
  -> walk-the-path objective completes
  -> approach the old focal tree
  -> inspect affordance becomes active
  -> inspect:focal-tree event fires
  -> focal-tree story beat appears once
  -> inspect-tree objective completes
  -> arrival meadow completion is derived
  -> GameHost snapshot exposes player/story/objective/interaction/completion state

recommended service loop:
  host input collection
  -> meadow-action-contract-kit normalizes browser input and scripted input into action frames
  -> meadow-reducer-pipeline-kit applies reducers in fixed order
  -> meadow-player-runtime-kit mutates player pose/path-facing state
  -> path-progress-runtime-kit samples ARRIVAL_MEADOW_CONFIG.features.path.points
  -> focal-tree-interaction-runtime-kit evaluates proximity/facing/inspect affordance
  -> meadow-event-journal-kit records path-progress, inspect, story, objective, and completion events
  -> story-trigger-runtime-kit evaluates one-shot story triggers from events
  -> objective-completion-runtime-kit evaluates completion rules from content descriptors
  -> arrival-completion-save-kit derives deterministic completion state
  -> meadow-render-metadata-projection-kit projects gameplay state into render/debug metadata
  -> meadow-deterministic-replay-kit replays action frames and compares snapshots
```

## Domains in use

```txt
static browser shell
GitHub Pages deployment
browser boot runtime
web host runtime
external kit loading
CDN kit import manifest
requestAnimationFrame loop
product game factory
fallback meadow area kit
DSK registry and descriptor installer
local DSK descriptor validation
external meadow area bridge
external WebGL meadow renderer
arrival meadow content domain
path corridor config domain
focal tree object domain
grass / flowers / rocks / mushrooms / tree-line config domain
terrain/material palette domain
world wind state domain
render-plan generation
render-plan enhancement
render stats and diagnostics
deterministic state root
scene identity
session identity
player position / yaw / pitch / pathProgress
action contract domain
host input mapping domain
scripted input domain
ordered reducer pipeline domain
event journal domain
movement integration domain
camera metadata domain
path-progress sampling domain
interaction target registry
interaction affordance evaluation
inspect event evaluation
story beat registry
story trigger evaluation
objective registry
objective completion reducer
arrival completion state
save/progression persistence target
render metadata projection domain
GameHost snapshot contract
deterministic replay domain
static smoke validation
DSK registry smoke validation
render-plan smoke validation
deterministic-scene smoke validation
playable-loop smoke target
```

## Services identified

```txt
web-host-dsk:
  loadExternalKits
  createMeadowWebglRenderKit
  createIntoTheMeadowGame
  animation frame loop
  game.tick
  getRenderPlan
  enhanceRenderPlan
  renderer.render
  debug HUD/status text
  expose GameHost
  target collectKeyboard
  target collectPointer
  target collectTouch
  target collectInspect
  target bufferActionFrame
  target pass actions into game.tick({ time, dt, actions })

into-the-meadow-game-dsk:
  createIntoTheMeadowGame
  createFallbackMeadowAreaKit
  installDsks
  createInitialGameState
  advanceGameState
  getState
  getRenderPlan
  getDiagnostics
  getSnapshot
  tick
  reset
  target compose reducer pipeline
  target emit gameplay event journal
  target replay action frames
  target expose reducer/action diagnostics

game-composition-dsk:
  installDsks
  validate local DSK descriptors
  validate external DSK hooks
  createDskDescriptor
  enhanceRenderPlan
  target compose runtime reducer services
  target validate reducer order
  target validate action-frame schema
  target validate render metadata projection

meadow-action-contract-kit:
  defineActionTypes
  normalizeActionFrame
  validateActions
  serializeActions
  replayActions
  reject invalid browser-only payloads from deterministic state

meadow-reducer-pipeline-kit:
  defineReducerOrder
  applyReducers
  collectReducerDiagnostics
  freezeReducerOutput
  reportStateDiffSummary

meadow-player-runtime-kit:
  integrateMovement
  updateYawPitch
  clampToMeadowBounds
  derivePathFacing
  emitPlayerSnapshot

path-progress-runtime-kit:
  nearestPathSegment
  projectPlayerOntoPath
  calculateProgress01
  detectProgressThresholds
  emitPathProgressEvent

focal-tree-interaction-runtime-kit:
  evaluateTargetDistance
  evaluateFacingOrViewCone
  setInspectAffordance
  acceptInspectAction
  emitInspectEvent

meadow-event-journal-kit:
  appendGameplayEvent
  dedupeOneShotEvents
  serializeEventJournal
  deriveEventCounts
  exposeReplayInput

story-trigger-runtime-kit:
  parse scene-start, path-progress, and inspect triggers
  evaluateOneShotTriggers
  appendStoryBeatIds
  reportUnhandledTriggers

objective-completion-runtime-kit:
  evaluate path-progress objective
  evaluate inspect objective
  append completedObjectiveIds
  advance activeObjectiveId
  expose objective snapshot

arrival-completion-save-kit:
  derive arrivalComplete when required objectives are done
  expose deterministic completion field
  hold localStorage/persistence as a later adapter
  validate completion state

meadow-render-metadata-projection-kit:
  projectPlayerMetadata
  projectCameraMetadata
  projectObjectiveMetadata
  projectStoryMetadata
  projectInteractionMetadata
  projectCompletionMetadata

meadow-gameplay-diagnostics-kit:
  reportActionCounts
  reportReducerOrder
  reportReducerStateDiffs
  reportEventJournalHealth
  reportObjectiveState
  reportStoryState
  reportInteractionState

meadow-deterministic-replay-kit:
  replayActionFrames
  compareSnapshots
  normalizeVolatileFields
  assertDeterministicSnapshot

playable-loop-smoke-kit:
  scriptPathWalk
  scriptFocalTreeInspect
  assertPathProgress
  assertStoryTrigger
  assertWalkObjective
  assertInspectObjective
  assertCompletion
```

## Kits captured

```txt
external kits:
  meadow-area-kit
  meadow-webgl-render-kit

required v0.1 local DSKs:
  into-the-meadow-game-dsk
  web-host-dsk
  game-composition-dsk
  meadow-area-bridge-dsk
  meadow-render-host-dsk
  meadow-diagnostics-dsk
  meadow-performance-dsk
  post-process-stack-dsk
  static-pages-deploy-dsk

full local inventory:
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

runtime cutover kits:
  meadow-action-contract-kit
  meadow-input-runtime-kit
  meadow-reducer-pipeline-kit
  meadow-player-runtime-kit
  path-progress-runtime-kit
  focal-tree-interaction-runtime-kit
  meadow-event-journal-kit
  story-trigger-runtime-kit
  objective-completion-runtime-kit
  arrival-completion-save-kit
  meadow-render-metadata-projection-kit
  meadow-gameplay-diagnostics-kit
  meadow-deterministic-replay-kit
  meadow-scripted-input-smoke-kit
  playable-loop-smoke-kit
  meadow-snapshot-contract-kit
```

## Current blockers

```txt
advance-game-state-stub
host-input-gap
action-contract-gap
reducer-order-gap
path-progress-gap
interaction-affordance-gap
inspect-event-gap
story-trigger-gap
objective-completion-gap
arrival-completion-gap
event-journal-gap
replay-parity-gap
render-metadata-gap
snapshot-contract-gap
```

## Main recommendation

Next slice:

```txt
IntoTheMeadow Action Reducer Replay + Render Metadata Contract Cutover
```

Build order:

```txt
1. Keep index.html and src/boot/boot-game.js thin.
2. Add meadow-action-contract-kit with move, look, inspect, reset, and debug-toggle actions.
3. Add meadow-input-runtime-kit in src/hosts/web-host.js, but keep raw DOM events outside deterministic state.
4. Change game.tick to accept game.tick({ time, dt, actions }).
5. Add meadow-reducer-pipeline-kit and make reducer order explicit.
6. Split advanceGameState into player, path-progress, interaction, event-journal, story, objective, completion, diagnostics, and metadata reducers.
7. Add meadow-event-journal-kit so story/objective/completion can consume stable domain events.
8. Add path-progress-runtime-kit against ARRIVAL_MEADOW_CONFIG.features.path.points.
9. Add focal-tree-interaction-runtime-kit against ARRIVAL_INTERACTION_TARGETS.
10. Add story-trigger-runtime-kit against STORY_BEATS.
11. Add objective-completion-runtime-kit against ARRIVAL_OBJECTIVES.
12. Add arrival-completion-save-kit as deterministic completion only; defer localStorage.
13. Add meadow-render-metadata-projection-kit so GameHost/render debug can see gameplay metadata.
14. Add meadow-deterministic-replay-kit and meadow-snapshot-contract-kit.
15. Expand smoke tests with scripted path walk, focal-tree inspect, event journal replay, and render metadata assertions.
```

## Acceptance targets

```txt
npm run check
window.GameHost.getState().player.pathProgress increases under scripted movement
path-discovery story beat appears exactly once after pathProgress >= 0.25
walk-the-path completes after pathProgress >= 0.35
focal-tree inspect affordance appears inside target radius
inspect-tree completes after inspect:focal-tree
arrival completion is derived after walk-the-path and inspect-tree are both complete
GameHost snapshot includes player, objective, story, interaction, event journal, completion, reducer diagnostics, and render metadata
scripted action replay produces the same normalized snapshot
render metadata projection does not leak product-specific story/objective logic into meadow-webgl-render-kit
```

## Implementation notes for the next agent

```txt
Do not start by making the scene prettier.
Do not place product-specific gameplay logic inside meadow-area-kit or meadow-webgl-render-kit.
Keep raw DOM KeyboardEvent/PointerEvent objects out of deterministic state.
Use content descriptors as authority for thresholds and target ids.
Use pure reducer functions first, then host wiring second.
Add replay smoke before increasing objective count.
```

## Files reviewed

```txt
package.json
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/content/meadow-areas/arrival-meadow.js
src/content/objectives/arrival-objectives.js
src/content/story/story-beats.js
src/content/interaction-targets/arrival-targets.js
.agent/README.md
.agent/kit-registry.json
```

## Validation status

No runtime source code was changed in this pass.

No local build or test run was executed in this pass; this run updated documentation, tracker, registry, and central ledger files only.
