# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T23:40:40-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Selected by:** central `LuminaryLabs-Dev/LuminaryLabs` Publish repo ledger rotation.

**Excluded:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`IntoTheMeadow` remains the oldest eligible non-Cavalry Publish repo by central ledger timestamp. The repo is structurally clean: `index.html` boots `src/boot/boot-game.js`, the web host loads external meadow kits, the game factory installs local DSK descriptors, the state root already contains player/progression/world fields, and the render path already works through a meadow render plan plus enhancement pass.

The next product cut should stop treating the game as a render-only meadow scene and introduce a deterministic gameplay authority seam. The highest-leverage implementation is **IntoTheMeadow Gameplay Snapshot Fixture Matrix + Reducer Acceptance Gate**, which proves `snapshot.gameplay`, typed reducer results, path progress, inspect affordance, objective completion, and replay fixtures without changing the visual renderer.

## Selection ledger

```txt
IntoTheMeadow    2026-07-07T22:20:00-04:00  selected
ZombieOrchard    2026-07-07T22:31:24-04:00
HorrorCorridor   2026-07-07T22:41:23-04:00
TheOpenAbove     2026-07-07T22:50:39-04:00
AetherVale       2026-07-07T22:59:19-04:00
PhantomCommand   2026-07-07T23:09:45-04:00
PrehistoricRush  2026-07-07T23:21:18-04:00
MyCozyIsland     2026-07-07T23:31:44-04:00
TheCavalryOfRome excluded
```

## Source-backed current read

### Active route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

`index.html` owns the static canvas/HUD/loading shell and imports `./src/boot/boot-game.js`.

`boot-game.js` selects `#scene`, `#hud`, `#status`, and `#loading`, checks `?debug`, and starts `startWebHost()`.

`web-host.js` loads `GAME_MANIFEST.externalKits[0]` and `[1]`, creates the game, creates the renderer, exposes `GameHost`, hides loading, and runs the animation frame loop. The frame loop calls `game.tick({ time, dt: 1 / 60 })`, gets a render plan, enhances it, renders it, and updates debug status.

`create-into-the-meadow-game.js` imports manifest/content descriptors, installs DSKs, creates the meadow area kit, stores a mutable local `state`, and exposes `manifest`, `content`, `dskInstall`, `meadow`, `getState`, `getRenderPlan`, `getDiagnostics`, `getSnapshot`, `tick`, and `reset`.

`game-state.js` already seeds the player, world, progression, scene/session identity, and DSK install snapshot, but `advanceGameState()` only increments frame and records `lastTick`.

`game-snapshot.js` currently projects `id`, `build`, `manifest`, `state`, `renderPlan`, and `diagnostics`. It does not yet expose a dedicated `gameplay` branch.

### Descriptor facts ready for gameplay

```txt
initial player: x=0 y=0 z=-36 yaw=0 pitch=0 pathProgress=0
world wind strength: 0.38
arrival path point count: 6
arrival path start: x=0 z=-44
arrival path end: x=0 z=20
walk objective: walk-the-path
walk completion: pathProgress >= 0.35
inspect objective: inspect-tree
inspect target: focal-tree
focal-tree inspect radius: 4.5
arrival-path radius: 32
```

## Interaction loop

### Current player-facing loop

```txt
open IntoTheMeadow
  -> see golden-hour meadow scene
  -> render continues at requestAnimationFrame cadence
  -> optional debug HUD shows validation/counts
  -> no gameplay input is normalized into the deterministic state authority yet
  -> path progress remains seeded state, not reducer output
  -> objectives remain descriptors, not executable completion state
```

### Current runtime loop

```txt
browser opens index.html
  -> boot-game.js starts startWebHost
  -> web-host loads external meadow-area and meadow-webgl-render kits from manifest
  -> createIntoTheMeadowGame installs local DSK descriptors
  -> createMeadowAreaKit builds arrival meadow area from ARRIVAL_MEADOW_CONFIG
  -> exposeGameHost publishes state/snapshot/diagnostics/render snapshot
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> meadow area creates raw render plan
  -> enhanceRenderPlan adds grass/wind/post-process/outline/render stats metadata
  -> renderer renders enhanced plan
```

### Target gameplay-authority loop

```txt
tick receives optional actions
  -> normalize host/scripted/fixture/replay input into ActionFrame records
  -> freeze ordered ActionBatch for the frame
  -> run reducers in stable order
  -> each reducer returns ReducerResult
  -> record accepted/rejected/no-op ActionResult entries
  -> record reducer order, diagnostics, events, and state diffs
  -> update player pathProgress from path-progress actions
  -> emit one-shot threshold events
  -> complete walk-the-path when pathProgress >= 0.35
  -> evaluate focal-tree inspect affordance from target radius
  -> reject invalid inspect with stable reason metadata
  -> accept valid inspect:focal-tree
  -> complete inspect-tree
  -> derive arrival meadow completion
  -> expose snapshot.gameplay for fixtures, diagnostics, debug HUD, and later saves
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

## Services the kits offer

### Current runtime services

```txt
boot browser route
bind DOM canvas/HUD/loading targets
load external kits by manifest URL
install local DSK descriptors
validate local/external DSK install counts
create arrival meadow area kit
create WebGL renderer
tick deterministic state root
generate meadow render plan
enhance render plan metadata
render enhanced plan
expose GameHost state/snapshot/diagnostics/render snapshot
reset game state
show debug HUD counts when ?debug is present
```

### Current state/content services

```txt
create deterministic initial state
seed active scene id
seed active session id
seed player transform and pathProgress
seed world wind strength
seed active objective and story beat ids
store DSK install snapshot
expose manifest/content descriptors
expose objectives and interaction targets
```

### Current validation services

```txt
static-smoke
dsk-registry-smoke
render-plan-smoke
deterministic-scene-smoke
manifest validation through diagnostics
render plan validation through diagnostics
```

### Next gameplay services

```txt
normalize ActionFrame records
collect/sort/dedupe/freeze ActionBatch records
return ActionResult records for accepted, rejected, and no-op actions
journal action intake and output
return ReducerResult records for every reducer
journal reducer order, state diff, events, and diagnostics
apply path-progress reducer
sample ARRIVAL_MEADOW_CONFIG.features.path.points
detect one-shot path thresholds
complete walk-the-path
evaluate focal-tree inspect affordance
accept/reject inspect actions with stable reasons
complete inspect-tree
derive arrival completion
project snapshot.gameplay
validate gameplay snapshots
run DOM-free replay fixtures
compare normalized replay snapshots
```

## Kits identified

### External runtime kits

```txt
meadow-area-kit
meadow-webgl-render-kit
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

### Current local inventory / concept kits

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

### Next-cut gameplay kits

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

## Recommended next vertical slice

**Build target:** `IntoTheMeadow Gameplay Snapshot Fixture Matrix + Reducer Acceptance Gate`

### Goal

Add the smallest deterministic gameplay authority seam that proves a real player loop without touching visual fidelity.

### Build order

```txt
preserve index.html, boot-game.js, web-host.js visual behavior, external kit loading, and GameHost compatibility
  -> keep game.tick({ time, dt }) working
  -> allow additive game.tick({ time, dt, actions })
  -> add ActionFrame contract with id/frame/time/scene/source/type/target/payload/meta
  -> add ActionBatch ordering and de-dupe
  -> add ActionResult contract
  -> add ReducerResult contract
  -> add stable rejection reasons
  -> add reducer seed fixture before movement math
  -> add path progress reducer using ARRIVAL_MEADOW_CONFIG.features.path.points
  -> complete walk-the-path at pathProgress >= 0.35
  -> add focal-tree affordance from ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect with explicit reason metadata
  -> accept inspect:focal-tree when target/range/payload constraints pass
  -> complete inspect-tree after accepted inspect
  -> derive arrival meadow completion from both objectives
  -> expose snapshot.gameplay
  -> expose GameHost gameplay diagnostics
  -> add DOM-free fixture matrix for no-op tick, action ordering, rejected inspect, valid inspect, path completion, objective completion, and replay parity
```

### Acceptance checks

```txt
existing static/dsk/render/deterministic smoke remains valid
game.tick({ time, dt }) remains backward-compatible
game.tick({ time, dt, actions }) returns state with journaled results
invalid inspect does not mutate objective state
valid inspect:focal-tree completes inspect-tree
scripted path-progress reaches walk-the-path completion
snapshot.gameplay exists and validates
GameHost diagnostics expose gameplay counts and latest results
replay fixture produces stable normalized snapshot output
```

### Defer

```txt
pointer-lock player controls
save persistence
audio
renderer extraction
ProtoKit promotion
large meadow content expansion
```

## Validation

No runtime source files changed in this documentation pass.

No local build or smoke test was run.
