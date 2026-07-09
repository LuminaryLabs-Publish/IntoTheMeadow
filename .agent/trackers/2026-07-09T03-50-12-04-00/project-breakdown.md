# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Plan ledger

**Goal:** Refresh one eligible Publish repo’s internal docs, identify its interaction loop, domains, services, and kits, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

**Checklist:**

- [x] Read the accessible `LuminaryLabs-Publish` repo list.
- [x] Compared the Publish list against the central ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read source anchors and existing `.agent` files.
- [x] Identified the active interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added timestamped architecture, render, grass-system, gameplay, interaction, deploy, tracker, and turn-ledger entries.
- [x] Updated `LuminaryLabs-Dev/LuminaryLabs` central ledger and internal change log.
- [x] Pushed only to `main`.

## Selected repo

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Selection result

No checked non-Cavalry Publish repo was new, absent from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`IntoTheMeadow` was selected because repo-local `.agent` state had advanced beyond central tracking and the unresolved source proof boundary is still high-value:

```txt
render descriptors exist
renderer readback exists only as raw/sparse snapshot
gameplay descriptors exist
advanceGameState does not consume actions
fixtures do not prove either surface
```

## Publish repository list observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/IntoTheMeadow        selected / central catch-up + unresolved proof seam
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
```

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> create meadow WebGL renderer
  -> expose GameHost state/snapshot/diagnostics/enhanced plan/render snapshot
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reports validation/object/grass/render counts
```

## Domains in use

```txt
route-shell-domain
web-host-domain
external-kit-loading-domain
game-composition-domain
manifest-domain
DSK-registry-domain
meadow-area-domain
fallback-meadow-domain
render-plan-domain
render-enhancement-domain
grass-system-domain
wind-field-domain
post-process-domain
performance-policy-domain
render-host-domain
gameplay-state-domain
objective-domain
interaction-target-domain
diagnostics-domain
deploy-validation-domain
```

## Services identified

```txt
manifest route service
external kit URL service
external kit import service
game factory service
fallback meadow render-plan service
DSK registry service
DSK validation service
meadow area render-plan service
render-plan enhancement service
grass density texture service
grass archetype service
grass static-batch service
grass patch-placement service
grass instancing draw-group service
grass shader-wind service
grass LOD policy service
grass density-scaling service
grass debug summary service
wind-field descriptor service
post-process descriptor service
performance policy service
tick state service
game snapshot service
diagnostics service
GameHost exposure service
```

## Kits identified

### Current active/source-backed kits

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
arrival-meadow content descriptor
story-beats descriptor
arrival-objectives descriptor
arrival-interaction-targets descriptor
fallback-meadow-area-kit
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

### Next-cut proof kits

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
renderer-snapshot-absence-adapter-kit
render-descriptor-parity-kit
render-parity-report-kit
render-parity-diagnostics-projection-kit
grass-consumption-row-kit
grass-readback-classifier-kit
action-frame-kit
action-result-kit
action-result-reason-kit
action-journal-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
GameHost-gameplay-diagnostics-kit
fixture-manifest-row-kit
render-parity-fixture-smoke-kit
gameplay-action-replay-fixture-smoke-kit
check-script-fixture-gate-kit
```

## Main finding

`IntoTheMeadow` is descriptor-rich but proof-limited.

The render path emits rich grass, wind, post-process, performance, and outline descriptors, but there is no source-owned parity report proving what the renderer consumed.

The gameplay path has objective and interaction descriptors, but `advanceGameState()` still only increments frame and `lastTick`.

## Next safe ledge

```txt
IntoTheMeadow Render Readback Parity + Action Result Replay Fixture Gate
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T03-50-12-04-00-render-readback-action-result-dsk-map.md
.agent/render-audit/2026-07-09T03-50-12-04-00-render-readback-parity-contract.md
.agent/grass-system-audit/2026-07-09T03-50-12-04-00-grass-consumer-row-freeze.md
.agent/gameplay-audit/2026-07-09T03-50-12-04-00-action-result-replay-loop.md
.agent/interaction-audit/2026-07-09T03-50-12-04-00-target-action-result-contract.md
.agent/deploy-audit/2026-07-09T03-50-12-04-00-fixture-check-gate-map.md
.agent/trackers/2026-07-09T03-50-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T03-50-12-04-00.md
```

## Central repo changes

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-09T03-50-12-04-00-into-the-meadow-render-readback-action-result.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
pushed to main: yes
```
