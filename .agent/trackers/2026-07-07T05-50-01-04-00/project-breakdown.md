# IntoTheMeadow Project Breakdown

**Documented:** `2026-07-07T05:50:01-04:00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Central tracker target:** `LuminaryLabs-Dev/LuminaryLabs`

## Selection reason

The central ledger showed `LuminaryLabs-Publish/PrehistoricRush` as the latest completed Publish breakdown at `2026-07-07T05:39:22-04:00`.

`IntoTheMeadow` was selected for this pass because it is the oldest eligible repo in the tracked Publish rotation after excluding `LuminaryLabs-Publish/TheCavalryOfRome`.

## Current status

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story descriptors, validation scripts, diagnostics, and GitHub Pages deployment surface.

The runtime already has a clean product-vs-kit boundary. The browser host loads external reusable meadow kits from the manifest, creates the product game, installs local DSK descriptors, creates an arrival meadow render plan, enhances that render plan, renders it through the WebGL meadow kit, and exposes `window.GameHost`.

The main gap is still executable play. `createInitialGameState()` already contains player, world, and progression fields, but `advanceGameState()` only increments `frame` and records `lastTick`. Static objectives, interaction targets, and story beats are present, but no runtime service evaluates player movement, path progress, inspection, story triggers, or objective completion.

## Interaction loop

```txt
current loop:
  open index.html
  -> src/boot/boot-game.js locates canvas, HUD, status, and loading nodes
  -> src/hosts/web-host.js loads external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame() installs local DSK descriptors
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) creates the arrival meadow area model
  -> createInitialGameState() creates deterministic frame, scene, player, world, progression, and DSK state
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState() increments frame and records lastTick
  -> meadow-area-kit returns a render plan
  -> enhanceRenderPlan() applies product metadata and quality/performance descriptors
  -> meadow-webgl-render-kit renders the plan
  -> debug HUD reports validation and render stats when enabled
  -> window.GameHost exposes getState, getSnapshot, getDiagnostics, and render snapshot surfaces

intended playable loop:
  spawn player at the arrival path
  -> collect host input from keyboard / pointer / touch
  -> normalize input into meadow-input-dsk action frames
  -> move player through meadow-player-dsk
  -> update camera through meadow-camera-dsk
  -> sample nearest point and progress along ARRIVAL_MEADOW_CONFIG.features.path.points
  -> trigger path-discovery story beat when pathProgress >= 0.25
  -> expose focal-tree inspect affordance when the player is inside target radius and facing target
  -> emit inspect:focal-tree
  -> complete walk-the-path and inspect-tree objectives
  -> record arrival meadow completion through meadow-save-dsk
  -> unlock the next area / story scene
```

## Domains in use

```txt
static browser shell
GitHub Pages deployment
host runtime
external kit loading
product game factory
DSK registry and descriptor install
local DSK validation
meadow area bridge
external meadow area render-plan adapter
external WebGL meadow renderer
render plan enhancement
render stats and diagnostics
deterministic state root
scene/session identity
player position/yaw/pitch/pathProgress
world wind state
progression objective ledger
story beat ledger
arrival meadow config
path corridor config
focal tree config
interaction target config
objective config
story beat config
input action mapping
player movement and terrain contact
camera rig and render metadata
path-progress sampling
interaction affordance evaluation
objective completion reducer
story trigger reducer
save/progression persistence
minimal HUD / debug HUD
static smoke validation
deterministic snapshot validation
render plan smoke validation
```

## Current file surfaces

```txt
index.html
package.json
src/boot/boot-game.js
src/boot/expose-game-host.js
src/boot/install-dsks.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/game-manifest.js
src/content/dsk-registry.js
src/content/meadow-areas/arrival-meadow.js
src/content/objectives/arrival-objectives.js
src/content/story/story-beats.js
src/content/interaction-targets/arrival-targets.js
src/dsks/index.js
src/validation/validate-determinism.js
src/validation/validate-render-plan.js
src/validation/validate-scene-flow.js
tests/static-smoke.mjs
tests/dsk-registry-smoke.mjs
tests/render-plan-smoke.mjs
tests/deterministic-scene-smoke.mjs
.agent/README.md
.agent/kit-registry.json
```

## Services identified

```txt
web-host-dsk:
  loadExternalKits
  createRenderer
  frameLoop
  debugHudStatus
  exposeGameHostBinding
  target collectInputFrame
  target passActionFrameToGameTick

into-the-meadow-game-dsk:
  createIntoTheMeadowGame
  createFallbackMeadowAreaKit
  createInitialGameState
  advanceGameState
  getState
  getRenderPlan
  getDiagnostics
  getSnapshot
  reset
  tick

game-composition-dsk:
  installDsks
  validateLocalDsks
  createDskDescriptor
  enhanceRenderPlan
  renderCompositionMetadata
  simulationCompositionTarget

meadow-area-bridge-dsk:
  createMeadowAreaKit adapter
  ARRIVAL_MEADOW_CONFIG bridge
  meadow.getRenderPlan
  meadow.getSnapshot
  meadow.validate

path-corridor-dsk:
  path curve descriptor
  target nearest path segment sampling
  target path progress calculation
  target corridor containment check
  target path objective event

meadow-input-dsk:
  target keyboard bindings
  target pointer look bindings
  target touch fallback bindings
  target inspect action
  target normalized action frame

meadow-player-dsk:
  existing player state fields
  target movement integration
  target yaw/pitch update
  target path-aware speed profile
  target terrain contact
  target player snapshot

meadow-camera-dsk:
  target camera state
  target player follow target
  target render-plan camera metadata
  target camera diagnostics

meadow-interaction-dsk:
  ARRIVAL_INTERACTION_TARGETS registry
  target proximity check
  target facing/view check
  target inspect affordance state
  target inspect event emission

meadow-story-dsk:
  STORY_BEATS registry
  existing arrival beat ledger
  target scene-start trigger
  target path-progress trigger
  target inspect trigger
  target one-shot story ledger

meadow-objective-dsk:
  ARRIVAL_OBJECTIVES registry
  target walk-the-path completion check
  target inspect-tree completion check
  target active objective advancement
  target completion ledger

meadow-diagnostics-dsk:
  getDiagnostics
  validation aggregation
  content counts
  target gameplay reducer health
  target input/player/objective/story snapshots

meadow-save-dsk:
  target arrival completion ledger
  target local persistence adapter
  target migration-safe save model
```

## Kits identified

### External kits

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Required v0.1 local DSKs

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
post-process-stack-dsk
static-pages-deploy-dsk
```

### Full local kit inventory

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
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

### Runtime cutover kits for the next implementation pass

```txt
meadow-input-runtime-kit
meadow-player-runtime-kit
path-progress-runtime-kit
focal-tree-interaction-runtime-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-save-kit
playable-loop-smoke-kit
```

## Key blockers

```txt
non-executable-gameplay-loop:
  advanceGameState() only increments frame and lastTick.

input-gap:
  web-host-dsk does not yet collect or normalize action frames.

path-progress-gap:
  ARRIVAL_MEADOW_CONFIG has path points, and walk-the-path requires path-progress >= 0.35, but no runtime calculates player path progress.

interaction-gap:
  ARRIVAL_INTERACTION_TARGETS defines focal-tree inspect radius, but no runtime checks proximity, view, or inspect input.

story-gap:
  STORY_BEATS defines scene-start, path-progress:0.25, and inspect:focal-tree triggers, but only arrival is present in initial state.

objective-gap:
  ARRIVAL_OBJECTIVES defines walk-the-path and inspect-tree, but no reducer completes objectives.

save-gap:
  meadow-save-dsk exists as planned inventory, but arrival completion is not persisted.
```

## Recommended next slice

```txt
IntoTheMeadow Runtime Loop Evaluation Cutover
```

Build order:

```txt
1. Keep index.html and src/boot/boot-game.js thin.
2. Add a small host input collector in src/hosts/web-host.js.
3. Pass a normalized action frame into game.tick({ time, dt, actions }).
4. Expand advanceGameState() into composed reducer calls, not one monolithic function.
5. Add meadow-input-runtime-kit service functions for keyboard, pointer, touch, and inspect intent.
6. Add meadow-player-runtime-kit service functions for walk movement, yaw/pitch, and bounded path-area movement.
7. Add path-progress-runtime-kit service functions that sample ARRIVAL_MEADOW_CONFIG.features.path.points.
8. Add focal-tree-interaction-runtime-kit checks using ARRIVAL_INTERACTION_TARGETS.
9. Add story-trigger-runtime-kit one-shot evaluation for scene-start, path-progress:0.25, and inspect:focal-tree.
10. Add objective-completion-runtime-kit reducers for walk-the-path and inspect-tree.
11. Add arrival-completion-save-kit state field, with localStorage only after deterministic state remains stable.
12. Add playable-loop-smoke-kit that scripts forward movement and inspect intent to prove both objectives complete.
```

## Acceptance targets

```txt
npm run check
window.GameHost.getState().player.pathProgress increases under scripted movement
path-discovery story beat appears exactly once after pathProgress >= 0.25
walk-the-path completes after pathProgress >= 0.35
focal-tree inspect affordance appears inside target radius
inspect-tree completes after inspect:focal-tree
window.GameHost.getSnapshot() includes player, objective, story, and interaction state
getDiagnostics() reports gameplay reducer health
static smoke remains deterministic for repeated snapshots
```

## What changed in this documentation pass

```txt
added .agent/trackers/2026-07-07T05-50-01-04-00/project-breakdown.md
updated .agent/kit-registry.json
updated .agent/README.md
updated LuminaryLabs-Dev/LuminaryLabs repo ledger
added LuminaryLabs-Dev/LuminaryLabs internal change-log entry
```
