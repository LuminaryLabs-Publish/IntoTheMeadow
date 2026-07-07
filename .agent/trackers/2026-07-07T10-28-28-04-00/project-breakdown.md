# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T10:28:28-04:00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected after:** `LuminaryLabs-Publish/PrehistoricRush`

**Excluded:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`IntoTheMeadow` is a clean DSK-composed browser meadow exploration project. The live runtime already has strong product/config boundaries, but it still stops at a proof-scene loop: the host ticks the game, the render kits draw the meadow, and `advanceGameState()` only increments `frame` plus `lastTick`.

The highest-value next cutover is no longer broad visual improvement. It is a narrow gameplay authority slice: normalize actions, move the player along the existing path points, evaluate path progress, expose the old-tree inspect affordance, complete the two existing objectives, and prove the loop through deterministic fixture replay.

## Selection note

The central repo ledger showed `LuminaryLabs-Publish/PrehistoricRush` as the latest eligible Publish breakdown at `2026-07-07T10-21-39-04-00`. `IntoTheMeadow` was selected as the next eligible tracked Publish repo in the established rotation, while `LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

## Source read

Observed runtime surfaces:

```txt
index.html
-> src/boot/boot-game.js
-> src/hosts/web-host.js
-> src/game/create-into-the-meadow-game.js
-> src/game/game-state.js
-> src/game/game-snapshot.js
-> src/game/enhance-render-plan.js
-> external meadow-area-kit
-> external meadow-webgl-render-kit
-> window.GameHost
```

Important source facts:

```txt
src/game/game-state.js
  createInitialGameState() defines:
    frame
    activeSceneId
    activeSessionId
    player.position
    player.yaw
    player.pitch
    player.pathProgress
    world.wind
    progression.activeObjectiveId
    progression.completedObjectiveIds
    progression.storyBeatIds
    dsk install snapshot

  advanceGameState() currently:
    increments frame
    stores lastTick
    does not consume actions
    does not move player
    does not evaluate path progress
    does not evaluate interaction targets
    does not evaluate stories/objectives/completion

src/hosts/web-host.js
  loads external meadow kits
  creates game and renderer
  calls game.tick({ time, dt: 1 / 60 })
  enhances render plan
  renders scene
  exposes GameHost
  does not collect deterministic action frames

src/content/meadow-areas/arrival-meadow.js
  defines the route path with six points from z -44 to z 20
  defines focal tree position at x 0, y 0, z 24
  defines grass, flowers, rocks, mushrooms, tree line, wind, and golden-hour style

src/content/objectives/arrival-objectives.js
  walk-the-path completes at path progress >= 0.35
  inspect-tree completes after focal-tree inspect

src/content/story/story-beats.js
  arrival starts at scene-start
  path-discovery triggers at path-progress:0.25
  focal-tree triggers at inspect:focal-tree

src/content/interaction-targets/arrival-targets.js
  focal-tree is inspectable at radius 4.5
  arrival-path is a path-progress target at radius 32
```

## Interaction loop

### Current loop

```txt
open index.html
-> boot-game.js starts the web host
-> web-host.js imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST
-> createIntoTheMeadowGame() installs local DSK descriptors
-> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) creates the arrival meadow model
-> createInitialGameState() creates the deterministic state root
-> requestAnimationFrame calls game.tick({ time, dt })
-> advanceGameState() increments frame and records lastTick only
-> meadow-area-kit emits a render plan
-> enhanceRenderPlan() adds product render metadata
-> meadow-webgl-render-kit renders the scene
-> window.GameHost exposes getState, getSnapshot, getDiagnostics, and render surfaces
```

### Intended first playable loop

```txt
spawn player near the arrival path
-> collect keyboard / pointer / touch / scripted input
-> normalize input into ActionFrame records
-> run game.tick({ time, dt, actions })
-> apply reducers in a fixed deterministic order
-> move the player along / near ARRIVAL_MEADOW_CONFIG.features.path.points
-> update player.pathProgress
-> trigger path-discovery once when pathProgress >= 0.25
-> complete walk-the-path when pathProgress >= 0.35
-> evaluate old-tree proximity and facing
-> expose inspect affordance for focal-tree
-> accept inspect:focal-tree
-> trigger focal-tree story beat
-> complete inspect-tree objective
-> derive arrival meadow completion
-> expose gameplay snapshot and render debug metadata
-> replay the same action fixture and assert parity
```

### Recommended service loop

```txt
host-input-ingress
-> meadow-action-contract-kit
-> meadow-input-runtime-kit
-> meadow-action-acceptance-kit
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
-> meadow-scripted-fixture-kit
-> replay-parity-smoke-kit
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
action-frame-normalization
action-acceptance-policy
action-rejection-policy
ordered-reducer-pipeline
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
deterministic-replay-domain
static-smoke-validation
dsk-registry-smoke-validation
render-plan-smoke-validation
deterministic-scene-smoke-validation
playable-loop-smoke-target
```

## Kits identified

### External runtime kits already consumed

```txt
meadow-area-kit
  source: NexusRealtime-ProtoKits CDN
  domain: meadow-area
  services:
    createMeadowAreaKit()
    getRenderPlan()
    getSnapshot()
    validate()

meadow-webgl-render-kit
  source: NexusRealtime-ProtoKits CDN
  domain: meadow-webgl-render
  services:
    createMeadowWebglRenderKit()
    render()
    getSnapshot()
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

### Full local inventory already named by the repo

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

### Next extraction / cutover kits

```txt
meadow-action-contract-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
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
meadow-scripted-fixture-kit
replay-parity-smoke-kit
```

## Kit services

| Kit | Services offered |
| --- | --- |
| `meadow-action-contract-kit` | `defineActionTypes`, `normalizeActionFrame`, `validateActionFrame`, `serializeActionFrame`, `rejectInvalidAction`, `acceptActionFrame` |
| `meadow-input-runtime-kit` | `collectKeyboardActions`, `collectPointerLook`, `collectTouchActions`, `collectInspectAction`, `collectResetAction`, `collectDebugToggleAction`, `snapshotInputState` |
| `meadow-action-acceptance-kit` | `defineSceneActionMatrix`, `acceptMove`, `acceptLook`, `acceptInspect`, `acceptReset`, `rejectUnsupportedAction`, `reportRejectedActions` |
| `meadow-reducer-pipeline-kit` | `defineReducerOrder`, `applyReducers`, `recordReducerDiagnostics`, `freezeReducerOutput`, `reportStateDiffSummary` |
| `meadow-player-path-reducer-kit` | `applyMoveIntent`, `integratePlayerPosition`, `updateYawPitch`, `clampToMeadowBounds`, `derivePathFacing`, `emitPlayerSnapshot` |
| `path-progress-runtime-kit` | `sampleNearestPathSegment`, `projectPlayerOntoPath`, `calculateProgress01`, `detectProgressThresholds`, `emitPathProgressEvent` |
| `focal-tree-affordance-kit` | `evaluateTargetProximity`, `evaluateTargetFacing`, `setInspectAffordance`, `snapshotAffordanceState` |
| `inspect-event-runtime-kit` | `acceptInspectRequest`, `emitInspectEvent`, `dedupeInspectEvent`, `rejectOutOfRangeInspect`, `snapshotInspectState` |
| `meadow-event-journal-kit` | `appendGameplayEvent`, `dedupeOneShotEvents`, `serializeEventJournal`, `deriveEventCounts`, `exposeReplayInput` |
| `story-trigger-runtime-kit` | `parseStoryTriggers`, `evaluateSceneStartTrigger`, `evaluatePathProgressTrigger`, `evaluateInspectTrigger`, `appendStoryBeat`, `diagnoseUnhandledTriggers` |
| `objective-completion-runtime-kit` | `evaluatePathProgressObjective`, `evaluateInspectObjective`, `completeObjective`, `advanceActiveObjective`, `snapshotObjectiveState` |
| `arrival-completion-runtime-kit` | `deriveArrivalCompletion`, `snapshotCompletion`, `validateCompletionState`, `deferPersistenceAdapter` |
| `meadow-gameplay-snapshot-kit` | `defineGameplaySnapshotShape`, `validateGameplaySnapshot`, `normalizeVolatileFields`, `attachGameplayToGameHostSnapshot` |
| `meadow-render-metadata-projection-kit` | `projectPlayerMetadata`, `projectObjectiveMetadata`, `projectStoryMetadata`, `projectInteractionMetadata`, `projectCompletionMetadata` |
| `meadow-scripted-fixture-kit` | `scriptPathWalk`, `scriptFocalTreeApproach`, `scriptFocalTreeInspect`, `scriptInvalidInspect`, `scriptReplayParity` |
| `replay-parity-smoke-kit` | `replayActionFrames`, `compareSnapshots`, `assertDeterministicSnapshot`, `reportReplayDiff` |

## What is next

### Recommended next slice

```txt
IntoTheMeadow Player Path Reducer + Inspect Event Fixture Cutover
```

### Implementation order

```txt
keep index.html and src/boot/boot-game.js thin
-> add meadow-action-contract-kit with ActionFrame fields:
     frame, time, sceneId, action, value, source, accepted, rejected, reason
-> add meadow-input-runtime-kit in src/hosts/web-host.js
-> collect WASD/arrows, pointer look, touch move, inspect, reset, and debug actions
-> pass actions into game.tick({ time, dt, actions })
-> expand createInitialGameState with:
     actionJournal, rejectedActions, eventJournal, interaction, diagnostics, completion
-> add meadow-reducer-pipeline-kit with fixed reducer order
-> add meadow-player-path-reducer-kit
-> move player along the existing six-point arrival path under scripted movement
-> add path-progress-runtime-kit against ARRIVAL_MEADOW_CONFIG.features.path.points
-> fire path-progress:0.25 once
-> complete walk-the-path at pathProgress >= 0.35
-> add focal-tree-affordance-kit using ARRIVAL_INTERACTION_TARGETS focal-tree radius 4.5
-> add inspect-event-runtime-kit
-> reject inspect when outside focal-tree affordance
-> accept inspect:focal-tree when in range and facing
-> trigger focal-tree story beat
-> complete inspect-tree
-> derive arrival completion after walk-the-path and inspect-tree
-> expose GameHost snapshot.gameplay
-> project gameplay markers into enhanceRenderPlan options
-> add scripted fixtures for path walk, invalid inspect, valid inspect, objective completion, and replay parity
```

### Acceptance targets

```txt
npm run check
game.tick accepts actions while preserving current static smoke tests
ActionFrame records are journaled with accepted/rejected metadata
scripted path movement increases player.pathProgress
path-discovery story beat appears exactly once after pathProgress >= 0.25
walk-the-path completes when pathProgress >= 0.35
inspect outside focal-tree affordance is rejected with diagnostics
inspect inside focal-tree affordance emits inspect:focal-tree
focal-tree story beat appears exactly once after inspect:focal-tree
inspect-tree completes after valid inspect
arrival completion derives after both objectives complete
window.GameHost.getSnapshot().gameplay exposes player, actions, events, story, objectives, interaction, completion, reducer diagnostics, and render metadata
scripted replay produces the same normalized gameplay snapshot
meadow-area-kit and meadow-webgl-render-kit remain product-agnostic
```

## Blockers

```txt
advance-game-state-stub
host-input-gap
tick-actions-gap
action-frame-contract-gap
action-acceptance-gap
reducer-order-gap
path-progress-gap
focal-tree-affordance-gap
inspect-event-gap
event-journal-gap
story-trigger-gap
objective-completion-gap
arrival-completion-gap
gameplay-snapshot-gap
render-metadata-gap
replay-parity-gap
```

## Files changed by this documentation pass

```txt
.agent/trackers/2026-07-07T10-28-28-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```

## Validation

No runtime source code changed.

No local build or test run was executed in this documentation pass.
