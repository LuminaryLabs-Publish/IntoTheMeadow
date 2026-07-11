# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T22-58-36-04-00`

## Goal

Establish the missing runtime session ownership boundary for construction, RAF scheduling, stop, restart, fatal failure, global leases, resource cleanup, and terminal disposal without changing runtime behavior.

## Plan ledger

```txt
[x] Enumerate the full accessible LuminaryLabs-Publish inventory.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare all eligible repositories against the central ledger.
[x] Select the oldest eligible documented fallback.
[x] Work on exactly one product repository.
[x] Read AGENTS.md and current .agent state.
[x] Trace index, boot, host construction, RAF scheduling, stop/start, fatal handling, globals, editor listeners, and renderer disposal.
[x] Identify the interaction loop.
[x] Identify active and declared domains.
[x] Inventory external, runtime-backed, and registry-declared kits.
[x] Inventory kit-provided services.
[x] Document restart races, partial-construction leaks, fatal cleanup gaps, and disposal gaps.
[x] Add architecture, render, gameplay, interaction, lifecycle, and deployment audits.
[x] Refresh all required root .agent files.
[x] Push documentation only to main.
[x] Update the central repo ledger and internal change log.
```

## Selection result

```txt
IntoTheMeadow       2026-07-10T21-19-36-04-00 selected
TheOpenAbove        2026-07-10T21-31-01-04-00
HorrorCorridor      2026-07-10T21-39-22-04-00
PhantomCommand      2026-07-10T21-49-26-04-00
ZombieOrchard       2026-07-10T22-11-24-04-00
TheUnmappedHouse    2026-07-10T22-21-17-04-00
MyCozyIsland        2026-07-10T22-29-21-04-00
PrehistoricRush     2026-07-10T22-42-00-04-00
AetherVale          2026-07-10T22-50-02-04-00
TheCavalryOfRome    excluded
```

All nine eligible repositories were centrally tracked and had root `.agent` state. `IntoTheMeadow` was the oldest eligible fallback.

## Interaction and lifecycle loop

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> import external meadow source
  -> create game, renderer, and enhancer
  -> expose GameHost
  -> install NexusEditorEnvironment and error listeners
  -> request one RAF
  -> tick live state
  -> enhance source plan
  -> render WebGL frame
  -> update HUD
  -> request next RAF
```

The boot caller discards the resolved host controller. Editor capabilities independently tick/reset state, read scene/renderer facts, capture the canvas, and collect browser errors.

## Domains in use

```txt
browser boot and host construction
runtime session lifecycle
RAF scheduling and timing
external source loading and fallback
DSK registry/install
game/content state and reset
source plan and render-plan contracts
terrain/path/environment/grass composition
performance/postprocess enhancement
CPU mesh and WebGL rendering
renderer/enhancer caches
GameHost global diagnostics
headless-editor globals, capabilities, and error listeners
HUD/loading/fatal projection
Node fixtures and Pages deployment
```

## Kit inventory

External:

```txt
meadow-area-kit 0.1.0
```

Runtime source-backed:

```txt
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
nine grass-system kits
GameHost diagnostics surface
headless-editor bridge
```

Registry:

```txt
one external kit
44 local kit descriptors across game, host, meadow, grass, gameplay, diagnostics, rendering, postprocess, and deployment
```

## Services offered

```txt
source import/generation/validation/snapshot
DSK lookup/install validation
source-plan caching and rebuild
terrain/path/environment/grass descriptors
render-plan validation/topology keys
CPU mesh construction
WebGL shader/buffer/cache/draw/snapshot/dispose
state tick/reset
GameHost readback
editor tick/reset/scene/render/capture/viewport/error/listener-dispose services
smoke checks and Pages deployment
```

## Main finding

The route has cleanup primitives but no runtime session owner. RAF ids are never retained, stop does not cancel pending work, restart can fork two animation loops, boot discards the controller, fatal handling does not release renderer/editor/global resources, and construction has no reverse-order rollback.

## Next safe ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

The committed-frame gate follows immediately because the lifecycle session must own the frame transaction.
