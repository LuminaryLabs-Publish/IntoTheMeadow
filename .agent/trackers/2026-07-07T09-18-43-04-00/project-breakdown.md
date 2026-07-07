# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T09:18:43-04:00`  
**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Central ledger:** `LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md`  
**Selected next slice:** `IntoTheMeadow Action Ingress + Gameplay Snapshot Contract Cutover`

## Selection reason

The central `LuminaryLabs-Dev/LuminaryLabs` ledger most recently documented `LuminaryLabs-Publish/PrehistoricRush` at `2026-07-07T09-11-33-04-00`.

`IntoTheMeadow` is the next eligible tracked repo in the Publish rotation. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Repo read

`IntoTheMeadow` is a browser-first, DSK-composed meadow exploration game repo.

The live product path is:

```txt
index.html
-> src/boot/boot-game.js
-> src/hosts/web-host.js
-> external meadow-area-kit
-> external meadow-webgl-render-kit
-> src/game/create-into-the-meadow-game.js
-> src/game/game-state.js
-> src/game/enhance-render-plan.js
-> src/boot/expose-game-host.js
-> window.GameHost
```

The repo already owns:

```txt
product route
browser host
game manifest
local DSK descriptors
arrival meadow content
story beats
objectives
interaction targets
game state root
game snapshot
render-plan enhancement
diagnostics
static smoke tests
GitHub Pages deployment
```

The main architectural gap remains agency.

`src/game/game-state.js` defines player/progression/world state, but `advanceGameState()` only increments `frame` and records `lastTick`.

`src/hosts/web-host.js` has a render loop and debug HUD, but it does not collect or normalize deterministic input.

`src/game/game-snapshot.js` exposes raw state/render/diagnostics, but it does not yet expose a gameplay snapshot contract with action, reducer, event, objective, story, interaction, and render metadata surfaces.

## Interaction loop

### Current implemented loop

```txt
open index.html
-> boot-game.js starts startWebHost()
-> web-host.js loads GAME_MANIFEST external kits
-> createIntoTheMeadowGame() installs local DSK descriptors
-> createInitialGameState() creates frame, scene, player, world, progression, and DSK state
-> requestAnimationFrame calls game.tick({ time, dt })
-> advanceGameState() increments frame and lastTick only
-> meadow-area-kit returns a render plan
-> enhanceRenderPlan() adds grass patches, wind field, post-process, outline policy, and stats
-> meadow-webgl-render-kit renders the plan
-> exposeGameHost() publishes getState(), getSnapshot(), getDiagnostics(), renderer state, and render snapshot
```

### Intended player loop

```txt
spawn on the arrival path
-> look around the golden-hour meadow
-> move along ARRIVAL_MEADOW_CONFIG.features.path.points
-> pathProgress crosses 0.25
-> path-discovery story beat appears once
-> pathProgress crosses 0.35
-> walk-the-path objective completes
-> approach and face the old tree
-> focal-tree inspect affordance appears
-> inspect action emits inspect:focal-tree
-> focal-tree story beat appears once
-> inspect-tree objective completes
-> arrival meadow completion is derived
-> GameHost snapshot exposes completion, story, objective, interaction, player, and render metadata
```

### Recommended service loop

```txt
host input ingress
-> meadow-action-contract-kit creates normalized ActionFrame records
-> meadow-input-runtime-kit collects keyboard, pointer, touch, inspect, reset, and debug input
-> meadow-reducer-pipeline-kit applies reducers in fixed order
-> meadow-player-runtime-kit updates player pose
-> path-progress-runtime-kit samples the configured path
-> focal-tree-interaction-runtime-kit evaluates inspect affordance
-> meadow-event-journal-kit records deterministic events
-> story-trigger-runtime-kit consumes event journal and appends story beats
-> objective-completion-runtime-kit completes objectives from events and state
-> arrival-completion-save-kit derives completion in deterministic state
-> meadow-render-metadata-projection-kit projects gameplay metadata into enhanced render plans
-> meadow-snapshot-contract-kit validates stable GameHost snapshots
-> meadow-scripted-input-smoke-kit replays the path and tree inspection script
```

## Domains identified

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
path-corridor-content
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
player-position-yaw-pitch
path-progress-state
progression-state
story-beat-ledger
objective-ledger
interaction-target-registry
host-input-ingress
action-frame-contract
input-context-routing
scripted-input-domain
ordered-reducer-pipeline
movement-integration
path-progress-sampling
interaction-affordance-evaluation
inspect-event-evaluation
event-journal-domain
story-trigger-evaluation
objective-completion-evaluation
arrival-completion-state
save-progression-target
gameplay-render-metadata-projection
gamehost-state-contract
gamehost-snapshot-contract
gamehost-diagnostics-contract
deterministic-replay-domain
static-smoke-validation
dsk-registry-smoke-validation
render-plan-smoke-validation
deterministic-scene-smoke-validation
playable-loop-smoke-target
```

## Services identified

```txt
web-host-dsk:
  loadExternalKits
  createMeadowWebglRenderKit
  createIntoTheMeadowGame
  requestAnimationFrame loop
  game.tick bridge
  renderer.render bridge
  debug HUD update
  exposeGameHost
  target collect host input
  target produce ActionFrame records
  target pass actions to game.tick

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
  target applyReducerPipeline
  target appendEventJournal
  target expose action/reducer diagnostics
  target expose gameplay snapshot

game-composition-dsk:
  installDsks
  validate local DSK descriptors
  validate external kit availability
  createDskDescriptor
  enhanceRenderPlan
  target compose runtime reducers
  target validate reducer order
  target validate render metadata projection

meadow-area-kit:
  createMeadowAreaKit
  getRenderPlan
  getSnapshot
  validate

meadow-webgl-render-kit:
  createMeadowWebglRenderKit
  render
  getSnapshot

meadow-action-contract-kit:
  target defineActionTypes
  target normalizeActionFrame
  target validateActionFrame
  target serializeActionFrame
  target replayActionFrames

meadow-input-runtime-kit:
  target collectKeyboardActions
  target collectPointerLook
  target collectTouchActions
  target collectInspectAction
  target collectResetAction
  target collectDebugToggleAction
  target snapshotInputState

meadow-reducer-pipeline-kit:
  target defineReducerOrder
  target applyReducers
  target recordReducerDiagnostics
  target freezeReducerOutput
  target reportStateDiffSummary

meadow-player-runtime-kit:
  target integrateMovement
  target updateYawPitch
  target clampToMeadowBounds
  target derivePathFacing
  target emitPlayerSnapshot

path-progress-runtime-kit:
  target sampleNearestPathSegment
  target projectPlayerOntoPath
  target calculateProgress01
  target detectProgressThresholds
  target emitPathProgressEvent

focal-tree-interaction-runtime-kit:
  target evaluateTargetProximity
  target evaluateTargetFacing
  target setInspectAffordance
  target emitInspectEvent
  target snapshotInteractionState

meadow-event-journal-kit:
  target appendGameplayEvent
  target dedupeOneShotEvents
  target serializeEventJournal
  target deriveEventCounts
  target exposeReplayInput

story-trigger-runtime-kit:
  target parseStoryTriggers
  target evaluateSceneStartTrigger
  target evaluatePathProgressTrigger
  target evaluateInspectTrigger
  target appendStoryBeat
  target diagnoseUnhandledTriggers

objective-completion-runtime-kit:
  target evaluatePathProgressObjective
  target evaluateInspectObjective
  target completeObjective
  target advanceActiveObjective
  target snapshotObjectiveState

arrival-completion-save-kit:
  target deriveArrivalCompletion
  target snapshotCompletion
  target keep completion deterministic
  target defer persistence adapter until deterministic parity is stable

meadow-render-metadata-projection-kit:
  target projectPlayerMetadata
  target projectCameraMetadata
  target projectObjectiveMetadata
  target projectStoryMetadata
  target projectInteractionMetadata
  target projectCompletionMetadata
  target keep product gameplay logic outside meadow-webgl-render-kit

meadow-snapshot-contract-kit:
  target defineSnapshotShape
  target validateSnapshotShape
  target validateDiagnosticsShape
  target validateRenderMetadataShape
  target normalizeVolatileFields

meadow-scripted-input-smoke-kit:
  target scriptPathWalk
  target scriptFocalTreeApproach
  target scriptFocalTreeInspect
  target replayActionFrames
  target assertSnapshotParity
```

## Kits captured

### External reusable kits

```txt
meadow-area-kit
meadow-webgl-render-kit
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

### Full local inventory

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

### Runtime cutover kits

```txt
meadow-action-contract-kit
meadow-input-runtime-kit
meadow-action-ingress-diagnostics-kit
meadow-reducer-pipeline-kit
meadow-player-runtime-kit
path-progress-runtime-kit
focal-tree-interaction-runtime-kit
meadow-event-journal-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-save-kit
meadow-gameplay-diagnostics-kit
meadow-render-metadata-projection-kit
meadow-snapshot-contract-kit
meadow-deterministic-replay-kit
meadow-scripted-input-smoke-kit
playable-loop-smoke-kit
```

## Blockers

```txt
advance-game-state-stub
host-input-gap
action-frame-contract-gap
tick-actions-gap
reducer-order-gap
event-journal-gap
path-progress-gap
focal-tree-affordance-gap
inspect-event-gap
story-trigger-gap
objective-completion-gap
arrival-completion-gap
gameplay-snapshot-gap
render-metadata-gap
diagnostics-contract-gap
replay-parity-gap
```

## Next ideation

### Next slice

```txt
IntoTheMeadow Action Ingress + Gameplay Snapshot Contract Cutover
```

### Intent

Before making the meadow visually larger, make the current arrival meadow executable, deterministic, and observable. The first implementation should turn raw browser/scripted input into normalized action frames, pass those into the game tick, update player/path/interaction/story/objective state through a fixed reducer path, and expose a stable gameplay snapshot contract through `window.GameHost`.

### Build order

```txt
1. Keep index.html and src/boot/boot-game.js thin.
2. Add meadow-action-contract-kit with ActionFrame fields: frame, time, sceneId, action, value, source.
3. Add meadow-input-runtime-kit in src/hosts/web-host.js for keyboard, pointer, touch, inspect, reset, and debug actions.
4. Pass game.tick({ time, dt, actions }) from the host loop.
5. Expand createInitialGameState() with actionJournal, eventJournal, interaction, diagnostics, and completion fields.
6. Replace advanceGameState() stub with a reducer pipeline, but keep reducers small and pure.
7. Add player reducer for movement, yaw, pitch, bounds, and path-facing metadata.
8. Add path progress reducer using ARRIVAL_MEADOW_CONFIG.features.path.points.
9. Add focal tree interaction reducer using ARRIVAL_INTERACTION_TARGETS.
10. Add event journal reducer for path-progress and inspect events.
11. Add story reducer consuming STORY_BEATS triggers.
12. Add objective reducer consuming ARRIVAL_OBJECTIVES.
13. Add arrival completion reducer once walk-the-path and inspect-tree are complete.
14. Add gameplay snapshot contract in createGameSnapshot().
15. Add render metadata projection through enhanceRenderPlan() options without leaking objective/story rules into renderer kits.
16. Add diagnostics for action counts, reducer order, event counts, objective state, story state, interaction state, and snapshot contract health.
17. Add scripted smoke for path walk, focal tree inspect, story/objective completion, and replay parity.
```

## Acceptance targets

```txt
npm run check
game.tick accepts actions without breaking existing smoke tests
window.GameHost.getState().player.pathProgress increases under scripted move actions
path-discovery story beat appears exactly once after pathProgress >= 0.25
walk-the-path completes after pathProgress >= 0.35
focal-tree inspect affordance appears inside target radius
inspect-tree completes after inspect:focal-tree
arrival completion derives after both objectives complete
window.GameHost.getSnapshot().gameplay includes player, actions, events, story, objectives, interaction, completion, reducer diagnostics, and render metadata
scripted action replay produces the same normalized gameplay snapshot
enhanceRenderPlan receives metadata but meadow-webgl-render-kit stays product-agnostic
```

## Files changed in this documentation run

```txt
LuminaryLabs-Publish/IntoTheMeadow:.agent/trackers/2026-07-07T09-18-43-04-00/project-breakdown.md
LuminaryLabs-Publish/IntoTheMeadow:.agent/kit-registry.json
LuminaryLabs-Publish/IntoTheMeadow:.agent/README.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T09-18-43-04-00-into-the-meadow-action-ingress-snapshot-contract-breakdown.md
```

## Notes

No product runtime source code was changed in this pass.

No local build or test run was executed in this pass because the requested work was an internal documentation and tracker update.
