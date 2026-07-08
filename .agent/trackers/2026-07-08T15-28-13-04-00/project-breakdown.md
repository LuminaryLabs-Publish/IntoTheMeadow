# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` tracking, select one eligible repo, and update repo-local `.agent` docs with a source-backed DSK/domain breakdown.

## Repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       selected fallback / previous sampled alignment 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T14-18-45-04-00
```

## Selection result

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing root `.agent` state, or otherwise undocumented.

`IntoTheMeadow` was selected by fallback because it had the oldest sampled current non-Cavalry root alignment and still has unresolved render parity plus first-objective gameplay authority proof.

## Interaction loop

Current loop:

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> GameHost exposes state, snapshot, diagnostics, enhanced plan, and renderer snapshot
```

Target proof loop:

```txt
enhanced render plan
  -> expected descriptor collection
  -> renderer snapshot consumption normalization
  -> descriptor parity report
  -> GameHost.renderParity
  -> render parity fixture
  -> optional ActionFrame input
  -> ActionResult reducer
  -> objective completion resolver
  -> snapshot.gameplay
  -> gameplay fixture
```

## Domains in use

```txt
static-route-domain
browser-boot-domain
web-host-domain
external-kit-loading-domain
manifest-domain
dsk-install-domain
meadow-area-domain
render-plan-domain
render-plan-enhancement-domain
renderer-host-domain
render-snapshot-domain
render-parity-domain
grass-system-domain
grass-consumption-domain
game-state-domain
player-state-domain
world-state-domain
progression-domain
objective-domain
interaction-target-domain
action-frame-domain
action-result-domain
action-journal-domain
gameplay-snapshot-domain
gamehost-diagnostics-domain
fixture-smoke-domain
pages-deploy-domain
```

## Services that the kits offer

```txt
current services:
  static route boot
  external kit CDN import
  DSK registry installation and validation
  arrival meadow render plan creation
  render plan enhancement
  grass descriptor generation
  WebGL render handoff
  GameHost state/snapshot/diagnostic projection

needed next services:
  render descriptor expectation collection
  renderer snapshot consumption normalization
  descriptor parity comparison
  grass consumption row classification
  GameHost renderParity projection
  optional action frame normalization
  path-progress reducer
  inspect-target reducer
  objective completion resolver
  gameplay snapshot projection
  DOM-free fixture smoke tests
```

## Kits

Implemented external kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Implemented local kits / descriptors:

```txt
game-manifest descriptor
local-dsk-registry
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

Next-cut kits:

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-diagnostics-projection-kit
grass-consumption-row-kit
action-frame-kit
action-result-kit
action-journal-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
render-parity-fixture-smoke-kit
gameplay-authority-fixture-smoke-kit
```

## Files changed in IntoTheMeadow

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T15-28-13-04-00-render-gameplay-splice-map.md
.agent/render-audit/2026-07-08T15-28-13-04-00-gamehost-render-parity-readback-map.md
.agent/grass-system-audit/2026-07-08T15-28-13-04-00-grass-consumption-row-contract.md
.agent/gameplay-audit/2026-07-08T15-28-13-04-00-action-result-fixture-splice-map.md
.agent/trackers/2026-07-08T15-28-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-28-13-04-00.md
```

## Files changed in LuminaryLabs-Dev/LuminaryLabs

```txt
repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
internal-change-log/2026-07-08T15-28-13-04-00-into-the-meadow-gamehost-render-parity-gameplay-splice-gate.md
```

## Main finding

`IntoTheMeadow` has strong descriptor generation, but the source still lacks proof that the external renderer consumes or honestly rejects those descriptors. The same pattern exists on gameplay: objectives and targets exist, but optional actions do not yet reduce into `ActionResult`, objective completion, an action journal, or `snapshot.gameplay`.

## Next safe ledge

```txt
IntoTheMeadow GameHost Render Parity + Gameplay ActionResult Splice Fixture Gate
```

## Validation

Docs-only update.

No runtime source files were changed.

No local checkout, `npm install`, `npm run check`, browser smoke, GitHub Pages smoke, or fixture execution was performed.