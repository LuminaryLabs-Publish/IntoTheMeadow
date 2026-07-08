# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T09:11:03-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Plan ledger

**Goal:** Refresh the repo-local `.agent` breakdown for `IntoTheMeadow`, compare it against the full `LuminaryLabs-Publish` repo set and the central `LuminaryLabs-Dev/LuminaryLabs` ledger, then document the next implementation-facing proof map without changing runtime source.

### Checklist

- [x] Compared the accessible `LuminaryLabs-Publish` repo set.
- [x] Compared the repo set against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed checked non-Cavalry repos are centrally represented and have root `.agent` state.
- [x] Selected `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible fallback follow-up.
- [x] Identified the current interaction loop.
- [x] Identified the target renderer/gameplay proof loop.
- [x] Identified all domains in use.
- [x] Identified kit services.
- [x] Identified implemented, external, local, and next-cut kits.
- [x] Added a new timestamped tracker entry.
- [x] Added a new timestamped turn-ledger entry.
- [x] Added architecture, render, and gameplay-authority audit entries.
- [x] Updated root `.agent` operating docs.
- [x] Updated `.agent/kit-registry.json`.
- [x] Logged the change centrally in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection audit

The full accessible Publish organization list checked in this pass:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

Central ledger state showed tracked entries for the checked non-Cavalry repos. Sampled root `.agent/START_HERE.md` state was already present. `TheCavalryOfRome` stayed excluded.

`IntoTheMeadow` was selected as the oldest eligible fallback follow-up because its last central update was older than the other recently refreshed eligible repos and its two highest-value seams remain unresolved:

```txt
1. renderer descriptor-consumption parity
2. ActionFrame / ActionResult objective reducer handoff
```

## Current product read

`IntoTheMeadow` is a static browser DSK-composed meadow exploration game.

The repo owns:

```txt
- static route
- browser boot
- web host
- game factory
- deterministic state root
- local DSK descriptor registry
- arrival meadow content
- story/objective/interaction descriptors
- render-plan enhancement layer
- GameHost projection
- validation scripts
- GitHub Pages deploy surface
```

The repo consumes reusable meadow area and WebGL renderer kits from `LuminaryLabs-Agents/NexusRealtime-ProtoKits` through CDN manifest imports.

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create ARRIVAL_MEADOW_CONFIG through meadow-area-kit
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time) returns meadow-area render plan
  -> enhanceRenderPlan(rawPlan) adds grass, wind, post-process, performance, outline, and stats descriptors
  -> renderer.render(enhancedPlan)
  -> GameHost exposes state, snapshot, diagnostics, latest enhanced render plan, and renderer snapshot
```

## Target proof loop

```txt
requestAnimationFrame(frame)
  -> build ActionFrame from tick input and optional actions
  -> reduce path-progress and inspect actions into ActionResult records
  -> resolve objective completion from ARRIVAL_OBJECTIVES
  -> update progression, action journal, and gameplay diagnostics
  -> create snapshot.gameplay
  -> enhanceRenderPlan(rawPlan)
  -> compare enhanced plan descriptors with renderer snapshot consumption
  -> create RenderDescriptorParityResult
  -> expose GameHost.getDiagnostics().renderParity
  -> expose GameHost.getSnapshot().gameplay and GameHost.getSnapshot().renderParity
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

### Game composition domains

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

### Gameplay domains

```txt
player-state
path-progress-state
objective-ledger
story-beat-ledger
interaction-target-registry
ActionFrame-contract-needed
ActionResult-contract-needed
objective-reducer-needed
inspect-target-reducer-needed
path-progress-reducer-needed
gameplay-snapshot-needed
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
renderer-descriptor-parity-needed
```

## Kit service inventory

### External kits

```txt
meadow-area-kit
  source: CDN import from NexusRealtime-ProtoKits
  services:
    - createMeadowAreaKit(config)
    - getRenderPlan({ time })
    - getSnapshot()
    - validate()

meadow-webgl-render-kit
  source: CDN import from NexusRealtime-ProtoKits
  services:
    - createMeadowWebglRenderKit({ canvas })
    - render(plan)
    - getSnapshot()
```

### Local active kits / DSKs

```txt
grass-density-texture-kit
  services: create density texture descriptor, expose resolution/world bounds/channels, validate density descriptor

grass-clump-archetype-kit
  services: create 64-card clump archetype descriptors, validate archetype set

grass-static-batch-kit
  services: convert archetypes into reusable static batch descriptors, validate batch list

grass-patch-placement-kit
  services: place texture-driven grass patches from area/path density, validate patch descriptors

grass-clump-instancing-render-kit
  services: derive drawGroups from patches/static batches, validate instance group counts

grass-shader-wind-kit
  services: convert wind state into shader wind uniforms/metadata, validate wind binding descriptor

grass-lod-policy-kit
  services: create distance/quality LOD policy descriptors, validate policy

grass-density-scaling-kit
  services: derive density scale from quality/performance profile

grass-debug-visualization-kit
  services: summarize density, batch, patch, and drawGroup debug data

wind-field-dsk
  services: normalize wind state for render metadata

tree-object-dsk
  services: enhance focal tree render descriptor and style

meadow-performance-dsk
  services: create quality profile, budgets, and outline policy

post-process-stack-dsk
  services: create Sobel/color/fog/vignette style pass descriptors
```

### Next-cut kits

```txt
renderer-descriptor-expectation-kit
renderer-snapshot-consumption-kit
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
gamehost-render-parity-diagnostics-kit
ActionFrame-contract-kit
ActionResult-contract-kit
ActionReason-catalog-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-reducer-kit
gameplay-snapshot-kit
gameplay-fixture-replay-kit
```

## Main finding

The repo should not add new visual content yet.

The current source already emits high-fidelity meadow descriptors, but the proof chain is incomplete:

```txt
enhanceRenderPlan()
  -> emits grassSystem / windField / postProcess / performance / stats
  -> web-host.js passes enhanced plan into renderer.render(plan)
  -> GameHost exposes last plan and renderer snapshot
  -> no stable renderParity result exists
```

The gameplay proof chain is also incomplete:

```txt
game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame + 1 and lastTick only
  -> no ActionFrame
  -> no ActionResult
  -> no objective reducer
  -> no snapshot.gameplay
```

## Next safe ledge

Build the **Renderer Parity + ActionFrame Fixture Implementation Map** in source order:

```txt
1. Add render-parity fixture modules and tests.
2. Project renderParity into GameHost diagnostics/snapshot without breaking existing GameHost shape.
3. Add ActionFrame / ActionResult records as optional tick input.
4. Reduce path-progress and inspect actions into deterministic objective state.
5. Add snapshot.gameplay.
6. Add gameplay fixture smoke to npm run check.
```

## Validation note

No runtime source files changed in this pass.

No local build, package command, browser check, external renderer validation, Pages check, or screenshot check was run from this connector-only documentation pass.
