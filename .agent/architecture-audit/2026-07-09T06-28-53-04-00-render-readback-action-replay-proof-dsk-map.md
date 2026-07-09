# Architecture Audit — Render Readback + Action Replay Proof DSK Map

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Selection

`IntoTheMeadow` was selected as the oldest eligible non-Cavalry Publish repo after the accessible Publish list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No new, missing, ledger-absent, root-agent-missing, or otherwise undocumented non-Cavalry repo was found in the checked list.

## Product architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load GAME_MANIFEST.externalKits
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks({ externalKits })
  -> create arrival meadow area kit
  -> expose GameHost
  -> animation frame loop
```

## Interaction loop

```txt
requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD writes validation/object/grass/render counts
  -> GameHost snapshot can return state, diagnostics, enhancedRenderPlan, and renderer snapshot
```

## Domains in use

```txt
route-shell-domain
web-host-domain
external-kit-loading-domain
game-composition-domain
meadow-area-domain
render-enhancement-domain
graphics-outline-policy-domain
grass-system-domain
wind-field-domain
post-process-domain
performance-policy-domain
render-host-domain
gameplay-state-domain
objective-interaction-domain
diagnostics-domain
deploy-validation-domain
```

## Current kits

### External kits

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Local active descriptors and DSKs

```txt
GAME_MANIFEST
ARRIVAL_MEADOW_CONFIG
STORY_BEATS
ARRIVAL_OBJECTIVES
ARRIVAL_INTERACTION_TARGETS
fallback-meadow-area-kit
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
static-pages-deploy-dsk
```

### Local render/grass kits consumed by `enhanceRenderPlan`

```txt
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
```

## Services offered by current kits

```txt
manifest route service
external kit URL service
external kit import service
fallback meadow render-plan service
DSK registry and validation service
meadow area render-plan service
render-plan enhancement service
outline policy service
tiny-clutter budget service
grass density texture service
grass archetype/static-batch/placement/instancing service
grass shader wind / LOD / density-scale / debug service
wind-field descriptor service
post-process descriptor service
performance policy service
game tick state service
game snapshot service
diagnostics service
GameHost exposure service
```

## Next-cut DSK map

```txt
render-readback-proof-domain
  -> render-parity-reason-kit
  -> expected-render-descriptor-kit
  -> renderer-snapshot-consumption-kit
  -> renderer-snapshot-absence-adapter-kit
  -> render-descriptor-parity-kit
  -> render-parity-report-kit
  -> render-parity-diagnostics-projection-kit

grass-consumption-proof-domain
  -> grass-consumption-row-kit
  -> grass-readback-classifier-kit
  -> grass-count-parity-kit
  -> grass-consumption-fixture-row-kit

gameplay-action-proof-domain
  -> action-frame-kit
  -> action-result-kit
  -> action-result-reason-kit
  -> action-journal-kit
  -> target-action-preflight-kit
  -> path-progress-reducer-kit
  -> inspect-target-reducer-kit
  -> objective-completion-resolver-kit
  -> gameplay-snapshot-kit

fixture-gate-domain
  -> fixture-manifest-row-kit
  -> render-parity-fixture-smoke-kit
  -> gameplay-action-replay-fixture-smoke-kit
  -> check-script-fixture-gate-kit
```

## Main architecture finding

The architecture is already split enough to support an additive proof pass.

The next implementation should not move renderer systems or rewrite visuals.

The correct next cut is a thin proof layer between the enhanced plan, renderer snapshot, objective descriptors, target descriptors, and host snapshot readback.

## Acceptance shape

```txt
EnhancedRenderPlan
  -> ExpectedRenderDescriptor[]
  -> RendererConsumptionSnapshot
  -> RenderParityReport
  -> GrassConsumptionRow[]
  -> GameHost.renderParity

ActionFrame
  -> TargetActionPreflight
  -> ActionResult[]
  -> ObjectiveCompletionLedger
  -> snapshot.gameplay
```
