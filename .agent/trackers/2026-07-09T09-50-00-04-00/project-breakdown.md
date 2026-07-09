# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T09-50-00-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Central ledger repo:** `LuminaryLabs-Dev/LuminaryLabs`

## Plan ledger

**Goal:** Refresh the repo-local `.agent` operating docs for `IntoTheMeadow`, keep the central ledger aligned, and lock the next implementation ledge around render-consumption readback and gameplay action replay instead of new meadow visuals.

**Checklist:**

- [x] Compare the accessible `LuminaryLabs-Publish` repo list against central ledger state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select exactly one repo.
- [x] Inspect repo-local `.agent` state.
- [x] Inspect runtime entry, host, game factory, state, snapshot, render enhancer, manifest, DSK registry, objectives, and interaction targets.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify services offered by current kits.
- [x] Identify all current and next-cut kits.
- [x] Update required root `.agent` files.
- [x] Add timestamped tracker and turn-ledger entries.
- [x] Add architecture, render, grass-system, gameplay, interaction, and deploy audits.
- [x] Update the central `LuminaryLabs-Dev/LuminaryLabs` ledger and internal change log.
- [x] Push only to `main`.

## Selection result

Selected repo:

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing sampled root `.agent/START_HERE.md` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by rule.

`IntoTheMeadow` was selected because it was the oldest eligible central-ledger fallback among the checked non-excluded repos and because the previous repo-local state had advanced to a partial `2026-07-09T09-41-24-04-00` refresh without the matching central-ledger alignment and timestamped audit files.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central-ledger fallback / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / not selected
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / not selected
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / not selected
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / not selected
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / not selected
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / not selected
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / not selected
LuminaryLabs-Publish/TheCavalryOfRome     excluded by standing rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / not selected
```

## Current product read

`IntoTheMeadow` is a static browser meadow route built as a DSK-composed visual proof. The shipped browser path is:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> external meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
```

The current route is descriptor-rich. The next useful work is not a visual expansion. It is a source-owned proof layer that can say which render descriptors, grass descriptors, action rows, target rows, and objective rows were consumed or ignored.

## Interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading text
  -> src/boot/boot-game.js reads DOM nodes and debug query flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks validates local DSK registry and external kit presence
  -> create arrival meadow area kit
  -> create external meadow WebGL renderer
  -> expose GameHost with state, snapshot, diagnostics, game, enhanced plan, and optional render snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reports validation/object/patch/vertex counts
```

## Domains in use

```txt
static browser shell
boot DOM adapter
web host orchestration
external kit import authority
manifest / external CDN kit source authority
local DSK registry
DSK install validation
meadow area descriptor source
fallback meadow area descriptor source
game state root
tick state / frame clock
snapshot projection
diagnostics projection
render plan enhancement
renderer consumer boundary
render readback projection through renderer.getSnapshot?.()
terrain texture descriptor domain
path corridor descriptor domain
grass density texture domain
grass clump archetype domain
grass static batch domain
grass patch placement domain
grass instanced draw-group domain
grass shader wind domain
grass LOD policy domain
grass density scaling domain
grass debug visualization domain
wind field domain
tree object styling domain
meadow scatter descriptor domain
postprocess stack domain
performance budget policy domain
object outline/style policy domain
story beat descriptor domain
objective descriptor domain
interaction target descriptor domain
GameHost projection domain
static Pages/check-script validation domain
planned render-consumption ledger domain
planned grass-consumption ledger domain
planned action-result reducer domain
planned objective completion resolver domain
planned DOM-free fixture replay domain
```

## Services that the kits offer

```txt
GAME_MANIFEST -> route, public URL, build id, default scene, external kit URLs
loadExternalKits() -> imports meadow-area-kit and meadow-webgl-render-kit modules
startWebHost() -> wires DOM, game, renderer, frame loop, debug HUD, and GameHost exposure
createIntoTheMeadowGame() -> installs DSKs, creates meadow source kit, owns state, exposes render plan and diagnostics
installDsks() -> validates local descriptors and external kit load/defer status
createFallbackMeadowAreaKit() -> produces minimal render plan when external meadow kit is absent
enhanceRenderPlan() -> adds grass system, wind field, postprocess, performance policy, render styles, and stats
createGrassSystem() -> creates density texture, clump archetypes, static batches, patches, draw groups, shader wind, LOD, density scale, and debug summary
advanceGameState() -> increments frame and lastTick only
createGameSnapshot() -> projects manifest, state, renderPlan, and diagnostics
validateGameSnapshot() -> validates minimal snapshot shape
exposeGameHost() -> exposes build, state, snapshot, diagnostics, and raw game reference
renderer.render(plan) -> consumes enhanced render plan but is not locally classified yet
renderer.getSnapshot?.() -> optional render readback exposed through GameHost snapshot but not normalized into a parity ledger yet
```

## Current kits

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
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

## Next-cut kits

```txt
expected-render-descriptor-kit
renderer-snapshot-normalizer-kit
render-consumption-row-kit
render-consumption-ledger-kit
grass-readback-row-kit
grass-consumption-ledger-kit
action-frame-kit
action-result-kit
action-result-reason-kit
target-action-preflight-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-projection-kit
GameHost-render-parity-projection-kit
GameHost-gameplay-proof-projection-kit
DOM-free-fixture-manifest-kit
render-consumption-fixture-smoke-kit
gameplay-action-replay-fixture-smoke-kit
check-script-fixture-gate-kit
```

## Main finding

`IntoTheMeadow` has enough render descriptors and enough gameplay descriptors to support meaningful fixture proof, but it does not yet have a consumer ledger. `enhanceRenderPlan()` emits grass, wind, postprocess, performance, outline/style, stats, patches, batches, draw groups, and estimated counts. `ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define `path-progress` and `inspect`, but `advanceGameState()` only increments frame and `lastTick`.

The next code pass should add pure render-consumption and gameplay-action fixture modules before adding new meadow content, changing external CDN kits, replacing the renderer, or expanding visuals.

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Ledger + Action Replay Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
DOM-free fixture run: no, fixture files do not exist yet
pushed to main: yes
```
