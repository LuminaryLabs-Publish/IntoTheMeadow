# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-11T17-30-56-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

This documentation pass audits WebGL context loss and restoration. The renderer creates its program, locations and buffers once, records no context generation, installs no context-loss listeners and keeps the topology cache valid across restoration. A restored browser context can therefore reuse invalid GPU handles while diagnostics and canvas capture continue to expose the last successful renderer snapshot.

## Plan ledger

**Goal:** define one context-generation and GPU-resource recovery transaction so renderer state, committed frames, diagnostics and browser capture cannot claim success after context loss until a new-context frame is proven.

- [x] List the complete accessible `LuminaryLabs-Publish` organization inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central ledger entries.
- [x] Confirm root `.agent` coverage for all nine eligible repositories.
- [x] Apply the oldest documented-selection fallback.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read `AGENTS.md` and retained repo-local audits.
- [x] Trace browser boot, RAF, renderer creation, program creation, buffer caching, rendering, disposal, editor capture and browser smoke coverage.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Preserve the complete 44-kit census and service map.
- [x] Define the WebGL context recovery authority and executable fixture gate.
- [x] Refresh the required root `.agent` routing and validation files.
- [ ] Runtime recovery implementation and executable fixtures remain future work.

## Organization comparison

```txt
IntoTheMeadow      2026-07-11T15-49-49-04-00  selected
PrehistoricRush    2026-07-11T15-59-12-04-00
MyCozyIsland       2026-07-11T16-10-58-04-00
TheOpenAbove       2026-07-11T16-30-25-04-00
HorrorCorridor     2026-07-11T16-38-10-04-00
PhantomCommand     2026-07-11T16-49-51-04-00
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
TheCavalryOfRome   excluded
```

```txt
accessible repositories: 10
eligible repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected repository: IntoTheMeadow
other Publish repositories changed: none
```

## Interaction loop

```txt
browser boot
  -> load pinned meadow provider
  -> create game and source plan
  -> create WebGL renderer
  -> create shader program and resolve locations once
  -> install editor bridge

RAF
  -> tick frame-only state
  -> enhance render plan
  -> resize canvas
  -> ensure mesh by topology key
  -> bind cached program and buffers
  -> submit outline and color draws
  -> replace renderer snapshot
  -> expose HUD, GameHost and editor observations

context loss today
  -> no webglcontextlost listener
  -> no context phase or generation change
  -> no render-admission fence
  -> no committed-frame invalidation
  -> previous renderer snapshot remains readable

context restoration today
  -> no webglcontextrestored listener
  -> shader program is not recreated
  -> attribute and uniform locations are not re-resolved
  -> cached topology and mesh remain marked valid
  -> GPU buffers are not deterministically rebuilt
  -> canvas capture can pair current pixels with stale renderer metadata
```

## Domains in use

```txt
browser shell, DOM boot and visible fatal projection
manifest and external dependency declaration
source-provider loading, fallback and source-plan generation
DSK census, descriptor generation and install reporting
game state, tick, reset, snapshots and diagnostics
runtime lifecycle, RAF ownership and host capabilities
browser editor bridge and Node headless editor
workspace and artifact filesystem authority
runtime-step and monotonic-clock policy
player, input, interaction, objective and story declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 validation, topology identity and cache policy
CPU mesh construction
WebGL context acquisition, shader program and GPU buffer ownership
WebGL context loss, restoration and resource-generation recovery
renderer snapshots, GameHost observations and canvas capture
static checks, browser observation, build and Pages deployment
```

## Kit census

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
```

### External

```txt
meadow-area-kit
  normalization, deterministic scatter, source-plan generation,
  validation, snapshot, reset and optional runtime adaptation
```

### Local kits and DSKs

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
meadow-webgl-renderer-v2-kit
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

The exact per-kit service map remains in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

The renderer owns context-sensitive resources as process-lifetime values:

```txt
WebGL context
shader program
attribute locations
uniform locations
attribute buffers
cached topology key
cached CPU mesh
renderer snapshot
```

No context state is represented:

```txt
context phase
context generation
loss event identity
restore event identity
resource generation
candidate rebuild result
first recovered frame acknowledgement
capture freshness
```

A same-topology restore is especially unsafe:

```txt
context generation 0 renders topology A
  -> topology A cached
  -> context lost
  -> browser invalidates program and buffers
  -> context restored
  -> cache still says topology A is valid
  -> ensureMesh returns cached CPU mesh without bindMesh()
  -> old program, locations and buffer handles remain selected
  -> renderer snapshot can still describe the pre-loss frame
```

`showFatal()` can stop the RAF only after a JavaScript exception. WebGL context loss may instead make calls ineffective or surface delayed errors, so exception-only handling is not a recovery contract.

## Required parent domain

```txt
meadow-webgl-context-recovery-authority-domain
```

Existing owners to update first:

```txt
meadow-webgl-renderer-v2-kit
meadow-render-host-dsk
web-host-dsk
meadow-diagnostics-dsk
browser editor renderer.capture adapter
committed-frame observation authority
runtime session lifecycle authority
browser observation and deployment fixtures
```

Candidate coordinating kits:

```txt
webgl-context-state-kit
webgl-context-generation-kit
webgl-context-event-adapter-kit
webgl-render-admission-kit
webgl-resource-registry-kit
webgl-resource-generation-kit
webgl-resource-rebuild-plan-kit
webgl-context-loss-result-kit
webgl-context-restore-transaction-kit
webgl-recovered-frame-ack-kit
webgl-capture-freshness-kit
webgl-context-observation-kit
webgl-context-recovery-journal-kit
webgl-context-recovery-fixture-kit
```

## Required recovery transaction

```txt
webglcontextlost
  -> prevent default restoration cancellation
  -> advance context phase to lost
  -> fence render submission and capture success
  -> invalidate active GPU-resource generation
  -> invalidate current committed-frame eligibility
  -> publish typed context-loss result

webglcontextrestored
  -> allocate a new context generation
  -> recreate and validate shader program
  -> re-resolve all attributes and uniforms
  -> rebuild buffers from the current canonical CPU mesh/plan
  -> submit a candidate frame
  -> verify no context loss and no GL error during candidate work
  -> commit resource generation and recovered frame atomically
  -> publish typed restore result
  -> permit capture and RAF continuation
```

## Required proof

```txt
loss event prevents new successful render receipts
loss invalidates the latest committed-frame pointer
restoration creates a strictly newer context generation
program, locations and buffers belong to the restored generation
same topology still forces GPU buffer reconstruction
failed restoration leaves the prior generation unavailable
capture rejects when no recovered frame exists
first successful capture cites the recovered frame and context generation
diagnostics distinguish ready, lost, restoring, recovered, failed and disposed
repeated loss/restore cycles do not leak listeners, programs or buffers
disposal removes context listeners and is idempotent
```

## Documentation output

```txt
.agent/trackers/2026-07-11T17-30-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T17-30-56-04-00.md
.agent/architecture-audit/2026-07-11T17-30-56-04-00-webgl-context-recovery-authority-map.md
.agent/render-audit/2026-07-11T17-30-56-04-00-context-loss-stale-render-snapshot-gap.md
.agent/interaction-audit/2026-07-11T17-30-56-04-00-context-loss-restore-event-map.md
.agent/webgl-context-audit/2026-07-11T17-30-56-04-00-context-generation-resource-rebuild-contract.md
.agent/deploy-audit/2026-07-11T17-30-56-04-00-webgl-context-recovery-fixture-gate.md
```

## Validation status

```txt
runtime source changed: no
render output changed: no
dependencies changed: no
package scripts changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
WebGL context-loss fixture: unavailable
WebGL restoration fixture: unavailable
recovered-frame capture fixture: unavailable
```
