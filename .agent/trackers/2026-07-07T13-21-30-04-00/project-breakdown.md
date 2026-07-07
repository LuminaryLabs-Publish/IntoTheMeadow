# IntoTheMeadow GameplayEvent Contract + Reducer Result Fixture Breakdown

**Timestamp:** `2026-07-07T13:21:30-04:00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Scope:** Internal documentation only. No runtime source files were changed in this pass.

## Selection

The accessible `LuminaryLabs-Publish` org scan included:

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
MyCozyIsland
TheOpenAbove
PhantomCommand
TheCavalryOfRome
PrehistoricRush
```

`LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded by rule.

The central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed `LuminaryLabs-Publish/MyCozyIsland` as the latest new tracked repo at `2026-07-07T13:11:20-04:00`. After that pass, all accessible non-Cavalry Publish repos had central ledger entries. Among eligible tracked repos, `LuminaryLabs-Publish/IntoTheMeadow` had the oldest latest-review timestamp, `2026-07-07T11:38:17-04-00`, so it was selected for the next single-repo breakdown.

## Source files reviewed

```txt
README.md
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/meadow-areas/arrival-meadow.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
src/content/story/story-beats.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*.md
```

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story/interaction descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The current runtime is cleanly composed but not yet meaningfully playable. `src/hosts/web-host.js` loads the external meadow kits, creates the game, ticks it every animation frame with `{ time, dt }`, enhances the render plan, renders through the external renderer, and exposes `window.GameHost`. `src/game/create-into-the-meadow-game.js` installs local DSK descriptors, creates the arrival meadow area, owns diagnostics, and routes `tick()` to `advanceGameState()`.

The blocker remains deterministic agency. `src/game/game-state.js` already has player, world, progression, scene, session, and DSK state, but `advanceGameState()` only increments `frame` and records `lastTick`. No service yet normalizes input, accepts/rejects actions, applies reducers, journals events, completes objectives, derives arrival completion, or projects a stable gameplay snapshot.

The content is ready for the first loop. `ARRIVAL_MEADOW_CONFIG.features.path.points` defines a six-point path, `ARRIVAL_INTERACTION_TARGETS` defines `arrival-path` and `focal-tree`, `ARRIVAL_OBJECTIVES` defines `walk-the-path` and `inspect-tree`, and `STORY_BEATS` defines `arrival`, `path-discovery`, and `focal-tree`.

## Current interaction loop

```txt
index.html
-> src/boot/boot-game.js
-> src/hosts/web-host.js
-> load meadow-area-kit from GAME_MANIFEST.externalKits[0]
-> load meadow-webgl-render-kit from GAME_MANIFEST.externalKits[1]
-> createIntoTheMeadowGame({ externalKits })
-> installDsks(...)
-> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
-> createInitialGameState(...)
-> exposeGameHost(...)
-> requestAnimationFrame(frame)
-> game.tick({ time, dt })
-> advanceGameState increments frame + lastTick only
-> meadow.getRenderPlan({ time })
-> enhanceRenderPlan(rawPlan, ...)
-> renderer.render(plan)
-> optional debug HUD text
```

## Intended player loop

```txt
spawn on the arrival meadow path
-> move along or near the path
-> path-progress reaches 0.25
-> path-discovery story beat fires once
-> pathProgress reaches 0.35
-> walk-the-path objective completes
-> approach old meadow tree
-> focal-tree inspect affordance becomes available
-> invalid inspect attempts are rejected with reason metadata
-> valid inspect emits inspect:focal-tree
-> focal-tree story beat fires once
-> inspect-tree objective completes
-> arrival meadow completion derives from both objectives
-> GameHost snapshot exposes gameplay state, journals, reducers, events, story, objectives, interaction, completion, and render metadata
```

## Recommended service loop

```txt
host/scripted input
-> meadow-actionframe-contract-kit
-> meadow-action-batch-kit
-> meadow-action-acceptance-kit
-> meadow-reducer-result-contract-kit
-> meadow-reducer-pipeline-kit
-> meadow-player-path-reducer-kit
-> path-progress-runtime-kit
-> meadow-gameplay-event-contract-kit
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
action-batch-contract
action-frame-normalization
action-acceptance-policy
action-rejection-policy
reducer-result-contract
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
save-progression-target
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

## Kits identified

### External kits in active runtime

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

### Full local inventory candidates

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
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
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
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Services identified

```txt
webHost.loadExternalKits
webHost.startWebHost
webHost.exposeGameHost
webHost.frame
webHost.collectHostInput.target
webHost.flushActionBatch.target
manifest.resolveExternalKits
dskInstaller.installDsks
dskInstaller.validateLocalDescriptors
gameFactory.createIntoTheMeadowGame
gameFactory.createFallbackMeadowAreaKit
gameFactory.getRenderPlan
gameFactory.getDiagnostics
gameFactory.getSnapshot
gameFactory.tick
gameFactory.reset
state.createInitialGameState
state.advanceGameState
snapshot.createGameSnapshot
snapshot.validateGameSnapshot
renderPlan.enhanceRenderPlan
renderPlan.reduceTinyClutter
renderPlan.withOutlinePolicy
performance.createMeadowPerformancePolicy
wind.createWindFieldDsk
grass.createGrassPatchDsk
postProcess.createPostProcessStack
actionFrame.defineActionFrameShape.target
actionFrame.normalizeActionFrame.target
actionFrame.validateActionFrame.target
actionBatch.sortActionFrames.target
actionBatch.freezeActionBatch.target
actionAcceptance.acceptMove.target
actionAcceptance.acceptLook.target
actionAcceptance.acceptInspect.target
actionAcceptance.rejectUnsupportedAction.target
reducerResult.defineReducerResult.target
reducerResult.validateReducerResult.target
reducerPipeline.applyReducers.target
reducerPipeline.recordReducerDiagnostics.target
playerPath.integratePlayerPosition.target
playerPath.clampToMeadowBounds.target
pathProgress.projectPlayerOntoPath.target
pathProgress.calculateProgress01.target
pathProgress.detectProgressThresholds.target
gameplayEvent.defineEventShape.target
gameplayEvent.appendEvent.target
gameplayEvent.dedupeOneShot.target
affordance.evaluateTargetProximity.target
affordance.evaluateTargetFacing.target
inspect.acceptInspectRequest.target
inspect.rejectOutOfRangeInspect.target
story.evaluateSceneStartTrigger.target
story.evaluatePathProgressTrigger.target
story.evaluateInspectTrigger.target
objective.evaluatePathProgressObjective.target
objective.evaluateInspectObjective.target
objective.completeObjective.target
completion.deriveArrivalCompletion.target
gameplaySnapshot.attachGameplayToSnapshot.target
renderMetadata.projectPlayerMetadata.target
renderMetadata.projectObjectiveMetadata.target
fixture.scriptPathWalk.target
fixture.scriptInvalidInspect.target
fixture.scriptValidInspect.target
fixture.scriptObjectiveCompletion.target
fixture.scriptReplayParity.target
```

## Next implementation slice

```txt
IntoTheMeadow GameplayEvent Contract + Reducer Result Fixture Cutover
```

This narrows the prior ActionFrame/reducer cutover. Build the contracts that make reducer output and gameplay events testable before adding broader host input or visual extraction.

### Build order

```txt
preserve index.html, boot-game.js, and current render behavior
-> keep game.tick({ time, dt }) compatible
-> add meadow-actionframe-contract-kit with stable action ids and source metadata
-> add meadow-action-batch-kit for deterministic action order
-> add meadow-action-rejection-reason-kit with unsupported_action, invalid_scene, out_of_range, wrong_target, duplicate_event, and no_effect
-> add meadow-reducer-result-contract-kit before concrete reducers
-> require every reducer to return { state, events, acceptedActions, rejectedActions, diagnostics }
-> add meadow-gameplay-event-contract-kit with path-progress, story-beat, objective-complete, inspect, completion, and diagnostic event types
-> add meadow-gameplay-event-journal-kit with one-shot de-dupe by event key
-> add path-progress-runtime-kit using the six arrival path points
-> complete walk-the-path at pathProgress >= 0.35
-> add focal-tree-affordance-kit using focal-tree radius 4.5
-> reject inspect outside the affordance with reason out_of_range
-> accept inspect:focal-tree when position/facing constraints pass
-> trigger focal-tree story and inspect-tree objective from the accepted inspect event
-> derive arrival completion after both objectives complete
-> expose snapshot.gameplay through createGameSnapshot
-> add fixture scripts that call game.tick({ time, dt, actions }) without a DOM
-> add replay parity smoke that compares normalized gameplay snapshots
-> defer renderer extraction, pointer-lock movement, save adapter, and audio until reducer result parity passes
```

### Acceptance targets

```txt
npm run check remains the canonical validation command
existing static, registry, render-plan, and deterministic-scene smokes remain green
legacy ticks without actions still increment frame and lastTick
game.tick accepts actions without requiring DOM input
all actions normalize into stable ActionFrame records
unsupported or impossible actions record rejectedActions with stable reason codes
all reducers return reducer result records
reducer diagnostics show reducer id, order, accepted count, rejected count, and event count
path scripted fixture increases player.pathProgress deterministically
path-progress:0.25 emits once
walk-the-path completes at pathProgress >= 0.35
invalid inspect is rejected and does not complete inspect-tree
valid inspect emits inspect:focal-tree once
focal-tree story beat emits once
inspect-tree completes after valid inspect
arrival completion derives only after both objectives complete
snapshot.gameplay includes player, actions, reducers, events, story, objectives, interaction, completion, and render metadata
scripted replay produces the same normalized gameplay snapshot
external meadow-area-kit and meadow-webgl-render-kit remain product-agnostic
```

## What not to do next

```txt
do not move product objective/story logic into meadow-webgl-render-kit
do not extract renderer internals before gameplay snapshot parity
do not add save persistence before arrival completion state is deterministic
do not make pointer-lock or camera polish the first implementation target
do not skip rejected action metadata
```

## Validation status

No runtime source code changed in this pass.

No local build or smoke test was run in this connector-only documentation update.
