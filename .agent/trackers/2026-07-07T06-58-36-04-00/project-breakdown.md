# IntoTheMeadow Project Breakdown

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Documented:** `2026-07-07T06:58:36-04:00`

**Run focus:** Runtime action contract, deterministic objective smoke, and service extraction plan.

## Selection reason

The central `LuminaryLabs-Dev/LuminaryLabs` ledger showed `LuminaryLabs-Publish/PrehistoricRush` as the latest eligible Publish repo breakdown at `2026-07-07T06:50:26-04:00`.

`LuminaryLabs-Publish/IntoTheMeadow` was selected next because it is the next oldest eligible tracked repo in the Publish rotation after excluding `LuminaryLabs-Publish/TheCavalryOfRome`.

## Current repo read

`IntoTheMeadow` is a static browser, DSK-composed meadow exploration product repo.

The repo already has a clean product shell and reusable-kit boundary:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/enhance-render-plan.js
  -> window.GameHost
```

The runtime is stable as a renderable scene and diagnostic proof, but it is not yet playable as a real exploration loop. `advanceGameState()` still only increments `frame` and records `lastTick`, even though the state model already contains player, world, progression, objective, and story fields.

## Interaction loop

### Current implemented loop

```txt
browser opens index.html
  -> boot-game.js locates canvas, HUD, status, and loading nodes
  -> web-host.js imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST
  -> createIntoTheMeadowGame() installs local DSK descriptors
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) creates the arrival meadow model
  -> createInitialGameState() creates scene, session, player, world, progression, and DSK state
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState() increments frame and records lastTick
  -> meadow-area-kit emits a render plan
  -> enhanceRenderPlan() applies product metadata and performance/style descriptors
  -> meadow-webgl-render-kit renders the plan
  -> debug HUD can report validation/render stats
  -> window.GameHost exposes getState, getSnapshot, getDiagnostics, and render snapshot surfaces
```

### Target playable loop

```txt
spawn player at the arrival path
  -> collect host keyboard / pointer / touch / inspect input
  -> normalize action frame through meadow-input-runtime-kit
  -> pass actions into game.tick({ time, dt, actions })
  -> meadow-player-runtime-kit updates position, yaw, pitch, speed, and grounded/path state
  -> path-progress-runtime-kit samples ARRIVAL_MEADOW_CONFIG.features.path.points
  -> pathProgress increases as the player follows the path
  -> story-trigger-runtime-kit emits path-discovery once pathProgress >= 0.25
  -> objective-completion-runtime-kit completes walk-the-path once pathProgress >= 0.35
  -> focal-tree-interaction-runtime-kit exposes inspect affordance inside target radius
  -> inspect action emits inspect:focal-tree
  -> story-trigger-runtime-kit emits focal-tree story beat once
  -> objective-completion-runtime-kit completes inspect-tree
  -> arrival-completion-save-kit records meadow completion when objectives are complete
  -> GameHost snapshot reports player, story, objective, interaction, and completion state
```

### Recommended service loop

```txt
host input snapshot
  -> normalized action frame
  -> deterministic player reducer
  -> path progress reducer
  -> interaction affordance reducer
  -> story trigger reducer
  -> objective completion reducer
  -> save/completion reducer
  -> render metadata projection
  -> diagnostics and smoke snapshot
```

## Domains in use

```txt
static browser shell
GitHub Pages deployment
host runtime
external kit loading
CDN kit import manifest
browser animation frame loop
product game factory
fallback meadow kit
DSK registry and descriptor installer
local DSK validation
external meadow area bridge
external WebGL meadow renderer
render-plan generation
render-plan enhancement
render stats and diagnostics
deterministic state root
scene identity
session identity
player position / yaw / pitch / pathProgress
world wind state
progression objective ledger
story beat ledger
arrival meadow config
path corridor config
focal tree config
terrain/material palette config
grass / flowers / rocks / mushrooms / tree-line config
interaction target registry
objective registry
story beat registry
host input mapping
normalized action frame
movement integration
camera state and render metadata
path-progress sampling
interaction affordance evaluation
inspect event evaluation
story trigger evaluation
objective completion reducer
arrival completion state
save/progression persistence target
minimal HUD / debug HUD
GameHost surface
static smoke validation
DSK registry smoke validation
render-plan smoke validation
deterministic-scene smoke validation
```

## Services identified

### `web-host-dsk`

```txt
loadExternalKits
createMeadowWebglRenderKit
createIntoTheMeadowGame
create animation frame loop
calculate time/dt
call game.tick
call game.getRenderPlan
enhance render plan
call renderer.render
update debug HUD
expose GameHost

target collectKeyboard
target collectPointer
target collectTouch
target normalizeActionFrame
target pass actions into game.tick
```

### `into-the-meadow-game-dsk`

```txt
createIntoTheMeadowGame
createFallbackMeadowAreaKit
installDsks
create meadow area kit instance
createInitialGameState
advanceGameState
getState
getRenderPlan
getDiagnostics
getSnapshot
tick
reset

target reducer composition
target reducer diagnostics
target state version migration seams
```

### `game-composition-dsk`

```txt
installDsks
create local DSK descriptor registry
validate local and external DSKs
enhanceRenderPlan
bind product metadata to render plan
bind render/diagnostics snapshots

target simulation service composition
target action-contract validation
target reducer order validation
```

### `meadow-input-runtime-kit`

```txt
target collectKeyboard
target collectPointerLook
target collectTouchMove
target collectInspectIntent
target normalizeActions
target snapshot
target replay scripted actions for smoke tests
```

### `meadow-player-runtime-kit`

```txt
existing player state fields: position, yaw, pitch, pathProgress

target integrateMovement
target updateYawPitch
target clampToMeadowBounds
target emitPlayerSnapshot
target update camera/player render metadata
target deterministic movement replay
```

### `path-progress-runtime-kit`

```txt
source path: ARRIVAL_MEADOW_CONFIG.features.path.points
objective dependency: walk-the-path completion progressAtLeast 0.35
story dependency: path-discovery trigger path-progress:0.25

target nearestPathSegment
target projectPlayerOntoPath
target calculateProgress01
target detectProgressThresholds
target emit path-progress events
```

### `focal-tree-interaction-runtime-kit`

```txt
source target: ARRIVAL_INTERACTION_TARGETS focal-tree
radius: 4.5
requiredAction: inspect

target proximity check
target facing/view check
target inspect affordance state
target inspect event emission
target one-shot inspect ledger
```

### `story-trigger-runtime-kit`

```txt
source beats: STORY_BEATS
current initial beat: arrival
triggers: scene-start, path-progress:0.25, inspect:focal-tree

target trigger parser
target one-shot story ledger
target event-to-story reducer
target diagnostics for missing trigger handlers
```

### `objective-completion-runtime-kit`

```txt
source objectives: ARRIVAL_OBJECTIVES
objectives: walk-the-path, inspect-tree

target evaluate path-progress objective
target evaluate inspect objective
target completedObjectiveIds reducer
target activeObjectiveId advancement
target completion diagnostics
```

### `arrival-completion-save-kit`

```txt
target derive arrivalComplete when required objectives are complete
target keep deterministic state authoritative
target write persistence only after deterministic completion state is stable
target expose save/progression status in GameHost snapshot
```

### `playable-loop-smoke-kit`

```txt
target script forward path movement
target script inspect:focal-tree
target assert pathProgress increases
target assert path-discovery story beat appears once
target assert walk-the-path completes
target assert focal-tree affordance appears
target assert inspect-tree completes
target assert snapshot determinism across repeated runs
```

## Kits captured

### External reusable kits

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Required v0.1 product DSKs

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

### Runtime cutover kits

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

### New target extraction kits for this pass

```txt
meadow-action-contract-kit
meadow-reducer-order-kit
meadow-gameplay-diagnostics-kit
meadow-scripted-input-smoke-kit
meadow-render-metadata-projection-kit
```

## Key blockers

```txt
advance-game-state-stub:
  advanceGameState() only increments frame and records lastTick.

input-gap:
  web-host.js does not collect keyboard, pointer, touch, or inspect intent yet.

action-contract-gap:
  game.tick accepts input, but there is no stable normalized action shape for host, smoke, or replay callers.

path-progress-gap:
  ARRIVAL_MEADOW_CONFIG defines path points and ARRIVAL_OBJECTIVES requires pathProgress >= 0.35, but no runtime samples progress.

interaction-gap:
  ARRIVAL_INTERACTION_TARGETS defines focal-tree radius and inspect action, but no service computes affordance or inspect events.

story-gap:
  STORY_BEATS defines path-progress and inspect triggers, but there is no trigger parser/evaluator.

objective-gap:
  ARRIVAL_OBJECTIVES defines completion rules, but no reducer updates completedObjectiveIds.

save-gap:
  meadow-save-dsk is planned, but arrival completion state is not derived or persisted.

render-metadata-gap:
  render plans can be enhanced, but player/camera/action state is not yet projected into render metadata for debugging or future renderer support.
```

## Main recommendation

Next slice:

```txt
IntoTheMeadow Action Contract + Objective Smoke Cutover
```

Build order:

```txt
1. Keep index.html and src/boot/boot-game.js thin.
2. Add meadow-action-contract-kit with stable actions: move, look, inspect, reset, debug-toggle.
3. Add host input collection in src/hosts/web-host.js, but keep browser events outside deterministic state.
4. Pass game.tick({ time, dt, actions }) every frame.
5. Split advanceGameState() into ordered reducer services.
6. Add meadow-player-runtime-kit to update position/yaw/pitch from actions.
7. Add path-progress-runtime-kit to sample ARRIVAL_MEADOW_CONFIG.features.path.points.
8. Add story-trigger-runtime-kit to evaluate scene-start, path-progress:0.25, and inspect:focal-tree once.
9. Add focal-tree-interaction-runtime-kit to evaluate proximity/facing/inspect affordance.
10. Add objective-completion-runtime-kit for walk-the-path and inspect-tree.
11. Add arrival-completion-save-kit as a deterministic completion field before adding localStorage.
12. Add meadow-render-metadata-projection-kit for player/camera/objective debug metadata.
13. Add playable-loop-smoke-kit with scripted movement and inspect input.
14. Add diagnostics for reducer order, action counts, objective state, story state, and interaction state.
```

## Acceptance targets

```txt
npm run check
window.GameHost.getState().player.pathProgress increases under scripted movement
path-discovery story beat appears exactly once after pathProgress >= 0.25
walk-the-path completes after pathProgress >= 0.35
focal-tree inspect affordance appears inside target radius
inspect-tree completes after inspect:focal-tree
arrival completion is derived after walk-the-path and inspect-tree are both complete
window.GameHost.getSnapshot() includes player, objective, story, interaction, and completion state
getDiagnostics() reports reducer/action/objective/story/interaction health
scripted smoke can replay the same action frames and produce the same snapshot
```

## One-project constraint

Only `LuminaryLabs-Publish/IntoTheMeadow` was documented in this run. `LuminaryLabs-Publish/TheCavalryOfRome` was not touched.
