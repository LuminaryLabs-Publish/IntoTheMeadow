# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-09T18-20-18-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route. Its runtime imports external meadow/render kits, creates a game object, enhances render plans with grass/wind/postprocess/performance descriptors, renders frames, and exposes `GameHost` diagnostics.

This pass did not change runtime source. It refreshed repo-local `.agent` docs and central tracking around the next proof cut: render/action readback plus DOM-free fixtures.

## Repo selection

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible documented fallback / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

No new untracked eligible public repo was found. `IntoTheMeadow` was the oldest eligible documented fallback among checked public non-Cavalry repos.

## Evidence checked

```txt
current public LuminaryLabs-Publish repository list
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/*.md sampled by direct file reads
sampled root .agent/START_HERE.md for public non-Cavalry repos
LuminaryLabs-Publish/IntoTheMeadow:.agent/START_HERE.md
LuminaryLabs-Publish/IntoTheMeadow:src/hosts/web-host.js
LuminaryLabs-Publish/IntoTheMeadow:src/game/enhance-render-plan.js
LuminaryLabs-Publish/IntoTheMeadow:src/game/create-into-the-meadow-game.js
LuminaryLabs-Publish/IntoTheMeadow:src/game/game-state.js
LuminaryLabs-Publish/IntoTheMeadow:src/game/game-snapshot.js
LuminaryLabs-Publish/IntoTheMeadow:src/boot/expose-game-host.js
LuminaryLabs-Publish/IntoTheMeadow:src/content/game-manifest.js
LuminaryLabs-Publish/IntoTheMeadow:src/content/objectives/arrival-objectives.js
LuminaryLabs-Publish/IntoTheMeadow:src/content/interaction-targets/arrival-targets.js
LuminaryLabs-Publish/IntoTheMeadow:package.json
```

## Current interaction loop

```txt
index.html
-> boot-game.js
-> startWebHost
-> load external meadow area/render kits
-> createIntoTheMeadowGame
-> install local/external DSK descriptors
-> create arrival meadow area render plan
-> create external WebGL renderer
-> expose GameHost state/snapshot/diagnostics
-> requestAnimationFrame
-> game.tick({ time, dt })
-> advanceGameState increments frame and writes lastTick only
-> get raw render plan
-> enhance render plan with grass/wind/postprocess/performance/stats
-> renderer.render(enhancedPlan)
-> optional debug HUD writes validation/object/patch/vertex counts
```

## Domains in use

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
manifest-and-build-metadata
arrival-meadow-source-config
meadow-area-render-plan
render-plan-enhancement
object-outline-policy
tiny-clutter-reduction
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
target-action-preflight-next
action-result-next
objective-progress-next
DOM-free-fixture-next
central-ledger-sync
```

## Services and kits

See `.agent/kit-registry.json` for the current machine-readable kit inventory. The important implemented service seam is descriptor production; the important next seam is consumer proof.

## Main finding

The repo does not need a visual rewrite next. It needs source-owned proof that the renderer consumes the descriptors the route emits, plus source-owned action/result rows that turn path progress and inspect descriptors into deterministic gameplay state changes.
