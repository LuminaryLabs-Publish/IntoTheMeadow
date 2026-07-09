# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T03-38-54-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Run type:** documentation-only internal audit

**Branch policy:** pushed to `main`; no branch or PR created.

## Selection result

`IntoTheMeadow` was selected for this breakdown pass.

The accessible `LuminaryLabs-Publish` organization list was compared against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`IntoTheMeadow` was the oldest eligible tracked fallback by central ledger alignment. Its central ledger was still at `2026-07-09T00-50-00-04-00`, older than the checked non-excluded repo set.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow      selected / tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor     tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/PhantomCommand     tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/ZombieOrchard      tracked / root .agent present / central latest 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse   tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland       tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/AetherVale         tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/PrehistoricRush    tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/TheOpenAbove       tracked / root .agent present / central latest 2026-07-09T03-20-01-04-00
LuminaryLabs-Publish/TheCavalryOfRome   excluded by standing rule
```

## Current product read

`IntoTheMeadow` is a static browser DSK-composed meadow exploration game.

The route is:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
```

`package.json` exposes `npm run check`, which runs static, DSK registry, render-plan, and deterministic-scene smokes. The next fixture seam is not yet wired into that script.

## Interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports GAME_MANIFEST.externalKits[0..1]
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks(...) validates local DSK descriptors and external-kit load status
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> createMeadowWebglRenderKit({ canvas })
  -> exposeGameHost(...) publishes state/snapshot/diagnostics/enhanced plan/render snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan, { performance })
  -> renderer.render(plan)
  -> optional debug HUD writes validation/object/grass/render counts
  -> loop continues
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
browser-boot
web-host-runtime
external-kit-loader
game-manifest-authority
local-dsk-registry
dsk-install-validation
meadow-area-bridge
arrival-meadow-content
story-beat-content
objective-content
interaction-target-content
game-state-root
game-tick-loop
game-snapshot
render-plan-source
render-plan-enhancement
renderer-host-adapter
renderer-snapshot-readback
GameHost-diagnostics
tree-object-domain
wind-field-domain
performance-policy-domain
post-process-stack-domain
grass-density-texture-domain
grass-clump-archetype-domain
grass-static-batch-domain
grass-patch-placement-domain
grass-instancing-render-domain
grass-shader-wind-domain
grass-lod-policy-domain
grass-density-scaling-domain
grass-debug-visualization-domain
render-parity-target-domain
grass-consumption-target-domain
action-frame-target-domain
action-result-target-domain
objective-completion-target-domain
gameplay-snapshot-target-domain
fixture-replay-target-domain
```

## Services that kits offer

```txt
meadow-area-kit:
  create render plans for an area, expose area snapshot, validate area render plan.

meadow-webgl-render-kit:
  create browser renderer, render enhanced meadow plans, optionally expose renderer snapshot/readback.

install-dsks / local-dsk-registry:
  validate local DSK descriptors, track required v0.1 DSKs, expose local/external DSK snapshots.

createIntoTheMeadowGame:
  create game state, install DSKs, create meadow area, expose content, tick, reset, snapshot, diagnostics, render-plan access.

fallback-meadow-area-kit:
  provide a minimal ground/path/focal-tree render plan when the external meadow-area kit is unavailable.

render enhancement kits:
  add tree outline policy, wind field, post-process stack, performance budgets, grass system, render stats.

grass kit family:
  create density textures, clump archetypes, static batches, density-scaled patch placement, instanced draw groups, shader wind, LOD policy, density scaling, and debug summaries.

current GameHost service:
  expose state, base snapshot, diagnostics, enhancedRenderPlan, and renderer snapshot.

missing next services:
  collect expected render descriptors, normalize renderer readback, create parity rows, create grass consumption rows, project renderParity, normalize ActionFrame rows, create ActionResult rows, reduce path-progress and inspect actions, resolve objective completion, project snapshot.gameplay, run DOM-free render/gameplay fixtures.
```

## Kits identified

### Current source-backed / configured kits

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

### Planned / next-cut proof kits

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

`IntoTheMeadow` has a strong descriptor stack but still lacks a consumer-proof boundary.

`enhanceRenderPlan()` emits grass, wind, postprocess, performance, object style, and stat descriptors. `web-host.js` renders that plan and exposes renderer readback, but no parity report proves which descriptors were consumed, unsupported, sparse, missing, or fallback-rendered.

The gameplay descriptors are also present but inert: `ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define `path-progress` and `inspect`, while `advanceGameState()` still only increments frame and writes `lastTick`.

## Required next implementation boundary

```txt
IntoTheMeadow Renderer Readback Consumer Freeze + Action Replay Fixture Gate
```

Do not start with visual rewrites, content placement, renderer replacement, external CDN changes, or shared-kit promotion.

Start with pure proof modules and fixture rows.

## Validation status

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no
browser route check: no
DOM-free fixture run: no, fixture files do not exist yet
branch created: no
pull request created: no
pushed to main: yes
```
