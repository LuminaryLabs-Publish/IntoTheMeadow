# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T19:42:05-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Central tracker:** `LuminaryLabs-Dev/LuminaryLabs`

**Selected because:** the central Publish repo ledger showed `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible tracked non-Cavalry repo by latest review timestamp. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked for this run:

```txt
IntoTheMeadow    2026-07-07T18:19:15-04:00
ZombieOrchard    2026-07-07T18:28:54-04:00
HorrorCorridor   2026-07-07T18:41:07-04:00
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
MyCozyIsland     2026-07-07T19:29:28-04:00
```

## Executive read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game and browser route. It already owns a clean host/game/state/snapshot/content split and has enough content descriptors for a first playable loop. The current source is not blocked by render quality. It is blocked by missing gameplay authority: actions are not normalized, reducers do not report accepted/rejected/no-op results, path progress is not derived from player actions, objective completion is not reducer-owned, and `snapshot.gameplay` does not yet exist as a stable replay contract.

Current source facts:

```txt
entry: index.html -> src/boot/boot-game.js -> src/hosts/web-host.js
host: src/hosts/web-host.js
game factory: src/game/create-into-the-meadow-game.js
state root: src/game/game-state.js
snapshot root: src/game/game-snapshot.js
arrival meadow: src/content/meadow-areas/arrival-meadow.js
objectives: src/content/objectives/arrival-objectives.js
interaction targets: src/content/interaction-targets/arrival-targets.js
external area kit: meadow-area-kit
external renderer kit: meadow-webgl-render-kit
```

The strongest next implementation target is now **ActionFrame Fixture Seed + Snapshot.Gameplay Source Gate**. This is the smallest useful runtime cut that turns the repo from a rendered meadow scaffold into a deterministic gameplay loop without changing the visual route first.

## Current interaction loop

```txt
Browser loads index.html
  -> src/boot/boot-game.js starts the web host
  -> src/hosts/web-host.js imports external kits from GAME_MANIFEST
  -> createIntoTheMeadowGame({ externalKits }) installs local DSK descriptors
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) creates the arrival meadow area source
  -> createInitialGameState(...) creates deterministic root state
  -> requestAnimationFrame(frame) starts the browser loop
  -> frame calls game.tick({ time, dt })
  -> advanceGameState(state, input) increments frame and lastTick only
  -> game.getRenderPlan(time) asks the meadow area kit for a render plan
  -> enhanceRenderPlan(rawPlan, { performance }) adds product render metadata
  -> renderer.render(plan) draws the meadow
  -> window.GameHost exposes state, snapshot, diagnostics, render snapshot, and reset/tick access
```

## Target interaction loop

```txt
Browser or fixture starts the same game factory
  -> host/scripted input is normalized into ActionFrame records
  -> ActionFrame records are sorted into ActionBatch for the tick
  -> reducers run in fixed source-owned order
  -> each reducer returns ReducerResult, never silent mutation
  -> ActionJournal records accepted/rejected/no-op action facts
  -> ReducerResultJournal records reducer order, events, and state deltas
  -> player path reducer advances pathProgress against ARRIVAL_MEADOW_CONFIG.features.path.points
  -> path threshold reducer emits one-shot progress events
  -> objective reducer completes walk-the-path at pathProgress >= 0.35
  -> inspect affordance reducer evaluates focal-tree distance, target id, payload, and duplicates
  -> inspect reducer accepts inspect:focal-tree or rejects with a stable reason
  -> story/objective reducers complete inspect-tree and derive arrival completion
  -> createGameSnapshot(game) exposes snapshot.gameplay
  -> GameHost diagnostics expose action/reducer/gameplay fixture status
  -> DOM-free replay fixtures prove no-op, path walk, invalid inspect, valid inspect, objective completion, and replay parity
```

## Source facts backing the first playable loop

```txt
initial player position: { x: 0, y: 0, z: -36 }
initial yaw/pitch: 0 / 0
initial pathProgress: 0
path point count: 6
path start: { x: 0, z: -44 }
path end: { x: 0, z: 20 }
walk objective id: walk-the-path
walk completion: pathProgress >= 0.35
inspect objective id: inspect-tree
inspect target id: focal-tree
focal-tree position: { x: 0, y: 1.4, z: 24 }
focal-tree radius: 4.5
arrival path radius: 32
world wind strength: 0.38
```

## Domains in use

### Runtime / host domains

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
debug-hud-runtime
gamehost-state-contract
gamehost-snapshot-contract
gamehost-diagnostics-contract
gamehost-render-snapshot-contract
runtime-compatibility-contract
```

### Game composition domains

```txt
product-game-factory
manifest-authority
dsk-registry
dsk-descriptor-installer
local-dsk-descriptor-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
deterministic-state-root
scene-identity
session-identity
tick-clock
last-tick-diagnostics
content-pack-authority
```

### Meadow content domains

```txt
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
story-beat-ledger
objective-ledger
interaction-target-registry
```

### Render domains

```txt
render-plan-generation
render-plan-enhancement
grass-patch-render-metadata
wind-field-render-metadata
post-process-stack-metadata
outline-policy-metadata
render-stats-diagnostics
webgl-renderer-snapshot
```

### Gameplay authority domains needed now

```txt
host-input-ingress
scripted-input-domain
action-frame-contract
action-batch-contract
action-journal-contract
action-frame-normalization
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
objective-state-authority
objective-completion-evaluation
arrival-completion-state
gameplay-snapshot-contract
gameplay-render-metadata-projection
deterministic-replay-domain
fixture-replay-domain
playable-loop-smoke-target
```

## Services currently offered

### Browser and host services

```txt
startWebHost({ canvas, hud, statusEl, loadingEl, debug })
loadExternalKits()
import external meadow area kit from GAME_MANIFEST
import external meadow WebGL renderer kit from GAME_MANIFEST
create renderer from external kit
run requestAnimationFrame loop
hide loading element after startup
toggle debug HUD visibility
render status text when debug is enabled
expose GameHost through exposeGameHost(...)
```

### Game factory services

```txt
createIntoTheMeadowGame(options)
installDsks({ externalKits })
create fallback meadow area kit if external meadow-area-kit is unavailable
create arrival meadow area from ARRIVAL_MEADOW_CONFIG
create initial deterministic game state
provide content bundle containing meadow, story beats, objectives, and interaction targets
provide getState()
provide getRenderPlan(time)
provide getDiagnostics()
provide getSnapshot()
provide tick(input)
provide reset()
```

### State and snapshot services

```txt
createInitialGameState({ manifest, dskInstall, sceneId })
advanceGameState(state, input)
record state id/version/frame
record active scene/session ids
record player transform and pathProgress
record world meadow area and wind
record active objective/completed objectives/story beats
record DSK install snapshot
increment frame each tick
record lastTick dt/time
createGameSnapshot(game)
validateGameSnapshot(snapshot)
```

### Content services

```txt
ARRIVAL_MEADOW_CONFIG owns path, focal tree, grass, flowers, rocks, mushrooms, tree line, wind, style, and material palette
ARRIVAL_OBJECTIVES defines walk-the-path and inspect-tree completion contracts
ARRIVAL_INTERACTION_TARGETS defines focal-tree and arrival-path affordance targets
STORY_BEATS defines narrative beat descriptors
GAME_MANIFEST owns build identity and external kit URLs
```

### Existing validation services

```txt
tests/static-smoke.mjs
tests/dsk-registry-smoke.mjs
tests/render-plan-smoke.mjs
tests/deterministic-scene-smoke.mjs
```

## Current kits

### External ProtoKits

```txt
meadow-area-kit
  domain: meadow-area
  services: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  domain: meadow-webgl-render
  services: createMeadowWebglRenderKit, render, getSnapshot
```

### Active local DSKs

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

### Broader local inventory / descriptor surface

```txt
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
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
```

## Next-cut kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-journal-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-action-source-fixture-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-result-journal-kit
meadow-reducer-seed-fixture-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
path-threshold-event-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
inspect-result-reducer-kit
story-trigger-runtime-kit
objective-state-authority-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
gameplay-snapshot-fixture-kit
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Next-cut kit service contracts

```txt
meadow-actionframe-contract-kit
  -> defineActionFrameShape()
  -> defineActionTypes()
  -> normalizeActionFrame(input, context)
  -> validateActionFrame(frame)
  -> serializeActionFrame(frame)

meadow-action-batch-kit
  -> collectFrameActions(input)
  -> sortActionFrames(frames)
  -> dedupeActionFrames(frames)
  -> freezeActionBatch(frames)
  -> summarizeActionBatch(batch)

meadow-action-journal-kit
  -> appendActionRecord(journal, result)
  -> queryActionsByStatus(journal, status)
  -> summarizeActionJournal(journal)
  -> serializeActionJournal(journal)
  -> assertReplayableActionJournal(journal)

meadow-action-rejection-reason-kit
  -> unsupported_action
  -> invalid_scene
  -> invalid_payload
  -> out_of_range
  -> wrong_target
  -> duplicate_event
  -> no_effect

meadow-reducer-result-contract-kit
  -> createReducerResult({ reducerId, state, events, acceptedActions, rejectedActions, diagnostics })
  -> createNoopReducerResult(reducerId, state)
  -> mergeReducerResults(results)
  -> validateReducerResult(result)

meadow-player-path-reducer-kit
  -> samplePathPoints(config)
  -> computeNearestPathSegment(position, points)
  -> advancePathProgress(state, actionBatch)
  -> clampPathProgress(progress)
  -> emitPathProgressResult(context)

focal-tree-affordance-kit
  -> resolveInteractionTarget(targetId)
  -> computeDistanceToTarget(player, target)
  -> evaluateFacing(player, target)
  -> createAffordanceSnapshot(player, target)
  -> rejectOutOfRange(distance, radius)

inspect-result-reducer-kit
  -> normalizeInspectAction(frame)
  -> evaluateInspectPreflight(state, action)
  -> acceptInspectTarget(state, target)
  -> rejectInspectAction(action, reason)
  -> emitInspectEvent(target)

meadow-gameplay-snapshot-kit
  -> createGameplaySnapshot(state, journals, reducerResults)
  -> summarizeObjectives(state)
  -> summarizeInteraction(state)
  -> summarizeCompletion(state)
  -> validateGameplaySnapshot(snapshot)
```

## Recommended next vertical slice

**Build target:** `IntoTheMeadow ActionFrame Fixture Seed + Snapshot.Gameplay Source Gate`

```txt
preserve current index.html, boot-game.js, web-host.js render behavior, and GameHost compatibility
  -> keep game.tick({ time, dt }) working exactly as it does now
  -> add additive game.tick({ time, dt, actions }) without requiring browser DOM input
  -> add ActionFrame and ActionBatch contracts first
  -> add ActionJournal for accepted/rejected/no-op records
  -> add ReducerResult and ReducerResultJournal contracts before movement math
  -> add no-op reducer fixture to prove result shape and journal shape
  -> add scripted path-walk fixture against ARRIVAL_MEADOW_CONFIG.features.path.points
  -> update pathProgress deterministically from scripted movement/progress actions
  -> emit one-shot path threshold events
  -> complete walk-the-path at pathProgress >= 0.35
  -> add focal-tree affordance reducer using ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect with unsupported_action, invalid_scene, invalid_payload, out_of_range, wrong_target, duplicate_event, or no_effect
  -> accept inspect:focal-tree when target constraints pass
  -> complete inspect-tree after accepted inspect
  -> derive arrival completion from both objectives
  -> expose snapshot.gameplay from createGameSnapshot(game)
  -> expose GameHost gameplay diagnostics and latest action/reducer summaries
  -> add DOM-free action replay smoke for no-op tick, path walk, invalid inspect, valid inspect, objective completion, and replay parity
  -> defer renderer extraction, save persistence, pointer-lock polish, audio, and ProtoKit promotion
```

## Validation notes

No runtime source code changed in this documentation pass. No local build or smoke test was run.
