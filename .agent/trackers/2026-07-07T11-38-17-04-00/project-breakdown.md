# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T11-38-17-04-00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected next slice:** `ActionFrame Reducer Contract + Gameplay Snapshot Fixture`

## Selection

`IntoTheMeadow` is the next eligible tracked repo after the latest central `PrehistoricRush` breakdown. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

Accessible Publish repos observed in this rotation include:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

## Source read

`IntoTheMeadow` is still a clean DSK-composed browser meadow game scaffold. The active route is thin and productive:

```txt
index.html
-> src/boot/boot-game.js
-> src/hosts/web-host.js
-> GAME_MANIFEST external kit URLs
-> createIntoTheMeadowGame()
-> installDsks()
-> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
-> createInitialGameState()
-> requestAnimationFrame loop
-> game.tick({ time, dt })
-> getRenderPlan()
-> enhanceRenderPlan()
-> meadow-webgl-render-kit.render(plan)
-> window.GameHost
```

The repo already owns the product-specific content needed for the first playable loop:

```txt
ARRIVAL_MEADOW_CONFIG.features.path.points
ARRIVAL_INTERACTION_TARGETS
STORY_BEATS
ARRIVAL_OBJECTIVES
```

The blocking gap remains runtime agency. `src/game/game-state.js` creates player, world, progression, and DSK state, but `advanceGameState()` only increments `frame` and records `lastTick`. `src/hosts/web-host.js` ticks and renders the game, but it does not collect deterministic input or pass action frames into `game.tick()`. `src/game/game-snapshot.js` exposes manifest/state/render/diagnostics, but not a dedicated gameplay snapshot contract.

## Interaction loop

### Current loop

```txt
1. Browser loads index.html.
2. boot-game.js locates canvas, HUD, status, loading, and debug mode.
3. web-host.js imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.
4. createIntoTheMeadowGame() installs local DSK descriptors.
5. createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) creates the arrival meadow render model.
6. createInitialGameState() creates frame, active scene, session, player, world, progression, and DSK snapshot.
7. requestAnimationFrame calls game.tick({ time, dt }).
8. advanceGameState() increments frame and writes lastTick only.
9. meadow-area-kit creates a render plan.
10. enhanceRenderPlan() adds product-side render metadata.
11. meadow-webgl-render-kit renders the plan.
12. GameHost exposes getState(), getSnapshot(), getDiagnostics(), and renderer snapshot state.
```

### Target player loop

```txt
1. Player spawns at the arrival path near z=-36.
2. Host input and scripted fixtures create ActionFrame records.
3. game.tick({ time, dt, actions }) accepts deterministic action batches.
4. Reducers run in fixed order.
5. Movement updates player position, yaw, pitch, and pathProgress.
6. Path progress crosses 0.25 and emits path-progress:0.25 once.
7. walk-the-path completes at pathProgress >= 0.35.
8. Focal-tree affordance becomes active inside the target radius.
9. Invalid inspect is rejected with diagnostics.
10. Valid inspect emits inspect:focal-tree once.
11. focal-tree story beat appears once.
12. inspect-tree completes.
13. arrival-completion derives after both objectives complete.
14. GameHost snapshot exposes stable gameplay state.
15. Render metadata receives product-neutral player, objective, story, interaction, and completion hints.
```

### Recommended service loop

```txt
host-input-ingress
-> meadow-actionframe-contract-kit
-> meadow-action-batch-kit
-> meadow-action-acceptance-kit
-> meadow-reducer-contract-kit
-> meadow-reducer-pipeline-kit
-> meadow-player-path-reducer-kit
-> path-progress-runtime-kit
-> focal-tree-affordance-kit
-> inspect-event-runtime-kit
-> meadow-event-journal-kit
-> story-trigger-runtime-kit
-> objective-completion-runtime-kit
-> arrival-completion-runtime-kit
-> meadow-gameplay-snapshot-kit
-> meadow-render-metadata-projection-kit
-> meadow-gameplay-fixture-kit
-> replay-parity-smoke-kit
```

## Domains in use

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
keyboard-input
pointer-look-input
touch-input
inspect-input
reset-input
debug-input
scripted-input-domain
action-frame-contract
action-batch-contract
action-frame-normalization
action-acceptance-policy
action-rejection-policy
ordered-reducer-pipeline
reducer-contract
movement-integration
path-point-sampling
nearest-path-segment-sampling
path-progress-threshold-detection
interaction-affordance-evaluation
focal-tree-proximity-check
focal-tree-facing-check
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
gameplay-snapshot-contract
deterministic-replay-domain
fixture-replay-domain
static-smoke-validation
dsk-registry-smoke-validation
render-plan-smoke-validation
deterministic-scene-smoke-validation
playable-loop-smoke-target
```

## Kits identified

### External runtime kits

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

### Next cutover kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-reducer-contract-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
meadow-event-journal-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
meadow-render-metadata-projection-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Services that kits offer

```txt
meadow-area-kit:
  createMeadowAreaKit
  getRenderPlan
  getSnapshot
  validate

meadow-webgl-render-kit:
  createMeadowWebglRenderKit
  render
  getSnapshot

meadow-actionframe-contract-kit:
  defineActionFrameShape
  defineActionTypes
  normalizeActionFrame
  validateActionFrame
  serializeActionFrame
  markAccepted
  markRejected

meadow-action-batch-kit:
  collectFrameActions
  sortActionFrames
  dedupeActionFrames
  freezeActionBatch
  summarizeActionBatch

meadow-input-runtime-kit:
  collectKeyboardActions
  collectPointerLook
  collectTouchActions
  collectInspectAction
  collectResetAction
  collectDebugToggleAction
  snapshotInputState

meadow-action-acceptance-kit:
  defineSceneActionMatrix
  acceptMove
  acceptLook
  acceptInspect
  acceptReset
  rejectUnsupportedAction
  reportRejectedActions

meadow-reducer-contract-kit:
  defineReducerInput
  defineReducerOutput
  validateReducerResult
  freezeReducerResult
  normalizeReducerDiagnostics

meadow-reducer-pipeline-kit:
  defineReducerOrder
  applyReducers
  recordReducerDiagnostics
  freezeReducerOutput
  reportStateDiffSummary

meadow-player-path-reducer-kit:
  applyMoveIntent
  integratePlayerPosition
  updateYawPitch
  clampToMeadowBounds
  derivePathFacing
  emitPlayerSnapshot

path-progress-runtime-kit:
  sampleNearestPathSegment
  projectPlayerOntoPath
  calculateProgress01
  detectProgressThresholds
  emitPathProgressEvent

focal-tree-affordance-kit:
  evaluateTargetProximity
  evaluateTargetFacing
  setInspectAffordance
  snapshotAffordanceState

inspect-event-runtime-kit:
  acceptInspectRequest
  emitInspectEvent
  dedupeInspectEvent
  rejectOutOfRangeInspect
  snapshotInspectState

meadow-event-journal-kit:
  appendGameplayEvent
  dedupeOneShotEvents
  serializeEventJournal
  deriveEventCounts
  exposeReplayInput

story-trigger-runtime-kit:
  parseStoryTriggers
  evaluateSceneStartTrigger
  evaluatePathProgressTrigger
  evaluateInspectTrigger
  appendStoryBeat
  diagnoseUnhandledTriggers

objective-completion-runtime-kit:
  evaluatePathProgressObjective
  evaluateInspectObjective
  completeObjective
  advanceActiveObjective
  snapshotObjectiveState

arrival-completion-runtime-kit:
  deriveArrivalCompletion
  snapshotCompletion
  validateCompletionState
  deferPersistenceAdapter

meadow-gameplay-snapshot-kit:
  defineGameplaySnapshotShape
  validateGameplaySnapshot
  normalizeVolatileFields
  attachGameplayToGameHostSnapshot

meadow-render-metadata-projection-kit:
  projectPlayerMetadata
  projectObjectiveMetadata
  projectStoryMetadata
  projectInteractionMetadata
  projectCompletionMetadata

meadow-gameplay-fixture-kit:
  scriptPathWalk
  scriptFocalTreeApproach
  scriptFocalTreeInspect
  scriptInvalidInspect
  scriptObjectiveCompletion
  scriptReplayParity

replay-parity-smoke-kit:
  replayActionFrames
  compareSnapshots
  assertDeterministicSnapshot
  reportReplayDiff
```

## Next recommendation

```txt
IntoTheMeadow ActionFrame Reducer Contract + Gameplay Snapshot Fixture Cutover
```

Build order:

```txt
keep index.html and src/boot/boot-game.js thin
-> add meadow-actionframe-contract-kit
-> add meadow-action-batch-kit so game.tick receives stable sorted action arrays
-> add meadow-input-runtime-kit in src/hosts/web-host.js
-> pass game.tick({ time, dt, actions })
-> expand state with actionJournal, rejectedActions, reducerDiagnostics, eventJournal, interaction, completion, and gameplaySnapshotVersion
-> add meadow-reducer-contract-kit before implementing concrete reducers
-> add meadow-reducer-pipeline-kit with fixed reducer order and reducer diagnostics
-> add meadow-player-path-reducer-kit over the existing six ARRIVAL_MEADOW_CONFIG path points
-> add path-progress-runtime-kit and emit path-progress:0.25 once
-> complete walk-the-path at pathProgress >= 0.35
-> add focal-tree-affordance-kit using ARRIVAL_INTERACTION_TARGETS focal-tree radius 4.5
-> add inspect-event-runtime-kit and reject invalid inspect before valid inspect is accepted
-> complete inspect-tree after inspect:focal-tree
-> derive arrival completion after both objectives complete
-> expose window.GameHost.getSnapshot().gameplay
-> add meadow-gameplay-fixture-kit with path, invalid inspect, valid inspect, completion, and replay scripts
-> add replay-parity-smoke-kit
-> defer renderer and visual extraction until gameplay snapshot parity exists
```

## Acceptance targets

```txt
npm run check
existing static, registry, render-plan, and deterministic-scene smokes still pass
game.tick accepts actions without breaking time/dt-only ticks
ActionFrame records include frame, time, sceneId, action, value, source, accepted, rejected, reason
accepted and rejected actions are journaled separately
reducer diagnostics identify reducer order and state diff summary
scripted movement increases player.pathProgress deterministically
path-discovery story beat appears exactly once at pathProgress >= 0.25
walk-the-path completes at pathProgress >= 0.35
invalid inspect is rejected with reason out_of_range or not_facing_target
valid focal-tree inspect emits inspect:focal-tree once
focal-tree story beat appears exactly once
inspect-tree completes after valid inspect
arrival completion derives only after both objectives complete
GameHost snapshot gameplay includes player, actions, reducers, events, story, objectives, interaction, completion, and render metadata
scripted replay produces the same normalized gameplay snapshot
meadow-area-kit and meadow-webgl-render-kit remain product-agnostic
```

## Blockers

```txt
advance-game-state-stub
host-input-gap
tick-actions-gap
action-frame-contract-gap
action-batch-gap
reducer-contract-gap
reducer-order-gap
path-progress-gap
focal-tree-affordance-gap
inspect-event-gap
event-journal-gap
story-trigger-gap
objective-completion-gap
arrival-completion-gap
gameplay-snapshot-gap
fixture-replay-gap
replay-parity-gap
```

## Validation

No runtime source code changed.

No local build/test run was executed in this documentation pass.
