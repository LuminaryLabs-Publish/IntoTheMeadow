# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T03-35-07-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Central tracking repo:** `LuminaryLabs-Dev/LuminaryLabs`

## Selection result

The accessible `LuminaryLabs-Publish` organization repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No non-Cavalry Publish repo was found to be new, absent from the ledger, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible central-alignment fallback after the latest same-night ledger catch-up passes.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central alignment 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-20-01-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
```

## Current product read

`IntoTheMeadow` is a static browser meadow exploration game. It is intentionally a publishable app shell plus local proof kits, not the permanent location for shared renderer or terrain systems.

The route starts at `index.html`, loads `src/boot/boot-game.js`, then calls `startWebHost()` from `src/hosts/web-host.js`.

The host loads two external CDN kits from `GAME_MANIFEST.externalKits`:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

The game factory installs local DSK descriptors, creates an arrival meadow kit, exposes diagnostics and snapshots, and gives the host a render plan for each frame.

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks(...) builds local DSK descriptor registry
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reads diagnostics and render counts
  -> GameHost exposes state, snapshot, diagnostics, enhancedRenderPlan, and renderer snapshot
```

## Domains in use

```txt
route-shell-domain
  owns index.html, canvas, HUD shell, loading surface

web-host-domain
  owns DOM capture, external kit loading, frame loop, render invocation, debug HUD, GameHost exposure

game-composition-domain
  owns game factory, manifest binding, local DSK installation, content descriptors, diagnostics, snapshot hooks

meadow-area-domain
  owns arrival meadow config, external meadow-area-kit adapter, fallback meadow-area-kit

render-enhancement-domain
  owns local descriptor enrichment before renderer consumption

grass-system-domain
  owns density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD, density scaling, and debug summaries

render-host-domain
  owns external meadow-webgl-render-kit invocation and renderer snapshot readback

gameplay-domain
  owns initial state, frame ticking, player placeholder state, progression descriptors, and future action results

objective-interaction-domain
  owns walk-the-path and inspect-tree descriptors

diagnostics-domain
  owns DSK validation, plan validation, counts, and content diagnostics

deploy-domain
  owns package check scripts and static Pages-friendly route shape
```

## Services offered by kits

```txt
meadow-area-kit
  render-plan generation, area feature projection, validation, area snapshot

meadow-webgl-render-kit
  canvas renderer construction, render(plan), renderer snapshot/readback when available

local-dsk-registry
  DSK descriptor creation, validation, layered service metadata, snapshot projection

fallback-meadow-area-kit
  minimal render plan, fallback objects, fallback validation, fallback snapshot

tree-object-dsk
  focal-tree enhancement, outline policy binding

wind-field-dsk
  wind state, sampler-facing state, shader wind consumer input

meadow-performance-dsk
  profile, object budgets, outline policy, quality budget

post-process-stack-dsk
  post-process descriptor stack, validation, render-plan metadata

grass-density-texture-kit
  density texture model, channels, world bounds, density validation

grass-clump-archetype-kit
  clump family/card archetypes, card-count policy, validation

grass-static-batch-kit
  static batch creation, batch validation, atlas/material descriptor surface

grass-patch-placement-kit
  patch grid, density-driven placement, instance buffers, placement validation

grass-clump-instancing-render-kit
  draw group creation, instance stream descriptors, draw validation

grass-shader-wind-kit
  wind uniforms, bend/phase descriptors, wind validation

grass-lod-policy-kit
  LOD bands, terrain tint/far policy, LOD validation

grass-density-scaling-kit
  quality/profile scaling, density multiplier, validation

grass-debug-visualization-kit
  density/patch/instance/debug summary rows
```

## Kits identified

### Current explicit kits

```txt
meadow-area-kit
meadow-webgl-render-kit
fallback-meadow-area-kit
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
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

### Next-cut proof kits

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
descriptor-consumption-row-kit
grass-consumption-row-kit
render-parity-report-kit
gamehost-render-parity-projection-kit
action-frame-kit
action-result-kit
action-journal-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-projection-kit
fixture-row-manifest-kit
render-parity-fixture-smoke-kit
gameplay-action-replay-fixture-smoke-kit
```

## Main finding

`IntoTheMeadow` should not receive more visual content, meadow placement work, external renderer extraction, or content expansion next.

The blocker is proofability at two consumer seams:

```txt
render plan descriptors -> external renderer consumption/readback
gameplay descriptors -> ActionResult/objective/snapshot.gameplay records
```

`src/hosts/web-host.js` already has the correct splice point after `renderer.render(plan)`, and `src/game/game-state.js` already has a safe reducer seam. The next implementation should freeze these seams additively instead of rewriting the route.

## Next safe ledge

```txt
IntoTheMeadow RenderParity + Gameplay Source Contract Freeze
```

## Validation state

This was a documentation-only breakdown pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
GitHub Pages check: no
pushed to main: yes
```
