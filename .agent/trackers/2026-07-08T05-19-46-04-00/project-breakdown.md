# Project Breakdown — IntoTheMeadow Renderer Descriptor Consumption Parity

**Timestamp:** `2026-07-08T05:19:46-04:00`

## Selected repo

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Selection reason

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry repo was fully new, absent from the ledger, or missing root `.agent/START_HERE.md` state.

`IntoTheMeadow` was selected by fallback follow-up because its renderer descriptor-consumption parity remains the highest-value unresolved proof seam for this repo.

Excluded:

```txt
LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival meadow area
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> expose state, snapshot, diagnostics, enhanced plan, and renderer snapshot through GameHost
```

## Domains in use

```txt
static-browser-shell
browser-boot-runtime
web-host-runtime
external-kit-loading
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
manifest-authority
game-factory
content-pack-authority
local-dsk-registry
local-dsk-descriptor-installer
external-meadow-area-bridge
external-webgl-render-bridge
deterministic-state-root
arrival-meadow-area
arrival-path-content
focal-tree-content
story-beat-ledger
objective-ledger
interaction-target-registry
render-plan-generation
render-plan-enhancement
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
renderer-descriptor-consumption-parity
renderer-unsupported-descriptor-reason-catalog
fixture-replay-domain
```

## Services that kits offer

Current services:

```txt
load-external-kits
start-web-host
create-game
create-renderer
expose-game-host
run-frame-loop
advance-game-state
create-game-snapshot
get-render-plan
enhance-render-plan
get-diagnostics
reset-state
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-instancing-draw-groups
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
create-post-process-stack
create-wind-field
```

Needed services:

```txt
collect-expected-render-descriptors
collect-renderer-snapshot-consumption
compare-render-descriptor-parity
classify-unsupported-render-descriptor
report-grass-drawgroup-parity
report-post-process-parity
project-render-parity-to-GameHost
run-render-parity-fixture
```

## Kits identified

External:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Active local descriptors/kits:

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
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
wind-field-dsk
tree-object-dsk
post-process-stack-dsk
static-pages-deploy-dsk
```

Needed next-cut kits:

```txt
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
grass-drawgroup-consumption-kit
post-process-pass-consumption-kit
gamehost-render-parity-diagnostics-kit
renderer-parity-fixture-kit
```

## Findings

```txt
- The game repo emits high-fidelity render descriptors.
- enhanceRenderPlan() already creates grassSystem, drawGroups, shaderWind, LOD, postProcess, performance, and render stats.
- web-host.js sends the enhanced plan into renderer.render(plan).
- GameHost exposes the enhanced plan and renderer snapshot.
- The missing proof is consumed/unconsumed descriptor parity between plan and renderer snapshot.
- Gameplay action/reducer authority is still thin, but renderer parity is the safer next proof because visual quality depends on it.
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-cutover-audit.md
.agent/render-audit/meadow-renderer-gap-audit.md
.agent/renderer-consumption-audit/descriptor-consumption-parity.md
.agent/kit-registry.json
.agent/trackers/2026-07-08T05-19-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-19-46-04-00.md
```

## Validation

Performed:

```txt
GitHub repository list read
central ledger search/read
repo-local source read
repo-local .agent read/write
```

Not performed:

```txt
local checkout
npm run check
browser route check
GitHub Pages check
visual screenshot check
runtime source edit
ProtoKits renderer edit
```

## Next safe ledge

```txt
IntoTheMeadow Renderer Descriptor Consumption Parity Fixture Gate
```

Build a DOM-free parity fixture and GameHost diagnostics projection that compares enhanced render-plan descriptors to renderer snapshot fields. Do this before adding more meadow content, first-person controls, audio, saves, or new gameplay objectives.
