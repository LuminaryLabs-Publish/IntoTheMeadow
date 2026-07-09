# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current state

`IntoTheMeadow` is a static browser game route that boots through `src/boot/boot-game.js` into `src/hosts/web-host.js`, creates `createIntoTheMeadowGame`, enhances external meadow-area render plans through local DSK descriptors, and passes the resulting plan into the external `meadow-webgl-render-kit`.

The route should remain a publishable game/deploy repo with local proof kits. Shared meadow renderer, grass renderer, action-result, or objective resolver systems should be promoted only after this repo proves the consumer boundaries through fixtures.

## Repo-selection audit

The accessible `LuminaryLabs-Publish` repo list checked this run contained:

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

`TheCavalryOfRome` was excluded. All checked non-Cavalry repos were represented in central tracking and had sampled root `.agent` state. `IntoTheMeadow` was selected as the oldest eligible central-ledger fallback because central tracking still pointed to `2026-07-09T09-50-00-04-00`.

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
```

## Domains in use

```txt
static browser shell
boot DOM adapter
web host orchestration
external kit import authority
manifest / external kit source authority
DSK install validation
meadow area descriptor generation
fallback meadow area descriptor generation
game state / tick state
snapshot projection
diagnostics projection
render plan enhancement
renderer consumer boundary
renderer readback projection
terrain texture descriptors
path corridor descriptors
grass density texture
grass clump archetypes
grass static batch
grass patch placement
grass instanced draw groups
grass shader wind
grass LOD and scaling
grass debug visualization
postprocess descriptor policy
performance budget policy
object outline/style policy
story beat descriptors
objective descriptors
interaction target descriptors
GameHost legacy projection
planned render-consumption ledger
planned grass-consumption ledger
planned action-result reducer
planned objective completion reducer
planned DOM-free fixture replay
static Pages/check-script validation
```

## Kit services identified

```txt
loadExternalKits() -> loads meadow-area and meadow-webgl renderer kit modules from manifest URLs.
startWebHost() -> wires DOM, game, renderer, frame loop, debug HUD, loading state, and GameHost.
createIntoTheMeadowGame() -> installs DSKs, owns state, creates meadow kit, exposes render plan and diagnostics.
installDsks() -> validates local and external DSK registry surfaces.
createFallbackMeadowAreaKit() -> fallback render-plan producer for absent external area kit.
enhanceRenderPlan() -> adds grass, wind, postprocess, performance, outline/style, and stats descriptors.
createGrassSystem() -> derives density texture, archetypes, static batches, placement patches, draw groups, shader wind, LOD, scaling, and debug summary.
advanceGameState() -> currently ticks frame/lastTick only.
createGameSnapshot() -> projects game state/content/render diagnostics.
validateGameSnapshot() -> validates minimal manifest/state/render/diagnostics shape.
exposeGameHost() -> exposes build, state, snapshot, diagnostics, and game reference.
renderer.render(plan) -> consumes the enhanced plan but has no local parity ledger yet.
renderer.getSnapshot?.() -> optional readback surface exposed through GameHost snapshot but not classified yet.
```

## Main finding

The useful next change is not a meadow visual rewrite. The route already emits enough render descriptors to prove a renderer consumption contract and enough objective/target descriptors to prove a gameplay action-result contract.

The missing boundary is a DOM-free proof layer that records what the renderer consumed, what grass descriptors survived, which action rows changed state, and which objective rows completed.

## Current next safe ledge

```txt
IntoTheMeadow Render Consumption + Gameplay Action Fixture Gate
```
