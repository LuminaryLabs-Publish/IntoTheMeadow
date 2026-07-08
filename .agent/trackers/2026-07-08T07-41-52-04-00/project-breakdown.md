# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T07:41:52-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Run type:** scheduled repo breakdown / repo-local `.agent` documentation update

## Goal

Compare the full accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, choose one eligible non-Cavalry repo, and update its root `.agent` documentation with the current interaction loop, domains, services, kits, known gaps, validation state, and next safe implementation ledge.

## Checklist

- [x] Read the current `LuminaryLabs-Publish` installation repo list.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Compared repo list against central `LuminaryLabs-Dev/LuminaryLabs` status/ledger readback.
- [x] Confirmed no checked non-Cavalry Publish repo is fully new, absent from central tracking, or missing root `.agent` state.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Inspected source files that define route, host, game state, snapshot, render enhancement, objectives, and interaction targets.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and target kits.
- [x] Identified kits.
- [x] Added architecture, render, gameplay-authority, tracker, and turn-ledger documentation.
- [x] Updated required root `.agent` documents.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and internal change log.

## Publish repo comparison

Current accessible `LuminaryLabs-Publish` repos checked:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
TheUnmappedHouse
```

Selection outcome:

```txt
new repo found: no
missing central ledger entry found: no
missing root .agent state found in checked non-Cavalry repos: no
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
selected repo: LuminaryLabs-Publish/IntoTheMeadow
selection mode: fallback follow-up after full-list comparison
```

`IntoTheMeadow` was selected because its latest direct tracker still leaves the highest-value unresolved seam: renderer descriptor-consumption parity must be proven, and the next gameplay authority gate must not be designed blindly before the renderer reports what it actually consumes.

## Source files inspected

```txt
README.md
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/renderer-consumption-audit/parity-fixture-matrix.md
LuminaryLabs-Dev/LuminaryLabs/repo-checks/reports/status-summary.json
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
```

## Interaction loop

```txt
browser opens index.html
-> index loads src/boot/boot-game.js
-> boot-game.js locates #scene, #hud, #status, and #loading
-> startWebHost() imports external meadow-area-kit and meadow-webgl-render-kit from manifest URLs
-> createIntoTheMeadowGame() installs local DSK descriptors
-> createIntoTheMeadowGame() creates ARRIVAL_MEADOW_CONFIG through meadow-area-kit
-> requestAnimationFrame drives frame(now)
-> game.tick({ time, dt: 1 / 60 }) advances frame and lastTick only
-> game.getRenderPlan(time) returns meadow-area render plan
-> enhanceRenderPlan(rawPlan) adds local grass, wind, post-process, tree, outline, performance, and stat descriptors
-> renderer.render(enhancedPlan) renders via external meadow-webgl-render-kit
-> GameHost exposes getState(), getSnapshot(), getDiagnostics(), getRenderPlan(), and renderer snapshot
```

Current gameplay state loop:

```txt
createInitialGameState()
-> state.frame starts at 0
-> state.player has position/yaw/pitch/pathProgress
-> state.progression has activeObjectiveId, completedObjectiveIds, storyBeatIds
-> advanceGameState(state, input)
-> only increments frame and records lastTick
```

The objective and interaction descriptors already identify the first intended gameplay loop:

```txt
walk-the-path -> requiredAction:path-progress -> target:arrival-path -> progressAtLeast:0.35
inspect-tree -> requiredAction:inspect -> target:focal-tree -> inspected:true
```

## Domains in use

```txt
static-browser-shell
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
canvas-surface
debug-hud-runtime
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-plan-contract
GameHost-render-snapshot-contract
manifest-authority
game-factory
local-dsk-registry
local-dsk-install-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
arrival-meadow-area
render-plan-generation
render-plan-enhancement
renderer-descriptor-consumption-parity
renderer-unsupported-descriptor-reason-catalog
renderer-parity-fixture-domain
texture-driven-grass-system
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-clump-instancing-render
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field-render-metadata
post-process-stack-metadata
render-style-outline-policy
render-stats-diagnostics
deterministic-state-root
tick-clock
last-tick-diagnostics
player-state
path-progress-state
story-beat-ledger
objective-ledger
interaction-target-registry
action-frame-contract
action-batch-contract
action-result-contract
stable-rejection-reason-catalog
ordered-reducer-pipeline
path-progress-reducer
inspect-target-reducer
objective-completion-reducer
story-trigger-reducer
gameplay-snapshot-contract
fixture-replay-domain
github-pages-deployment
static-smoke-validation
```

## Services offered today

Host/runtime services:

```txt
locate-canvas
locate-hud
locate-loading-surface
start-web-host
load-external-kits
create-game
create-renderer
expose-game-host
run-frame-loop
render-frame
install-dsks
validate-local-dsks
create-meadow-area-kit
create-fallback-meadow-area-kit
create-initial-game-state
advance-game-state
create-game-snapshot
validate-game-snapshot
get-render-plan
get-diagnostics
reset-state
```

Render enhancement services:

```txt
reduce-tiny-clutter
apply-outline-policy
enhance-focal-tree
create-wind-field
create-post-process-stack
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-instancing-draw-groups
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
attach-grass-stats
```

Target proof services:

```txt
collect-expected-render-descriptors
normalize-renderer-snapshot-consumption
compare-render-descriptor-parity
classify-render-descriptor-status
project-render-parity-to-GameHost
run-render-parity-fixture-matrix
normalize-action-frame
reduce-path-progress-action
reduce-inspect-action
resolve-objective-completion
emit-action-result
append-action-journal-entry
project-gameplay-snapshot
run-gameplay-replay-fixture
```

## Kits identified

External kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Current local active kits/DSKs:

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
wind-field-dsk
tree-object-dsk
meadow-performance-dsk
post-process-stack-dsk
```

Next-cut proof kits:

```txt
renderer-descriptor-expectation-kit
renderer-snapshot-consumption-kit
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
gamehost-render-parity-diagnostics-kit
renderer-parity-fixture-kit
action-frame-kit
action-batch-kit
action-result-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-reducer-kit
story-trigger-reducer-kit
gameplay-snapshot-kit
gameplay-replay-fixture-kit
```

## Main findings

1. `IntoTheMeadow` now has enough descriptor data to prove renderer parity, but the repo still lacks the fixture implementation that compares enhanced render descriptors against renderer snapshot consumption.
2. The first gameplay loop is already implied by objective and interaction descriptors, but `advanceGameState()` only increments `frame` and stores `lastTick`.
3. `GameHost.getSnapshot()` does not yet expose a dedicated `snapshot.gameplay` or `snapshot.renderParity` result branch.
4. The next implementation should not add more meadow decoration first. It should add renderer parity proof, then the smallest action/result reducer gate for path progress and tree inspection.

## Files changed this pass

Repo-local files:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T07-41-52-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T07-41-52-04-00-renderer-parity-readback.md
.agent/gameplay-authority-audit/2026-07-08T07-41-52-04-00-action-frame-objective-reducer-gate.md
.agent/trackers/2026-07-08T07-41-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-41-52-04-00.md
```

Central files:

```txt
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/2026-07-08T07-41-52-04-00-into-the-meadow-action-frame-handoff.md
```

## Validation

Performed:

```txt
GitHub file readback
Publish repo list comparison
central status/ledger readback
source-level route/host/game/render inspection
repo-local .agent documentation update
central repo-ledger update
central internal change-log update
```

Not performed:

```txt
npm run check
npm test
browser render check
GitHub Pages deployment check
visual screenshot comparison
external ProtoKits renderer behavior check
runtime source implementation
```

## Next safe ledge

```txt
IntoTheMeadow Renderer Parity Fixture + ActionFrame Objective Reducer Handoff
```

Build order:

```txt
preserve index.html and GameHost compatibility
-> implement DOM-free renderer parity fixture
-> project renderParity into GameHost diagnostics/snapshot
-> keep game.tick({ time, dt }) compatible
-> add optional game.tick({ time, dt, actions }) path
-> implement path-progress and inspect ActionResult reducers
-> project snapshot.gameplay
-> add replay fixture for walk-the-path and inspect-tree
```