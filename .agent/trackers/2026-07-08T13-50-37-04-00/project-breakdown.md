# Project Breakdown Tracker — IntoTheMeadow

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T13-50-37-04-00`

## Goal

Refresh repo-local `.agent` operating state for the next eligible Publish repo, identify the current interaction loop, domains, services, and kits, and narrow the next implementation ledge into a fixture-proven renderer/gameplay cutline.

## Checklist

- [x] Read the full accessible `LuminaryLabs-Publish` repo list.
- [x] Compared the Publish repo list against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed no checked non-Cavalry repo was new, absent from the ledger, undocumented, or missing sampled root `.agent` state.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read the central ledger for `IntoTheMeadow`.
- [x] Read root `.agent` files.
- [x] Read route, host, game, state, snapshot, render-enhancement, manifest, objective, and interaction-target sources.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped grass-system audit.
- [x] Added timestamped gameplay-authority audit.
- [x] Updated required root `.agent` files.
- [x] Added this tracker entry.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change log.
- [x] Pushed directly to `main`.

## Selection reason

The oldest observed eligible fallback was `LuminaryLabs-Publish/IntoTheMeadow`.

Current observed central update order showed `IntoTheMeadow` at `2026-07-08T12:21:20-04:00`, older than the other non-excluded checked Publish repos.

```txt
HorrorCorridor      latest 2026-07-08T12:29:17-04:00
AetherVale          latest 2026-07-08T13:39:15-04:00
TheOpenAbove        latest 2026-07-08T13:31:29-04:00
TheCavalryOfRome    excluded
PhantomCommand      latest 2026-07-08T12:41:31-04:00
PrehistoricRush     latest 2026-07-08T13:18:13-04:00
ZombieOrchard       latest 2026-07-08T12:51:50-04:00
IntoTheMeadow       selected / latest 2026-07-08T12:21:20-04:00
MyCozyIsland        latest 2026-07-08T13:11:07-04:00
TheUnmappedHouse    latest 2026-07-08T12:59:11-04:00
```

## Source files read

```txt
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Central files read:

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/AetherVale.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PrehistoricRush.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
```

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> load meadow-area-kit and meadow-webgl-render-kit from CDN URLs in GAME_MANIFEST
  -> createIntoTheMeadowGame({ externalKits })
  -> install DSK descriptors and create arrival meadow kit
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> optional debug HUD text
  -> GameHost exposes state/snapshot/diagnostics/enhanced render plan/render snapshot
```

## Domains

```txt
static-route-domain
web-host-domain
external-kit-loading-domain
game-manifest-domain
dsk-install-domain
meadow-area-domain
render-plan-enhancement-domain
renderer-host-domain
render-parity-domain
grass-system-domain
grass-readback-domain
state-root-domain
progression-domain
objective-domain
interaction-target-domain
action-frame-domain
action-result-domain
gameplay-snapshot-domain
gamehost-diagnostics-domain
fixture-smoke-domain
```

## Services

```txt
current services:
  load external meadow kits
  create game state
  create meadow render plan
  enhance render plan with grass/wind/postprocess/performance descriptors
  render enhanced plan through external renderer
  expose diagnostics and snapshots through GameHost

needed services:
  collect expected render descriptors
  normalize renderer snapshot consumption
  compare render descriptor parity
  report consumed/unconsumed/unsupported/fallback/missing rows
  normalize optional action input
  reduce path-progress and inspect actions
  resolve objective completion idempotently
  expose snapshot.gameplay and renderParity
  fixture-smoke renderer parity and gameplay reducers
```

## Kits

```txt
implemented:
  meadow-area-kit
  meadow-webgl-render-kit
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
  fallback-meadow-area-kit

next-cut:
  render-parity-reason-kit
  expected-render-descriptor-kit
  renderer-snapshot-consumption-kit
  render-descriptor-parity-kit
  render-parity-diagnostics-projection-kit
  action-frame-kit
  action-result-kit
  action-journal-kit
  path-progress-reducer-kit
  inspect-target-reducer-kit
  objective-completion-resolver-kit
  gameplay-snapshot-kit
  fixture-smoke kits
```

## Main finding

`IntoTheMeadow` is descriptor-rich but proof-limited.

The render side builds `grassSystem`, `windField`, `postProcess`, performance policy, outline policy, and grass stats, but it does not yet prove which descriptors the external renderer consumed.

The gameplay side defines objectives and interaction targets, but `advanceGameState()` remains inert beyond frame and `lastTick` updates.

## Next safe ledge

```txt
IntoTheMeadow Render Parity Consumer Snapshot + Gameplay Action Fixture Gate
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T13-50-37-04-00-renderer-gameplay-implementation-cutline.md
.agent/render-audit/2026-07-08T13-50-37-04-00-render-parity-consumption-proof.md
.agent/grass-system-audit/2026-07-08T13-50-37-04-00-grass-descriptor-readback-contract.md
.agent/gameplay-authority-audit/2026-07-08T13-50-37-04-00-action-result-reducer-implementation-plan.md
.agent/trackers/2026-07-08T13-50-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T13-50-37-04-00.md
```

## Validation

Documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
pushed to main: yes
```
