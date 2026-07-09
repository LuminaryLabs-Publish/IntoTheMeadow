# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update repo-local `.agent` docs, identify loop/domains/services/kits, and log the central change in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared against `LuminaryLabs-Dev/LuminaryLabs` central repo ledger.
- [x] Sampled root `.agent/START_HERE.md` state.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read repo-local `.agent` docs.
- [x] Read source evidence from route, boot, host, game, render enhancement, state, objective, target, GameHost, and package files.
- [x] Identified interaction loop.
- [x] Identified domains.
- [x] Identified services that kits offer.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, grass-system, gameplay, interaction, deploy, tracker, and turn-ledger entries.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed only to `main`.

## Repo selected

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Selection reason

No checked non-Cavalry Publish repo was new, missing from central tracking, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`IntoTheMeadow` was selected as the oldest eligible documented fallback. Its central ledger was still at `2026-07-09T06-28-53-04-00`, while newer same-day central ledger entries were observed for the sampled catch-up repos.

## Publish repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome      excluded
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow         selected
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, and loading DOM mount
  -> src/boot/boot-game.js captures DOM nodes and debug query flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> create meadow WebGL renderer
  -> expose GameHost state/snapshot/diagnostics/enhanced render plan/render snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
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
game state / tick state
snapshot projection
diagnostics projection
render plan enhancement
renderer consumer boundary
grass density texture
grass clump archetypes
grass static batch
grass patch placement
grass instanced draw groups
grass shader wind
grass LOD and scaling
postprocess descriptor policy
performance budget policy
object outline/style policy
story beat descriptors
objective descriptors
interaction target descriptors
GameHost legacy projection
render-consumption ledger next
grass-consumption ledger next
action-result reducer next
objective completion reducer next
DOM-free fixture replay next
static Pages/check-script validation
```

## Services that kits offer

```txt
loadExternalKits: imports external meadow-area and renderer kit modules
startWebHost: wires DOM, external kits, game, renderer, frame loop, debug HUD, GameHost
createIntoTheMeadowGame: installs DSKs, creates meadow kit, exposes state/render/diagnostics/tick/reset
installDsks: validates local and external DSK registry surfaces
createFallbackMeadowAreaKit: fallback render plan producer for absent external area kit
enhanceRenderPlan: adds grass, wind, postprocess, performance, outline/style, and stats descriptors
createGrassSystem: derives density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, density scale, debug summary
advanceGameState: frame/lastTick reducer only
createGameSnapshot: snapshot projection
exposeGameHost: build/state/snapshot/diagnostics/game projection
renderer.render: enhanced render plan consumer
renderer.getSnapshot: optional render readback surface
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
meadow-render-host-dsk
meadow-diagnostics-dsk
static-pages-deploy-dsk
```

## Next-cut kits

```txt
render-expectation-collector-kit
renderer-snapshot-normalizer-kit
render-consumption-row-kit
render-consumption-ledger-kit
grass-consumption-row-kit
grass-readback-ledger-kit
action-frame-kit
action-result-kit
target-action-reason-catalog-kit
path-progress-action-reducer-kit
inspect-action-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-projection-kit
gamehost-proof-projection-kit
render-action-fixture-replay-kit
check-script-fixture-wire-kit
```

## Files changed in selected repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T09-41-24-04-00-render-consumption-action-replay-dsk-map.md
.agent/render-audit/2026-07-09T09-41-24-04-00-renderer-readback-consumer-freeze.md
.agent/grass-system-audit/2026-07-09T09-41-24-04-00-grass-consumption-fixture-contract.md
.agent/gameplay-audit/2026-07-09T09-41-24-04-00-action-result-objective-replay-loop.md
.agent/interaction-audit/2026-07-09T09-41-24-04-00-target-action-actionresult-contract.md
.agent/deploy-audit/2026-07-09T09-41-24-04-00-check-script-fixture-wire-map.md
.agent/trackers/2026-07-09T09-41-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T09-41-24-04-00.md
```

## Central repo files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-09T09-41-24-04-00-into-the-meadow-render-consumption-action-replay.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
npm run check: not run
browser smoke: not run
DOM-free fixture: not run because fixture files do not exist yet
pushed to main: yes
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Ledger + Action Replay Fixture Gate
```

Start with pure source/fixture modules. Do not change visuals, external kit URLs, route shell, or renderer implementation before consumer rows and action rows are proven.
