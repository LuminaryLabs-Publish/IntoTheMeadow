# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-09T15-39-08-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Commit scope:** documentation-only `.agent` refresh.

## Goal

Refresh the repo-local internal docs, compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, identify the current interaction loop, domains, services, and kits, then sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Checklist

- [x] Read the accessible `LuminaryLabs-Publish` repository installation list.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared current Publish repos against central repo-ledger entries.
- [x] Sampled repo-local `.agent/START_HERE.md` state for the selected repo.
- [x] Selected one repo only: `IntoTheMeadow`.
- [x] Read source and existing `.agent` state.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current and next-cut kits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Added architecture, render, grass-system, gameplay, interaction, and deploy audits.
- [x] Updated root `.agent` docs and kit registry.
- [x] Updated central repo ledger and internal change-log.
- [x] Pushed only to `main`.

## Selection result

No checked non-Cavalry Publish repo was new, absent from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`IntoTheMeadow` was selected as the oldest eligible central-ledger fallback. At read time, its central ledger still pointed at `2026-07-09T12-08-46-04-00`, older than the other checked non-Cavalry Publish repos.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central-ledger fallback / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-20-00-04-00
```

## Source evidence read

```txt
.agent/START_HERE.md
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/boot/expose-game-host.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
package.json
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
```

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM mount
  -> src/boot/boot-game.js captures DOM nodes and debug flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> create meadow WebGL renderer
  -> exposeGameHost({ game, renderer, getRenderPlan, getSnapshot })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> grass density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, debug summary, postprocess, wind field, and stats are added
  -> renderer.render(enhancedPlan)
  -> optional debug HUD reports validation/object/grass/render counts
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and optional renderer snapshot
```

## Main finding

`IntoTheMeadow` has a strong descriptor stack and already emits high-value grass/render descriptors, but it still lacks a source-owned consumer ledger proving what the external renderer consumed versus ignored. Gameplay descriptors are also inert: objectives and interaction targets exist, while `advanceGameState()` only increments `frame` and records `lastTick`.

## Domains in use

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
meadow-area-render-plan
render-plan-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-instancing-render-descriptor
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field
postprocess-stack
meadow-performance-policy
tree-object-enhancement
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
render-consumption-ledger-next
grass-consumption-row-next
action-frame-next
action-result-next
objective-progress-next
DOM-free-fixture-next
central-ledger-sync
```

## Kit services

```txt
loadExternalKits: imports remote meadow area and renderer factories.
installDsks: validates local/external kit descriptors and reports counts.
createMeadowAreaKit: produces render plan from arrival meadow config.
createIntoTheMeadowGame: binds manifest, content, DSK install, meadow kit, state, diagnostics, snapshots, tick, and reset.
advanceGameState: increments frame and stores lastTick.
createGameSnapshot: projects current game/diagnostics/content/render state.
enhanceRenderPlan: adds performance policy, wind field, postprocess, object outline policy, grass system, grass stats, and filtered objects.
createGrassSystem: builds density texture, clump archetypes, static batches, patch placements, draw groups, shader wind, LOD, scaling, debug summary, and validation.
renderer.render: consumes enhanced plan and returns render counts.
exposeGameHost: exposes state, snapshot, diagnostics, and game object.
planned render-consumption-ledger: compare enhanced descriptors against renderer readback.
planned gameplay-action-fixture: replay path-progress and inspect actions without DOM.
planned central-ledger-sync: keep root `.agent` and central repo ledger aligned.
```

## Kits identified

### Implemented/source-backed kits

```txt
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
GameHost exposure kit
DSK install registry kit
static smoke / render-plan / deterministic-scene validation kits
```

### Planned proof kits

```txt
render-expectation-collection-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
gameplay-snapshot-projection-kit
GameHost-proof-projection-kit
DOM-free-action-fixture-kit
central-ledger-sync-kit
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
browser smoke: not run
DOM-free fixture: not run because fixture files do not exist yet
pushed to main: yes
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Ledger Central Refresh + Action Fixture Gate
```

Do not change visuals, external kit URLs, route shell, renderer implementation, grass visuals, or objective content before descriptor-consumption rows and gameplay-action rows are source-backed and fixture-proven.
