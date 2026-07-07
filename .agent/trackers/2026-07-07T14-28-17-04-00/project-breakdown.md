# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T14:28:17-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Default branch:** `main`

**Selected by:** oldest eligible non-Cavalry Publish repo by latest central ledger timestamp.

## Selection reason

Accessible `LuminaryLabs-Publish` repositories reviewed for this run:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
```

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

The central ledger showed these latest eligible review timestamps:

```txt
IntoTheMeadow    2026-07-07T13:21:30-04:00
ZombieOrchard    2026-07-07T13:30:34-04:00
HorrorCorridor   2026-07-07T13:41:22-04:00
TheOpenAbove     2026-07-07T13:50:54-04:00
PhantomCommand   2026-07-07T14:00:18-04:00
PrehistoricRush  2026-07-07T14:11:48-04:00
MyCozyIsland     2026-07-07T14:21:20-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

`IntoTheMeadow` is therefore the oldest eligible tracked non-Cavalry Publish repo for this pass.

## Current read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game. It owns the product route, browser host, product game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective descriptors, story descriptors, interaction target descriptors, diagnostics, validation scripts, and GitHub Pages surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The product/content layer is ready for the first playable loop:

- `ARRIVAL_MEADOW_CONFIG.features.path.points` defines a six-point arrival path.
- `ARRIVAL_INTERACTION_TARGETS` defines the old tree and path targets.
- `ARRIVAL_OBJECTIVES` defines `walk-the-path` and `inspect-tree`.
- `STORY_BEATS` defines scene-start, path-progress, and focal-tree inspect beats.

The runtime gap is still executable agency. `src/hosts/web-host.js` ticks and renders every frame, but does not collect deterministic action frames. `src/game/game-state.js` has player, world, progression, and DSK state, but `advanceGameState()` only increments `frame` and writes `lastTick`. `src/game/game-snapshot.js` exposes state/render/diagnostics, but no `snapshot.gameplay` contract exists yet.

## Interaction loop

### Current loop

```txt
index.html
-> src/boot/boot-game.js
-> src/hosts/web-host.js
-> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
-> createIntoTheMeadowGame({ externalKits })
-> installDsks({ externalKits })
-> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
-> createInitialGameState({ manifest, dskInstall, sceneId })
-> exposeGameHost({ ...game, renderer, getRenderPlan, getSnapshot })
-> requestAnimationFrame(frame)
-> game.tick({ time, dt })
-> advanceGameState(state, input)
-> frame increments and lastTick records dt/time
-> game.getRenderPlan(time)
-> enhanceRenderPlan(rawPlan, { performance })
-> renderer.render(plan)
-> optional debug HUD reads game.getDiagnostics()
```

### Intended player loop

```txt
player spawns at arrival path
-> host collects movement/look/inspect/reset/debug/scripted action frames
-> action batch sorts and dedupes deterministic actions
-> reducer pipeline applies actions in fixed order
-> path reducer moves player along arrival path
-> path progress reducer emits path threshold events
-> story reducer emits path-discovery at progress >= 0.25
-> objective reducer completes walk-the-path at progress >= 0.35
-> affordance reducer checks old-tree proximity and facing
-> inspect reducer accepts inspect:focal-tree or rejects with reason metadata
-> story reducer emits focal-tree beat after valid inspect
-> objective reducer completes inspect-tree
-> completion reducer marks arrival meadow complete after both objectives complete
-> gameplay snapshot projects player/actions/events/story/objectives/interaction/completion
-> render metadata projector can show objective/debug hints without owning gameplay rules
```

### Recommended service loop

```txt
game.tick({ time, dt, actions })
-> meadow-actionframe-contract-kit.normalizeActionFrame
-> meadow-action-batch-kit.freezeActionBatch
-> meadow-action-acceptance-kit.acceptOrReject
-> meadow-reducer-result-contract-kit.createReducerResult
-> meadow-reducer-pipeline-kit.applyReducers
-> path-progress-runtime-kit.projectPlayerOntoPath
-> meadow-gameplay-event-contract-kit.emitGameplayEvent
-> meadow-gameplay-event-journal-kit.dedupeAndAppend
-> objective-completion-runtime-kit.evaluateObjectives
-> arrival-completion-runtime-kit.deriveCompletion
-> meadow-gameplay-snapshot-kit.attachGameplayToSnapshot
-> meadow-gameplay-fixture-kit.replayActionFrames
-> replay-parity-smoke-kit.compareNormalizedSnapshots
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

### External kits

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

## Services that the kits offer

```txt
webHost.loadExternalKits
webHost.startWebHost
webHost.exposeGameHost
webHost.frame
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
performance.createMeadowPerformancePolicy
wind.createWindFieldDsk
grass.createGrassPatchDsk
postProcess.createPostProcessStack
externalMeadowArea.createMeadowAreaKit
externalMeadowArea.getRenderPlan
externalMeadowArea.getSnapshot
externalMeadowArea.validate
externalRender.createMeadowWebglRenderKit
externalRender.render
externalRender.getSnapshot
actionFrame.normalizeActionFrame.target
actionFrame.validateActionFrame.target
actionFrame.serializeActionFrame.target
actionBatch.sortActionFrames.target
actionBatch.dedupeActionFrames.target
actionAcceptance.acceptMove.target
actionAcceptance.acceptLook.target
actionAcceptance.acceptInspect.target
actionAcceptance.rejectUnsupportedAction.target
actionRejection.defineReasonCodes.target
reducerResult.defineReducerResultShape.target
reducerResult.appendAcceptedAction.target
reducerResult.appendRejectedAction.target
reducerResult.appendReducerEvent.target
reducerResult.appendReducerDiagnostic.target
reducerResult.summarizeStateDiff.target
reducerPipeline.applyReducers.target
pathProgress.sampleNearestPathSegment.target
pathProgress.projectPlayerOntoPath.target
pathProgress.calculateProgress01.target
pathProgress.detectProgressThresholds.target
gameplayEvent.defineGameplayEventShape.target
gameplayEvent.appendGameplayEvent.target
gameplayEvent.dedupeOneShotEvents.target
affordance.evaluateTargetProximity.target
affordance.evaluateTargetFacing.target
inspect.acceptInspectRequest.target
story.evaluatePathProgressTrigger.target
story.evaluateInspectTrigger.target
objective.evaluatePathProgressObjective.target
objective.evaluateInspectObjective.target
completion.deriveArrivalCompletion.target
gameplaySnapshot.attachGameplayToSnapshot.target
fixture.scriptPathWalk.target
fixture.scriptInvalidInspect.target
fixture.scriptValidInspect.target
fixture.scriptReplayParity.target
```

## Key findings

- The repo boundary is clean enough to keep this as a documentation-first implementation plan, not a repo surgery pass.
- `package.json` already has a compact validation command that runs static, DSK registry, render-plan, and deterministic scene smoke checks.
- `web-host.js` is the correct future input and host snapshot boundary, but should remain visually stable while agency moves into pure game services.
- `create-into-the-meadow-game.js` is the correct service composition seam because it already owns manifest, content, DSK install, meadow kit creation, diagnostics, snapshot, tick, and reset.
- `game-state.js` is the first source file that must change in the next implementation because `advanceGameState()` currently has no action or reducer semantics.
- `game-snapshot.js` must gain `snapshot.gameplay` only after reducer output and gameplay event shape are stable.
- Path, objective, story, and interaction descriptors are already specific enough for deterministic fixtures.

## Recommended next work

Next slice:

```txt
IntoTheMeadow ActionFrame Intake + ReducerResult Seed Fixture Cutover
```

Build order:

```txt
preserve index.html, boot-game.js, current render behavior, and existing npm check surface
-> keep game.tick({ time, dt }) compatible
-> allow game.tick({ time, dt, actions }) as additive input
-> add meadow-actionframe-contract-kit first
-> normalize move, look, inspect, reset, debug, and scripted actions
-> add meadow-action-rejection-reason-kit with unsupported_action, invalid_scene, invalid_payload, out_of_range, wrong_target, duplicate_event, and no_effect
-> add meadow-reducer-result-contract-kit with { state, events, acceptedActions, rejectedActions, diagnostics }
-> add a no-op reducer seed fixture that proves accepted/rejected result shape before movement math
-> add meadow-gameplay-event-contract-kit with path-progress, story-beat, objective-complete, inspect, completion, and diagnostic event types
-> add meadow-gameplay-event-journal-kit with one-shot de-dupe by event key
-> add path-progress-runtime-kit using the six arrival path points
-> complete walk-the-path at pathProgress >= 0.35
-> add focal-tree-affordance-kit using focal-tree target radius 4.5
-> reject out-of-range inspect with reason out_of_range
-> accept inspect:focal-tree when target constraints pass
-> trigger focal-tree story and inspect-tree objective from accepted inspect
-> derive arrival completion after both objectives complete
-> expose snapshot.gameplay through createGameSnapshot
-> add DOM-free fixture scripts that call game.tick({ time, dt, actions })
-> add replay parity smoke that compares normalized gameplay snapshots
-> defer renderer extraction, pointer-lock movement, save adapter, audio, and broad UI until reducer result fixtures pass
```

## Acceptance targets

```txt
npm run check passes after implementation
existing visual render path remains unchanged
legacy game.tick({ time, dt }) still works
scripted action frame fixture can accept valid actions and reject invalid actions
reducer result shape is stable for every reducer
path progress can complete walk-the-path deterministically
invalid inspect outside focal-tree radius returns out_of_range
valid inspect completes inspect-tree and emits focal-tree story beat once
arrival completion requires both objectives
snapshot.gameplay exists and is DOM-free
replay parity fixture normalizes volatile frame/time fields
```

## Validation status

No runtime source code changed in this documentation pass.

No local build or smoke test was run during this connector-only documentation update.
