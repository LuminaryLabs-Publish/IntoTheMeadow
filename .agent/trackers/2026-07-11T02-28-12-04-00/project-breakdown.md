# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T02-28-12-04-00`

## Goal

Map the actual runtime session lifecycle, prove where RAF, global, listener, and renderer ownership is lost, and define one bounded single-RAF/rollback authority without changing runtime behavior.

## Plan ledger

```txt
[x] Enumerate the full accessible LuminaryLabs-Publish inventory.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare all eligible repositories against the central ledger.
[x] Confirm root .agent state for the eligible set.
[x] Select the oldest eligible documented fallback.
[x] Work on exactly one product repository.
[x] Read AGENTS.md and current .agent state.
[x] Trace browser boot and asynchronous startup.
[x] Trace RAF scheduling, stop, start, fatal, and renderer disposal paths.
[x] Trace GameHost and editor global exposure ownership.
[x] Trace editor listener installation and disposal.
[x] Trace game fixed-step frame mutation.
[x] Identify the interaction loop.
[x] Identify active and declared domains.
[x] Inventory external, runtime-backed, registry-declared, and planned kits.
[x] Inventory kit-provided services.
[x] Document controller reachability, RAF multiplication, global lease, listener, rollback, fatal, and disposal gaps.
[x] Add architecture, render, gameplay, interaction, lifecycle, and deploy audits.
[x] Refresh all required root .agent files.
[x] Push documentation only to main.
[x] Update the central repo ledger and internal change log.
```

## Selection result

```txt
IntoTheMeadow       selected / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
ZombieOrchard        tracked  / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T01-50-30-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
TheCavalryOfRome     excluded by rule
```

All nine eligible repositories were centrally tracked and had root `.agent` state. `IntoTheMeadow` was the oldest eligible fallback.

## Actual interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost()
  -> load external meadow-area-kit
  -> create game/source provider
  -> create WebGL renderer
  -> create plan enhancer
  -> assign global GameHost
  -> assign global NexusEditorEnvironment
  -> install error and unhandledrejection listeners
  -> request RAF without retaining id
  -> game.tick({ time, dt: 1/60 })
  -> raw plan and enhancement
  -> WebGL outline and cel/fog draws
  -> HUD update
  -> request successor RAF without retaining id
```

Lifecycle side paths:

```txt
stop()  -> stopped=true
start() -> if stopped, stopped=false and request another RAF
fatal   -> stopped=true and update DOM
dispose -> only exists separately on renderer and editor bridge
boot    -> resolved host controller is discarded
```

## Domains in use

```txt
browser shell and DOM boot
asynchronous external-kit resolution
runtime session construction
lifecycle state and command admission
RAF ownership and run generation
global exposure leasing
listener ownership
resource acquisition and rollback
fatal transition and terminal disposal
frame request, simulation, plan, render, and HUD projection
DSK registry and installation
game state, tick, reset, and snapshot
source-plan cache and time overlay
story, objective, and interaction descriptors
terrain, path, environment, and grass composition
tree, wind, performance, and postprocess enhancement
render-plan validation and topology hashing
CPU mesh construction
WebGL resource/cache/render/snapshot/disposal
GameHost diagnostics
browser editor capability/capture/error observation
Node headless-editor observations
validation and Pages deployment
```

## Kit inventory

External:

```txt
meadow-area-kit 0.1.0
LuminaryLabs-Agents/NexusEngine-ProtoKits
commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

Runtime source-backed:

```txt
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL compatibility adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
GameHost diagnostics surface
browser editor bridge
Node headless-editor environment
```

Registry:

```txt
one external kit
44 local kit descriptors across game, host, terrain, path, grass, environment,
gameplay, diagnostics, rendering, postprocess, and deployment
```

## Services offered

```txt
external import, deterministic generation, validation, snapshots, caching, rebuild, and time overlay
DSK lookup, validation, and install snapshots
terrain/path/material/object descriptors
grass density, archetypes, batches, placement, draw groups, wind, LOD, scaling, and debug
tree, wind, performance, and postprocess enhancement
render-plan validation and topology hashes
CPU geometry and visual metrics
WebGL context, shaders, buffers, resize, outline pass, cel/fog pass, snapshot, and disposal
game state tick/reset/snapshot
Boolean runtime stop/start
fatal DOM projection
GameHost state/plan/renderer/enhancer readback
browser editor tick/reset/scene/render/capture/viewport/error capabilities
editor listener removal and global deletion
Node plan/mesh/metrics/SVG/workspace capabilities
static and editor smoke checks
Pages deployment
```

## Main finding: stop/start can multiply the RAF loop

The runtime never stores the RAF id.

```txt
RAF A pending
  -> caller invokes stop()
  -> stopped becomes true
  -> caller invokes start() before RAF A is delivered
  -> stopped becomes false
  -> start() queues RAF B
  -> browser delivers RAF A and RAF B
  -> both see stopped=false
  -> both tick, render, and queue successors
```

The duplication persists because every admitted callback schedules another callback.

## Gameplay consequence

`advanceGameState()` increments `state.frame` once per callback and records fixed `dt: 1/60`. Two RAF chains therefore advance the game twice per display cadence while sharing near-identical RAF timestamps. Any later movement, objective, physics, animation, or timer logic added to the existing tick path would inherit the multiplication defect.

## Render consequence

Two callbacks perform:

```txt
two plan enhancements
two renderer.render calls
four WebGL draw calls
two cache-hit increments
two HUD writes
two successor RAF requests
```

No render-generation fence prevents a stale callback from drawing after restart.

## Ownership consequence

```txt
boot drops host controller
GameHost global overwrites prior value
editor global overwrites prior value
editor installs two global listeners
fatal path disposes none of them
renderer program/buffers remain live
no owner publishes a terminal lifecycle result
```

## Required parent domain

```txt
runtime-session-authority-domain
```

Candidate kits:

```txt
runtime-session-identity-kit
runtime-lifecycle-state-kit
runtime-lifecycle-command-kit
runtime-lifecycle-result-kit
raf-ownership-kit
run-generation-fence-kit
runtime-clock-admission-kit
resource-ownership-ledger-kit
cleanup-stack-kit
global-exposure-lease-kit
listener-lease-kit
startup-rollback-kit
fatal-transition-kit
runtime-disposal-kit
runtime-lifecycle-journal-kit
GameHost-lifecycle-observation-kit
headless-editor-lifecycle-capability-kit
runtime-lifecycle-fixture-adapter-kit
```

## Next safe ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Single-RAF / Global-Lease / Rollback Fixture Gate
```

Immediate companion:

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

Lifecycle remains first because committed-frame sequencing cannot be reliable while more than one callback can claim the active run or while failed sessions retain global and GPU ownership.
