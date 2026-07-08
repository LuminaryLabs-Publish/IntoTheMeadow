# IntoTheMeadow Project Breakdown

**Generated:** `2026-07-07T22:20:00-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Run type:** scheduled internal documentation breakdown

**Selected repo:** `IntoTheMeadow`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

The central repo ledger shows `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible non-Cavalry Publish repo by latest review timestamp.

Latest eligible timestamps checked for this pass:

```txt
IntoTheMeadow    2026-07-07T20:59:30-04:00
ZombieOrchard    2026-07-07T21:09:57-04:00
HorrorCorridor   2026-07-07T21:18:45-04:00
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
PhantomCommand   2026-07-07T21:50:56-04:00
PrehistoricRush  2026-07-07T21:59:06-04:00
MyCozyIsland     2026-07-07T22:11:41-04:00
TheCavalryOfRome excluded
```

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game with a clean static shell, browser boot, web host, game factory, deterministic state root, snapshot seam, local DSK descriptors, external meadow area/render kits, arrival meadow content, objective descriptors, interaction targets, diagnostics, static smoke checks, and GitHub Pages deployment surface.

The live route is still:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

The source is ready for a first playable loop, but runtime gameplay authority is not yet implemented. `createInitialGameState()` seeds player position, progression, world wind, and DSK snapshot. `advanceGameState()` only increments `frame` and records `lastTick`. `createGameSnapshot()` exposes manifest, raw state, render plan, and diagnostics, but does not expose a stable `snapshot.gameplay` projection.

The content descriptors already provide the first loop anchors:

```txt
initial player position: { x: 0, y: 0, z: -36 }
initial yaw: 0
initial pitch: 0
initial pathProgress: 0
path points: 6
path start: { x: 0, z: -44 }
path end: { x: 0, z: 20 }
walk objective: walk-the-path at pathProgress >= 0.35
inspect objective: inspect-tree
inspect target: focal-tree at { x: 0, y: 1.4, z: 24 }, radius 4.5
arrival path target: arrival-path at { x: 0, y: 0, z: -8 }, radius 32
world wind strength: 0.38
```

## Interaction loop

### Current browser/runtime loop

```txt
open index.html
  -> boot-game.js starts web host
  -> web-host.js imports external kits from GAME_MANIFEST
  -> createIntoTheMeadowGame installs DSK descriptors
  -> create arrival meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> initialize deterministic state
  -> expose window.GameHost
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState increments frame and records lastTick only
  -> meadow area kit emits raw render plan
  -> enhanceRenderPlan adds visual/product render metadata
  -> meadow-webgl-render-kit renders the enhanced plan
  -> debug HUD reports validation, DSK count, object count, patches, and vertices
```

### Current player loop

```txt
load meadow
  -> see golden-hour painterly meadow
  -> path, focal tree, grass, flowers, rocks, mushrooms, and tree line render from descriptors
  -> no deterministic player action intake yet
  -> no objective completion yet
  -> no inspect acceptance/rejection yet
  -> no gameplay snapshot yet
```

### Target playable authority loop

```txt
spawn at arrival path
  -> normalize host/scripted/fixture/replay input into ActionFrame records
  -> create stable ActionBatch per tick
  -> run ordered reducer pipeline
  -> each reducer returns ReducerResult metadata
  -> action results are accepted, rejected, or no-op with stable reason metadata
  -> journal action intake, reducer order, events, diffs, and diagnostics
  -> sample ARRIVAL_MEADOW_CONFIG.features.path.points
  -> update player pathProgress deterministically
  -> fire one-shot path threshold events
  -> complete walk-the-path at pathProgress >= 0.35
  -> evaluate focal-tree affordance against ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect with stable reason metadata
  -> accept inspect:focal-tree when range, target, payload, scene, and duplicate checks pass
  -> trigger focal-tree story beat
  -> complete inspect-tree
  -> derive arrival completion from both objectives
  -> expose snapshot.gameplay and GameHost gameplay diagnostics
  -> prove parity through DOM-free replay fixtures
```

## Domains in use

### Runtime and host domains

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
external-webgl-meadow-renderer
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

### Gameplay authority domains needed next

```txt
host-input-ingress
scripted-input-domain
fixture-input-domain
replay-input-domain
action-frame-contract
action-batch-contract
action-result-contract
action-journal-contract
action-frame-normalization
action-acceptance-policy
action-rejection-policy
ordered-reducer-pipeline
reducer-contract
reducer-result-contract
reducer-result-journal
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

## Services in use

### Runtime and host services

- Boot the browser route.
- Load `meadow-area-kit` and `meadow-webgl-render-kit` from `GAME_MANIFEST.externalKits`.
- Create the product game instance.
- Create the WebGL renderer.
- Maintain the animation frame loop.
- Call `game.tick({ time, dt })` each frame.
- Produce raw and enhanced render plans.
- Render the meadow scene.
- Expose `window.GameHost` with state, snapshot, diagnostics, render plan, and render snapshot access.
- Preserve compatibility with the current no-actions tick signature.

### State and content services

- Create deterministic initial state.
- Track frame, active scene, active session, player transform, path progress, world wind, active objective, completed objectives, story beats, and DSK install snapshot.
- Store arrival meadow path, focal tree, grass, flowers, rocks, mushrooms, tree line, and material palette descriptors.
- Store objective descriptors for `walk-the-path` and `inspect-tree`.
- Store interaction target descriptors for `focal-tree` and `arrival-path`.
- Validate DSK installation and render plan status.

### Render services

- Produce meadow area render plans.
- Apply grass patch, wind, post-process, outline, and stats metadata.
- Draw WebGL meadow scene through external render kit.
- Report render object counts, grass patch counts, and vertex counts.

### Services needed next

- Normalize ActionFrame records from host, scripted, fixture, and replay sources.
- Build stable ActionBatch records per deterministic tick.
- Return accepted, rejected, and no-op ActionResult records.
- Record ActionJournal entries.
- Require each reducer to return ReducerResult records.
- Record reducer order, events, diffs, accepted actions, rejected actions, and diagnostics.
- Update path progress from scripted/procedural movement actions.
- Emit one-shot path threshold events.
- Complete `walk-the-path` from descriptor condition.
- Evaluate focal-tree inspect affordance.
- Reject invalid inspect actions with stable reasons.
- Accept valid `inspect:focal-tree` actions.
- Trigger story events from accepted inspect.
- Complete `inspect-tree` from accepted inspect.
- Derive arrival completion.
- Project `snapshot.gameplay`.
- Add GameHost gameplay diagnostics.
- Add DOM-free replay fixtures for no-op, path walk, invalid inspect, valid inspect, objective completion, and replay parity.

## Kits in use

### Current external kits

```txt
meadow-area-kit
  source: NexusRealtime-ProtoKits/protokits/meadow-area-kit/index.js
  services: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  source: NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit/index.js
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

### Full local kit/DSK inventory

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

### Runtime cutover kits for the next slice

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-result-contract-kit
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

## Source seams

The highest-leverage source seams remain:

```txt
src/hosts/web-host.js
  -> add optional action intake only after preserving current requestAnimationFrame behavior

src/game/create-into-the-meadow-game.js
  -> keep tick({ time, dt }) compatible
  -> add tick({ time, dt, actions }) as an additive contract
  -> expose gameplay diagnostics through GameHost snapshot path

src/game/game-state.js
  -> split frame ticking from gameplay reducers
  -> keep initial state stable
  -> add reducer result return path

src/game/game-snapshot.js
  -> keep manifest/state/renderPlan/diagnostics stable
  -> add snapshot.gameplay

src/content/meadow-areas/arrival-meadow.js
  -> source path reducer from descriptor-owned path points

src/content/objectives/arrival-objectives.js
  -> source objective completion from descriptor-owned requirements

src/content/interaction-targets/arrival-targets.js
  -> source inspect affordance from descriptor-owned focal-tree radius
```

## Recommended next vertical slice

**Build target:** `IntoTheMeadow Action Batch Reducer Harness + Gameplay Projection Gate`

```txt
preserve current browser route, web host, external kit loading, render plan, renderer, debug HUD, and GameHost compatibility
  -> keep game.tick({ time, dt }) exactly compatible
  -> add optional game.tick({ time, dt, actions }) without changing render call sites
  -> add ActionFrame contract with id, frame, time, sceneId, source, type, targetId, payload, and metadata
  -> add ActionBatch contract with deterministic ordering, dedupe, and freeze semantics
  -> add ActionResult contract for accepted, rejected, and no-op paths
  -> add stable rejection reasons: unsupported_action, invalid_scene, invalid_payload, out_of_range, wrong_target, duplicate_event, no_effect
  -> add reducer contract and ReducerResult contract
  -> add no-op reducer seed fixture before concrete gameplay math
  -> add ordered reducer pipeline diagnostics
  -> add path progress reducer sourced from ARRIVAL_MEADOW_CONFIG.features.path.points
  -> add one-shot path threshold event emission
  -> complete walk-the-path at pathProgress >= 0.35
  -> add focal-tree inspect affordance sourced from ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect cases explicitly
  -> accept inspect:focal-tree once constraints pass
  -> trigger focal-tree story beat and inspect-tree objective completion
  -> derive arrival meadow completion after both current objectives complete
  -> add snapshot.gameplay with player, path, actions, reducers, events, story, objectives, interaction, completion, and diagnostics projections
  -> expose GameHost gameplay diagnostics
  -> add DOM-free fixture scripts for no-op tick, action batch ordering, reducer result shape, path walk, invalid inspect, valid inspect, objective completion, and replay parity
  -> defer pointer-lock player controls, save persistence, audio, renderer extraction, and ProtoKit promotion
```

## Validation

No runtime source files changed in this pass.

No local build or smoke test was run in this pass.
