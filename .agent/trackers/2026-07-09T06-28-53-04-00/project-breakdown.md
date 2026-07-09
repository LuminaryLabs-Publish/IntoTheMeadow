# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Goal

Break down `LuminaryLabs-Publish/IntoTheMeadow`, refresh root `.agent` docs, identify interaction loop/domains/services/kits, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Selection checklist

```txt
[x] Full accessible LuminaryLabs-Publish repo list checked.
[x] Central LuminaryLabs-Dev/LuminaryLabs ledger compared.
[x] TheCavalryOfRome excluded.
[x] No new, ledger-absent, root-agent-missing, or undocumented non-Cavalry repo selected first.
[x] IntoTheMeadow selected as oldest eligible documented fallback.
[x] Only one repo selected.
[x] Updates pushed only to main.
```

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central latest before this pass 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T05-51-49-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-30-27-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
```

## Interaction loop

```txt
index.html
  -> boot-game.js
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

## Services that the kits offer

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
outline policy service
tiny clutter budget service
grass density texture service
grass archetype service
grass static batch service
grass patch placement service
grass instancing draw group service
grass shader wind service
grass LOD policy service
grass density scale service
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

```txt
External:
- meadow-area-kit
- meadow-webgl-render-kit

Local source descriptors:
- GAME_MANIFEST
- ARRIVAL_MEADOW_CONFIG
- STORY_BEATS
- ARRIVAL_OBJECTIVES
- ARRIVAL_INTERACTION_TARGETS

Local/fallback runtime kits:
- fallback-meadow-area-kit
- createIntoTheMeadowGame
- installDsks
- exposeGameHost

Local DSK descriptors:
- into-the-meadow-game-dsk
- web-host-dsk
- game-composition-dsk
- meadow-area-bridge-dsk
- meadow-terrain-texture-dsk
- path-corridor-dsk
- grass-patch-dsk
- gpu-grass-render-dsk
- wind-field-dsk
- tree-object-dsk
- meadow-scatter-dsk
- meadow-atmosphere-dsk
- meadow-player-dsk
- meadow-camera-dsk
- meadow-input-dsk
- meadow-interaction-dsk
- meadow-story-dsk
- meadow-objective-dsk
- meadow-ecology-dsk
- meadow-audio-dsk
- meadow-ui-dsk
- meadow-save-dsk
- meadow-diagnostics-dsk
- meadow-performance-dsk
- meadow-render-host-dsk
- post-process-stack-dsk
- render-target-kit
- sobel-outline-pass-kit
- color-grade-pass-kit
- depth-fog-pass-kit
- vignette-pass-kit
- final-composite-pass-kit
- static-pages-deploy-dsk

Implemented render/grass imports:
- tree-object-dsk
- wind-field-dsk
- meadow-performance-dsk
- post-process-stack-dsk
- grass-density-texture-kit
- grass-clump-archetype-kit
- grass-static-batch-kit
- grass-patch-placement-kit
- grass-clump-instancing-render-kit
- grass-shader-wind-kit
- grass-lod-policy-kit
- grass-density-scaling-kit
- grass-debug-visualization-kit
```

## Main finding

`IntoTheMeadow` already has the descriptors needed for a stronger proof layer.

The render side has a rich enhanced plan, but no expected-vs-consumed renderer parity report.

The gameplay side has objectives and interaction targets, but no `ActionFrame -> ActionResult -> snapshot.gameplay` replay path.

## Next safe ledge

```txt
IntoTheMeadow Render Readback + Action Replay Proof Freeze Fixture Gate
```

## Required next implementation files

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/create-render-parity-report.js
src/render-parity/create-grass-consumption-rows.js
src/gameplay/create-action-frame.js
src/gameplay/create-action-result.js
src/gameplay/action-result-reasons.js
src/gameplay/reduce-path-progress-action.js
src/gameplay/reduce-inspect-target-action.js
src/gameplay/resolve-objective-completion.js
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

## Validation

```txt
documentation-only: yes
runtime source changed: no
local npm run check: no
browser smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
