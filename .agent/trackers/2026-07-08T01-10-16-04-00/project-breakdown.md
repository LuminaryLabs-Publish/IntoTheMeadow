# IntoTheMeadow Project Breakdown - 2026-07-08T01:10:16-04:00

## Summary

`LuminaryLabs-Publish/IntoTheMeadow` remains a DSK-composed static meadow exploration game with a clean browser host, game factory, deterministic state root, local DSK inventory, external meadow render imports, and render enhancement layer. This pass keeps the next implementation boundary focused on **Gameplay Authority Contract + Fixture Replay Gate** so the repo can become playable without disturbing the current render proof.

## Selection reason

The central `LuminaryLabs-Dev/LuminaryLabs` Publish ledger showed `IntoTheMeadow` as the oldest eligible non-Cavalry repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked:

```txt
IntoTheMeadow    2026-07-07T23:40:40-04:00
ZombieOrchard    2026-07-07T23:48:44-04:00
HorrorCorridor   2026-07-08T00:00:20-04:00
TheUnmappedHouse 2026-07-08T00:08:03-04:00
TheOpenAbove     2026-07-08T00:21:15-04:00
AetherVale       2026-07-08T00:28:42-04:00
PhantomCommand   2026-07-08T00:41:39-04:00
PrehistoricRush  2026-07-08T00:49:44-04:00
MyCozyIsland     2026-07-08T01:00:43-04:00
```

## Plan ledger

### Goal

Refresh the internal docs for `IntoTheMeadow`, capture the current loop, domains, services, kits, blockers, and next implementation slice, then log the update back into the central Luminary Labs repo.

### Checklist

- [x] Confirmed accessible `LuminaryLabs-Publish` repos.
- [x] Compared central ledger timestamps.
- [x] Selected `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Read current route, host, game factory, state, snapshot, render enhancement, manifest, content, DSK registry, and smoke surfaces.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified current and needed services.
- [x] Identified implemented, runtime-implied, next-cut, and deferred kits.
- [x] Updated the root `.agent` folder.
- [x] Prepared central change-log and ledger updates.

## Source read

### Live route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

### Current architecture facts

```txt
repo purpose: publishable DSK-composed meadow exploration game
runtime type: static browser route
host loop: requestAnimationFrame
external kits: meadow-area-kit, meadow-webgl-render-kit
local DSK count: 43 listed ids, 14 required v0.1 ids
public GameHost: getState, getSnapshot, getDiagnostics, renderer snapshot through host wrapper
check command: npm run check
```

### Content facts

```txt
scene id: arrival-meadow
area size: width 90, depth 110
path points: 6
path start: { x: 0, z: -44 }
path end: { x: 0, z: 20 }
player spawn: { x: 0, y: 0, z: -36 }
world wind strength: 0.38
focal tree position: { x: 0, y: 0, z: 24 }
focal tree inspect radius: 4.5
arrival path target radius: 32
objectives: walk-the-path, inspect-tree
walk completion: pathProgress >= 0.35
inspect completion: inspected focal-tree
visual style: golden-hour painterly-cel-3d
```

## Interaction loop

### Current player-facing loop

```txt
open published page
-> index.html creates full-screen canvas and optional debug HUD
-> boot-game.js locates DOM surfaces and calls startWebHost
-> web-host.js imports external meadow-area and WebGL render kits from GAME_MANIFEST
-> createIntoTheMeadowGame installs local DSK descriptors
-> createIntoTheMeadowGame creates ARRIVAL_MEADOW_CONFIG through meadow-area-kit
-> requestAnimationFrame calls game.tick({ time, dt })
-> advanceGameState increments frame and stores lastTick only
-> meadow.getRenderPlan emits the arrival meadow render plan
-> enhanceRenderPlan adds outline policy, wind field, post-process metadata, and texture-driven grass system metadata
-> meadow-webgl-render-kit renders the plan
-> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

### Current runtime loop

```txt
npm run check
-> static-smoke validates route files and boot script
-> dsk-registry-smoke validates local DSK ids and required ids
-> render-plan-smoke validates render plan shape
-> deterministic-scene-smoke validates stable scene output
```

### Target gameplay authority loop

```txt
host/script/fixture/replay input
-> normalize into ActionFrame records
-> batch, sort, dedupe, and freeze action frames per tick
-> pass ActionBatch into game.tick({ time, dt, actions }) without breaking game.tick({ time, dt })
-> reducer pipeline applies movement, path progress, inspect, story, objective, and completion reducers in stable order
-> each reducer returns ReducerResult with state, acceptedActions, rejectedActions, events, diffs, and diagnostics
-> path reducer samples ARRIVAL_MEADOW_CONFIG.features.path.points
-> objective reducer completes walk-the-path when pathProgress >= 0.35
-> affordance reducer evaluates focal-tree proximity and target validity
-> inspect reducer accepts valid inspect:focal-tree or rejects invalid inspect with stable reason metadata
-> story/objective reducers mark inspect-tree and arrival completion
-> gameplay snapshot projects player, path, actions, reducers, events, story, objectives, interaction, completion, and render metadata
-> DOM-free fixture matrix proves no-op tick, ordered actions, path walk, invalid inspect, valid inspect, objective completion, and replay parity
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
canvas-surface
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
runtime-compatibility-contract
static-smoke-validation
```

### Composition domains

```txt
manifest-authority
game-factory
content-pack-authority
local-dsk-registry
local-dsk-descriptor-installer
local-dsk-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
scene-identity
session-identity
deterministic-state-root
tick-clock
last-tick-diagnostics
snapshot-root
```

### Meadow content domains

```txt
arrival-meadow-area
arrival-path-content
focal-tree-content
terrain-material-palette
golden-hour-style
grass-content
flower-content
rock-content
mushroom-content
tree-line-content
wind-state
story-beat-ledger
objective-ledger
interaction-target-registry
```

### Render domains

```txt
render-plan-generation
render-plan-enhancement
outline-policy
small-object-clutter-reduction
focal-tree-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-clump-instancing-render
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field-render-metadata
post-process-stack-metadata
render-stats-diagnostics
webgl-renderer-snapshot
```

### Needed gameplay authority domains

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
stable-rejection-reason-catalog
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

## Services that the kits offer

### Current host services

```txt
locate-canvas
locate-hud
locate-loading-surface
start-web-host
load-external-kits
create-game
create-renderer
expose-game-host
run-frame-loop
hide-loading-surface
write-debug-status
render-frame
return-host-runtime
```

### Current game services

```txt
load-game-manifest
install-dsks
validate-local-dsks
create-meadow-area-kit
create-fallback-meadow-area-kit
create-initial-game-state
advance-game-state
create-game-snapshot
validate-game-snapshot
get-render-plan
get-diagnostics
reset-state
```

### Current render enhancement services

```txt
reduce-tiny-clutter
apply-outline-policy
enhance-focal-tree
create-wind-field
create-post-process-stack
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-clump-instancing-render
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
attach-grass-stats
```

### Current DSK descriptor services

```txt
create-dsk-descriptor
map-id-to-domain
map-id-to-label
attach-layer-stack
attach-provides-list
validate-id-suffix
validate-subdomain-count
snapshot-dsk-descriptor
get-dsk
validate-local-dsk-inventory
```

### Needed gameplay services

```txt
create-action-frame
normalize-action-frame
validate-action-frame
collect-frame-actions
sort-action-frames
dedupe-action-frames
freeze-action-batch
create-accepted-action-result
create-rejected-action-result
create-noop-action-result
classify-rejection-reason
run-reducer-pipeline
create-reducer-result
journal-reducer-result
sample-path-progress
emit-path-threshold-event
evaluate-focal-tree-affordance
resolve-inspect-target
complete-objective
trigger-story-beat
derive-arrival-completion
create-gameplay-snapshot
create-gameplay-diagnostics
run-dom-free-fixture
normalize-volatile-fields
compare-replay-snapshots
```

## Kit inventory

### External kits loaded by host

```txt
meadow-area-kit
  source: NexusRealtime-ProtoKits CDN
  services: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  source: NexusRealtime-ProtoKits CDN
  services: createMeadowWebglRenderKit, render, getSnapshot
```

### Implemented local DSKs and kits

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
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

### Active v0.1 required inventory

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
post-process-stack-dsk
static-pages-deploy-dsk
```

### Next-cut kits

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

### Deferred kits

```txt
pointer-lock-first-person-kit
meadow-camera-rig-runtime-kit
meadow-save-runtime-kit
meadow-audio-runtime-kit
meadow-dialogue-ui-kit
meadow-quest-log-ui-kit
meadow-ecology-agent-kit
seasonal-meadow-variant-kit
renderer-extraction-protokit
terrain-texture-protokit-promotion
shader-wind-protokit-promotion
grass-renderer-protokit-promotion
```

## Current blockers

```txt
advanceGameState only increments frame and lastTick.
game.tick has no action-frame input contract.
No ActionResult or ReducerResult shape exists.
No stable rejection reasons exist for invalid movement or inspect commands.
Path progress is present in state but not advanced from inputs.
Objectives exist as descriptors but are not reduced into state changes.
Interaction targets exist as descriptors but are not used for runtime affordance evaluation.
createGameSnapshot has no dedicated snapshot.gameplay branch.
GameHost diagnostics do not expose gameplay journal, reducer results, or replay parity.
Smoke coverage validates boot and render shapes but not playable objective progression.
```

## Next implementation slice

```txt
IntoTheMeadow Gameplay Authority Contract + Fixture Replay Gate
```

### Build order

```txt
1. Preserve index.html, boot-game.js, web-host.js, current render behavior, current GameHost methods, and game.tick({ time, dt }).
2. Add optional game.tick({ time, dt, actions }) input support.
3. Add meadow-actionframe-contract-kit.
4. Add meadow-action-batch-kit.
5. Add meadow-action-result-contract-kit.
6. Add meadow-action-rejection-reason-kit with unsupported_action, invalid_scene, invalid_payload, out_of_range, wrong_target, duplicate_event, and no_effect.
7. Add meadow-reducer-result-contract-kit.
8. Add meadow-reducer-pipeline-kit with fixed reducer order.
9. Add path-progress-runtime-kit using ARRIVAL_MEADOW_CONFIG.features.path.points.
10. Complete walk-the-path at pathProgress >= 0.35.
11. Add focal-tree-affordance-kit using ARRIVAL_INTERACTION_TARGETS radius 4.5.
12. Add inspect-result-reducer-kit with accepted and rejected inspect paths.
13. Complete inspect-tree after accepted inspect:focal-tree.
14. Derive arrival completion when both current objectives are complete.
15. Add meadow-gameplay-snapshot-kit under snapshot.gameplay.
16. Add GameHost gameplay diagnostics without removing existing surfaces.
17. Add DOM-free fixtures for no-op tick, ordered actions, path walk, invalid inspect, valid inspect, objective completion, and replay parity.
18. Extend npm run check with the fixture matrix only after baseline compatibility is preserved.
```

## Acceptance target

```txt
npm run check passes.
Existing static route and render output remain compatible.
window.GameHost.getState() still returns the current state root.
window.GameHost.getSnapshot() includes snapshot.gameplay.
game.tick({ time, dt }) remains valid.
game.tick({ time, dt, actions }) accepts deterministic ActionFrame records.
Invalid inspect returns rejected ActionResult and does not mutate state.
Path movement reaches walk-the-path completion at pathProgress >= 0.35.
Valid focal-tree inspect completes inspect-tree.
Arrival completion derives only after both objectives complete.
Fixture replay produces matching final gameplay snapshots after volatile-field normalization.
```

## Validation status

No runtime source files changed in this pass.

No local build or smoke test was run in this pass.
