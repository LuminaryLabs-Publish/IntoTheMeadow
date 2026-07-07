# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T16-58-09-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected next slice:** `ObjectiveState Authority + Inspect Affordance Replay Gate`

## Selection reason

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

The central Publish repo ledger showed `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible tracked non-Cavalry repo by latest review timestamp.

Latest eligible timestamps checked:

```txt
IntoTheMeadow    2026-07-07T15:49:14-04:00
ZombieOrchard    2026-07-07T15:59:24-04:00
HorrorCorridor   2026-07-07T16:09:54-04:00
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16-29-18-04-00
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
MyCozyIsland     2026-07-07T16:49:08-04:00
```

## Current source read

`IntoTheMeadow` is already a clean publish shell for a DSK-composed meadow exploration game.

Current authority path:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

Important source facts:

- `src/hosts/web-host.js` imports external meadow kits from `GAME_MANIFEST`, creates the game, creates the WebGL renderer, exposes `window.GameHost`, then ticks with `game.tick({ time, dt: 1 / 60 })` each animation frame.
- `src/game/create-into-the-meadow-game.js` imports `ARRIVAL_MEADOW_CONFIG`, `STORY_BEATS`, `ARRIVAL_OBJECTIVES`, and `ARRIVAL_INTERACTION_TARGETS`, then exposes `getState`, `getRenderPlan`, `getDiagnostics`, `getSnapshot`, `tick`, and `reset`.
- `src/game/game-state.js` creates player state at `{ x: 0, y: 0, z: -36 }` with `yaw: 0`, `pitch: 0`, and `pathProgress: 0`.
- `advanceGameState()` only increments `frame` and writes `lastTick`; it does not consume actions, move the player, update objectives, inspect targets, or emit gameplay events.
- `src/game/game-snapshot.js` exposes manifest, raw state, render plan, and diagnostics, but no dedicated `snapshot.gameplay` authority object yet.
- `ARRIVAL_MEADOW_CONFIG.features.path.points` has six path points from `z: -44` to `z: 20`.
- `ARRIVAL_OBJECTIVES` already defines `walk-the-path` with `progressAtLeast: 0.35` and `inspect-tree` with `inspected: true`.
- `ARRIVAL_INTERACTION_TARGETS` already defines `focal-tree` as an inspectable target at `{ x: 0, y: 1.4, z: 24 }` with radius `4.5`.

## Interaction loop

### Current browser loop

```txt
open index.html
  -> boot game host
  -> load external meadow-area and meadow-webgl-render kits
  -> install local DSK descriptors
  -> create arrival meadow kit
  -> initialize deterministic state
  -> animation frame calls game.tick({ time, dt })
  -> advanceGameState increments frame only
  -> meadow area emits render plan
  -> enhanceRenderPlan adds visual metadata
  -> renderer draws scene
  -> GameHost exposes state, snapshot, diagnostics, and render snapshot
```

### Target playable loop

```txt
spawn at arrival path
  -> normalize host/scripted input into ActionFrame records
  -> batch actions for each deterministic tick
  -> journal accepted, rejected, and no-op actions
  -> run reducer pipeline in fixed order
  -> update player path position and pathProgress
  -> emit path-progress events once per threshold
  -> complete walk-the-path when pathProgress >= 0.35
  -> evaluate focal-tree proximity and facing
  -> reject invalid inspect with stable reason metadata
  -> accept inspect:focal-tree when constraints pass
  -> complete inspect-tree
  -> derive arrival completion once both objectives are complete
  -> expose snapshot.gameplay for replay and diagnostics
```

### Target service loop

```txt
ActionFrame input
  -> ActionBatch order and de-dupe
  -> ReducerResult seed contract
  -> PathProgress reducer
  -> InspectAffordance reducer
  -> ObjectiveState reducer
  -> StoryBeat reducer
  -> ArrivalCompletion reducer
  -> GameplaySnapshot projection
  -> replay parity smoke
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

## Kit inventory

### External kits currently loaded

```txt
meadow-area-kit
  source: NexusRealtime-ProtoKits CDN
  services: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  source: NexusRealtime-ProtoKits CDN
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
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Services that the kits offer

### Runtime and host services

- Boot the browser game route.
- Load external kits through the manifest.
- Install and validate local DSK descriptors.
- Create the arrival meadow area.
- Create the WebGL renderer.
- Maintain the animation frame loop.
- Expose `GameHost` state, snapshot, diagnostics, and render snapshot surfaces.
- Preserve compatibility with `game.tick({ time, dt })`.
- Add compatibility with `game.tick({ time, dt, actions })`.

### State and gameplay services

- Create deterministic initial state.
- Track active scene, active session, frame, last tick, player transform, path progress, wind, story beats, objectives, and DSK install snapshot.
- Normalize ActionFrame records.
- Sort, de-dupe, and freeze ActionBatch records.
- Record ActionJournal entries.
- Return ReducerResult records for accepted, rejected, and no-op reducer passes.
- Record ReducerResultJournal entries.
- Apply movement/path progress reducers.
- Evaluate focal tree inspect affordance.
- Emit path progress, inspect, story, objective, completion, and diagnostic events.
- Complete existing objectives through descriptor-owned conditions.
- Derive arrival completion.
- Project stable `snapshot.gameplay` data.

### Content services

- Provide meadow area dimensions, seed, style, wind, and feature descriptors.
- Provide six path points for path progress projection.
- Provide focal tree content and target radius.
- Provide existing objective descriptors.
- Provide existing story beat descriptors.
- Provide interaction target descriptors.

### Validation and fixture services

- Run static smoke validation.
- Run DSK registry smoke validation.
- Run render plan smoke validation.
- Run deterministic scene smoke validation.
- Add action journal fixture coverage.
- Add reducer result fixture coverage.
- Add invalid inspect and valid inspect fixture coverage.
- Add objective completion fixture coverage.
- Add replay parity smoke coverage against normalized gameplay snapshots.

## Key findings

- The repo has the content descriptors needed for the first playable loop.
- The runtime does not yet consume deterministic actions.
- The state root already has `pathProgress`, objective ids, story beat ids, and player transform fields, so the cutover can be additive.
- The `focal-tree` target and `walk-the-path` objective have stable ids that can become fixture constants.
- The browser host should stay visually unchanged while authority contracts land.
- The next work should avoid renderer extraction until `snapshot.gameplay` and replay parity are stable.

## Recommended next work

1. Keep current browser render and host behavior unchanged.
2. Add ActionFrame and ActionBatch contracts.
3. Add ActionJournal before movement math.
4. Add ReducerResult and ReducerResultJournal contracts.
5. Add no-op, accepted, and rejected seed fixtures.
6. Add path progress reducer against the six descriptor path points.
7. Complete `walk-the-path` at `pathProgress >= 0.35`.
8. Add focal-tree affordance evaluation using radius `4.5`.
9. Add valid and invalid inspect reducers.
10. Complete `inspect-tree` from an accepted `inspect:focal-tree` result.
11. Add one-shot story/objective/completion event de-dupe.
12. Add `snapshot.gameplay` and GameHost diagnostics helpers.
13. Add replay fixtures before changing camera, renderer, save, pointer lock, UI, or audio.

## Suggested next vertical slice

**Build target:** `IntoTheMeadow ObjectiveState Authority + Inspect Affordance Replay Gate`

```txt
preserve current index.html, boot-game.js, web-host.js render behavior, and GameHost compatibility
  -> keep game.tick({ time, dt }) working
  -> allow additive game.tick({ time, dt, actions })
  -> add ActionFrame and ActionBatch contracts
  -> add ActionJournal and ReducerResultJournal contracts
  -> add no-op reducer seed fixture
  -> add player path reducer against ARRIVAL_MEADOW_CONFIG.features.path.points
  -> emit path-progress threshold events
  -> complete walk-the-path at progress >= 0.35
  -> add focal-tree affordance reducer using ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect with out_of_range, wrong_target, invalid_payload, or duplicate_event
  -> accept inspect:focal-tree when target constraints pass
  -> complete inspect-tree after accepted inspect
  -> derive arrival completion from both objectives
  -> expose snapshot.gameplay and GameHost gameplay diagnostics
  -> add DOM-free action replay smoke for path walk, invalid inspect, valid inspect, and objective completion
  -> defer renderer extraction, save persistence, pointer-lock polish, audio, and ProtoKit promotion
```

## Validation status

```txt
Runtime source changed: no
Documentation changed: yes
Local build run: no
Local smoke run: no
Reason: connector-only documentation pass
```
