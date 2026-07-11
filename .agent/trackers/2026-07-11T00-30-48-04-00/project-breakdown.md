# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T00-30-48-04-00`

## Goal

Map the current state, plan, renderer, canvas, GameHost, browser-editor, and Node-editor publication paths, then define one atomic committed-frame authority without changing runtime behavior.

## Plan ledger

```txt
[x] Enumerate the full accessible LuminaryLabs-Publish inventory.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare all eligible repositories against the central ledger.
[x] Select the oldest eligible documented fallback.
[x] Work on exactly one product repository.
[x] Read AGENTS.md and current .agent state.
[x] Trace browser boot, frame sequencing, state mutation, plan enhancement, render, HUD, GameHost, and editor paths.
[x] Trace Node headless build, metrics, capture, and workspace paths.
[x] Identify the interaction loop.
[x] Identify all active and declared domains.
[x] Inventory external, runtime-backed, registry-declared, and proof kits.
[x] Inventory kit-provided services.
[x] Document partial publication, direct editor mutation, capture correlation, and browser/Node parity gaps.
[x] Add architecture, render, gameplay, interaction, frame-authority, headless-editor, and deployment audits.
[x] Refresh all required root .agent files.
[x] Push documentation only to main.
[x] Update the central repo ledger and internal change log.
```

## Selection result

```txt
IntoTheMeadow       selected / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
TheCavalryOfRome     excluded by rule
```

All nine eligible repositories were centrally tracked and had root `.agent` state. `IntoTheMeadow` was the oldest eligible fallback.

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js:startWebHost
  -> external provider import
  -> game/renderer/enhancer construction
  -> GameHost and browser editor exposure
  -> requestAnimationFrame
  -> game.tick
  -> raw plan at RAF time
  -> enhanced plan
  -> lastPlan assignment
  -> WebGL outline and cel/fog render
  -> lastRender assignment
  -> HUD projection
  -> successor RAF
```

Alternative interaction paths:

```txt
browser editor runtime.tick/reset -> game mutation only
browser editor renderer.capture -> current canvas + renderer snapshot
GameHost calls -> independently sourced state/plan/render facts
Node editor calls -> on-demand plan/mesh/metric rebuild and synthetic SVG
```

## Domains in use

```txt
browser shell and boot
runtime construction and lifecycle
frame request, simulation, enhancement, render, and publication
external source import and fallback
DSK registry/install
game state, tick, and reset
source-plan cache and time overlay
render-plan contract and topology hash
terrain/path/environment/grass composition
tree/wind/performance/postprocess enhancement
CPU mesh construction
WebGL rendering, cache, snapshot, and disposal
GameHost diagnostics
browser editor capability and capture bridge
Node headless-editor observation and artifacts
HUD/loading/fatal projection
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
source import, generation, validation, snapshots, cache, rebuild, and time overlay
DSK lookup, validation, and install snapshots
terrain/path/material/object descriptors
grass density, archetypes, batches, patches, draw groups, wind, LOD, scaling, and debug
tree, performance, wind, and postprocess enhancement
render-plan validation, source topology key, and contracted topology key
CPU mesh construction and visual metrics
WebGL context, shader, buffer cache, resize, draw, snapshot, and disposal
game state tick/reset/snapshot
GameHost state/plan/renderer/enhancer readback
browser editor tick/reset/scene/render/canvas/viewport/error capabilities
Node editor plan/mesh/metrics/SVG/workspace capabilities
static and editor smoke checks
Pages deployment
```

## Main finding

The current route has no atomic frame commit.

```txt
state mutates before render success
lastPlan publishes before render success
lastRender publishes only after success
canvas writes occur without a commit acknowledgement
HUD, GameHost, browser editor, and capture read separately
Node editor creates separate synthetic observations
```

The most direct failures are:

```txt
render error -> new state + new plan + old render/canvas
editor tick/reset -> new state + old render/canvas
GameHost snapshot -> current state + default-time raw plan + retained enhanced plan/render
capture -> uncorrelated canvas bytes + renderer snapshot
Node capture -> synthetic SVG with no browser frame identity
```

## Next safe ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

Immediate companion:

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

Lifecycle remains first because the session must own run generation, frame sequence, journals, failure policy, and terminal publication.
