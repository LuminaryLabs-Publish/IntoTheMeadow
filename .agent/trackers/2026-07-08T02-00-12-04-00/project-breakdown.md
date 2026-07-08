# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Selection ledger

### Goal

Compare the full `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, then update one eligible repo with missing or incomplete root `.agent` operating state.

### Checklist

- [x] Listed `LuminaryLabs-Publish` repos visible to the GitHub connector.
- [x] Compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger/search results.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Checked repo-local `.agent/START_HERE.md` for the selected repo.
- [x] Selected `LuminaryLabs-Publish/IntoTheMeadow` because root `.agent/START_HERE.md` was missing while the central ledger referenced repo-local agent paths.
- [x] Added root `.agent` start and audit docs.
- [x] Logged the renderer and grass-system gaps.
- [x] Added this timestamped tracker entry.
- [x] Added a central internal change-log entry.

## Full Publish repo list checked

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
TheUnmappedHouse
MyCozyIsland
TheOpenAbove
PhantomCommand
TheCavalryOfRome
PrehistoricRush
```

## Chosen repo

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Why this repo won

`IntoTheMeadow` was present in the central ledger, but the actual repository did not have root `.agent/START_HERE.md` when checked at the start of this run.

Because the current scheduled prompt prioritizes repos that are new, absent from the ledger, missing `.agent` audit state, or recently added but undocumented before falling back to oldest eligible selection, `IntoTheMeadow` was the correct target.

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> GameHost exposes state/snapshot/diagnostics/render plan/renderer snapshot
```

## Domains in use

```txt
static-browser-shell
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
GameHost-contract
canvas-render-surface
debug-hud-runtime
manifest-authority
game-factory
local-dsk-registry
local-dsk-descriptor-installer
local-dsk-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
deterministic-state-root
snapshot-root
diagnostics-contract
arrival-meadow-content
path-content
focal-tree-content
story-beat-ledger
objective-ledger
interaction-target-registry
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
static-smoke-validation
pages-deployment
```

## Services identified

```txt
load-external-kits
start-web-host
create-into-the-meadow-game
create-fallback-meadow-area-kit
install-dsks
validate-local-dsks
create-dsk-descriptor
create-initial-game-state
advance-game-state
create-game-snapshot
get-render-plan
get-diagnostics
reset-state
expose-game-host
enhance-render-plan
reduce-tiny-clutter
apply-outline-policy
enhance-focal-tree
create-wind-field
create-post-process-stack
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-instancing-draw-groups
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
validate-render-plan
run-static-smoke
run-dsk-registry-smoke
run-render-plan-smoke
run-deterministic-scene-smoke
```

## Kits identified

External:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Local required v0.1:

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

Additional local descriptor/planned inventory:

```txt
meadow-terrain-texture-dsk
path-corridor-dsk
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
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
```

## Current finding

The game repo has the right high-level split and a useful render-plan enhancement seam.

The most important next change is not adding more static meadow metadata. The next change is making the reusable external renderer consume the enhanced descriptors as real meadow systems.

## Files added this run

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-cutover-audit.md
.agent/render-audit/meadow-renderer-gap-audit.md
.agent/grass-system-audit/texture-driven-grass-system.md
.agent/trackers/2026-07-08T02-00-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-00-12-04-00.md
```

## Validation

No runtime code changed.

No local checks were run in this connector-only pass.

Next validation command:

```bash
npm run check
```

## Next safe ledge

```txt
Update meadow-webgl-render-kit so renderer.render(plan) consumes plan.grassSystem and plan.postProcess as real renderer systems.
```