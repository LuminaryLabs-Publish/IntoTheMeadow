# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Goal

Refresh the internal repo docs for one eligible `LuminaryLabs-Publish` project, keep the work on `main`, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Selection checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repositories through the installed GitHub app.
- [x] Compared the Publish list against `LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*`.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Checked for new, missing-ledger, root-agent-missing, or otherwise undocumented Publish repos.
- [x] Found no non-Cavalry repo that was fully new or missing central tracking.
- [x] Selected `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible central-ledger fallback.
- [x] Kept scope to one repo.
- [x] Created this timestamped tracker.
- [x] Planned root `.agent` docs, turn ledger, architecture/render/grass/gameplay/interaction/deploy audits, and central ledger sync.

## Publish organization repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central-ledger fallback / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T11-46-08-04-00
```

## Current product read

`IntoTheMeadow` is a static browser meadow exploration route. It is descriptor-rich and DSK-composed, but the runtime is still mostly a source/projection shell rather than an interactive game loop.

The browser route imports external meadow area and WebGL renderer kits from CDN, installs local DSK descriptors, creates an arrival meadow render plan, enhances that plan with local grass/wind/postprocess/performance descriptors, renders it, and exposes partial diagnostic state through `GameHost`.

## Interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> create meadow WebGL renderer
  -> exposeGameHost({ game, renderer, getRenderPlan, getSnapshot })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> createGrassSystem() produces texture-driven grass descriptors
  -> renderer.render(enhancedPlan)
  -> optional debug HUD reports validation/object/grass/render counts
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and optional renderer snapshot
```

## Domains in use

```txt
static-browser-route
boot-dom-adapter
web-host-orchestration
external-kit-source-authority
manifest-source-authority
DSK-install-validation
meadow-area-source-descriptor
fallback-meadow-area-descriptor
arrival-meadow-content
story-beat-descriptors
objective-descriptors
interaction-target-descriptors
game-state-frame-tick
snapshot-projection
diagnostics-projection
render-plan-enhancement
renderer-consumer-boundary
renderer-readback-projection
tree-object-style-policy
wind-field-descriptor
postprocess-stack-descriptor
performance-budget-policy
outline-style-policy
terrain-texture-descriptors
path-corridor-descriptors
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-instanced-draw-group
grass-shader-wind
grass-LOD-policy
grass-density-scaling
grass-debug-visualization
GameHost-legacy-projection
static-smoke-validation
planned-render-consumption-ledger
planned-grass-consumption-ledger
planned-action-result-ledger
planned-objective-progress-ledger
planned-DOM-free-fixture-gate
```

## Services the kits offer

```txt
GAME_MANIFEST -> route, public URL, default scene, build id, and external kit URLs.
loadExternalKits() -> dynamic CDN import for meadow-area-kit and meadow-webgl-render-kit.
startWebHost() -> DOM, game, renderer, frame loop, debug HUD, loading state, and GameHost wiring.
createIntoTheMeadowGame() -> content composition, DSK install, state ownership, meadow kit creation, render-plan access, diagnostics, snapshot, tick, and reset.
installDsks() -> local/external DSK registry validation and snapshotting.
createFallbackMeadowAreaKit() -> fallback render plan, validation, and snapshot if external area kit is absent.
enhanceRenderPlan() -> object filtering, tree styling, wind, postprocess, performance, grass, and render stats.
createGrassSystem() -> density texture, archetypes, static batches, patch placement, draw groups, shader wind, LOD, density scale, debug summary, and validation.
createInitialGameState() -> immutable initial scene/player/world/progression/dsk state.
advanceGameState() -> current frame/lastTick advance only.
createGameSnapshot() -> manifest/state/renderPlan/diagnostics projection.
validateGameSnapshot() -> minimal snapshot shape validation.
exposeGameHost() -> browser-facing state/snapshot/diagnostics/game reference.
renderer.render(plan) -> external render consumption with no local consumption ledger yet.
renderer.getSnapshot?.() -> optional renderer readback exposed but not classified.
```

## Kits identified

```txt
External kits:
- meadow-area-kit
- meadow-webgl-render-kit

Implemented local kits / descriptors:
- game-manifest descriptor
- local-dsk-registry
- DSK install validator
- into-the-meadow-game composition kit
- web-host kit
- fallback-meadow-area-kit
- arrival-meadow descriptor
- story-beats descriptor
- arrival-objectives descriptor
- arrival-interaction-targets descriptor
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

Planned next-cut proof kits:
- expected-render-descriptor-kit
- renderer-snapshot-normalizer-kit
- render-consumption-row-kit
- render-consumption-ledger-kit
- grass-readback-row-kit
- grass-consumption-ledger-kit
- action-frame-kit
- target-action-preflight-kit
- action-result-kit
- action-result-reason-kit
- action-journal-kit
- path-progress-reducer-kit
- inspect-target-reducer-kit
- objective-completion-resolver-kit
- gameplay-snapshot-projection-kit
- GameHost-render-parity-projection-kit
- GameHost-gameplay-proof-projection-kit
- DOM-free-fixture-manifest-kit
- npm-check-fixture-gate-kit
```

## Main finding

`IntoTheMeadow` should not receive a visual expansion pass next. The descriptor stack is already rich enough; the missing value is proof that descriptor producers and consumers agree.

The immediate implementation should add source-owned render/grass consumption rows and source-owned gameplay action/result rows, then expose them additively through `GameHost` and prove them through DOM-free fixtures wired into `npm run check`.

## Next safe ledge

```txt
IntoTheMeadow Render Consumption + Gameplay Action Fixture Gate
```

## Validation note

This is a documentation and ledger pass. Runtime source was inspected but not modified. No local npm, browser, or Pages smoke ran in this connector-only pass.
