# IntoTheMeadow Project Breakdown

**Run timestamp:** `2026-07-07T20:59:30-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Default branch:** `main`

**Selected because:** the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed `IntoTheMeadow` as the oldest eligible tracked non-Cavalry Publish repo after the last `MyCozyIsland` pass.

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Plan ledger

**Goal:** refresh the internal docs for `IntoTheMeadow`, identify the current interaction loop, domains, services, and kits, and narrow the next implementation slice around gameplay reducer authority and snapshot fixtures.

**Checklist**

- [x] Confirmed `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible non-Cavalry repo in the current central rotation.
- [x] Reviewed the public repo route, browser boot, web host, game factory, state, snapshot, objective, interaction, and meadow content files.
- [x] Identified the current interaction loop.
- [x] Identified the target interaction loop.
- [x] Identified domains in use.
- [x] Identified current and needed services.
- [x] Identified external, active local, candidate, next-cut, and deferred kits.
- [x] Defined the next implementation slice.
- [x] Updated root `.agent` docs.
- [x] Prepared central ledger and internal change-log update.

## Selection ledger

```txt
IntoTheMeadow    2026-07-07T19:42:05-04:00  <-- selected
ZombieOrchard    2026-07-07T19:51:43-04:00
HorrorCorridor   2026-07-07T20:00:46-04:00
TheOpenAbove     2026-07-07T20:10:49-04:00
AetherVale       2026-07-07T20:21:40-04:00
PhantomCommand   2026-07-07T20:31:21-04:00
PrehistoricRush  2026-07-07T20:38:27-04:00
MyCozyIsland     2026-07-07T20:50:10-04:00
TheCavalryOfRome excluded
```

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game. It owns the browser route, launch host, game factory, deterministic state root, snapshot seam, local DSK descriptor install, arrival-meadow content, story/objective/interaction descriptors, render enhancement, diagnostics, static smoke scripts, and Pages deployment surface.

The current implementation is visually and structurally ready for a small playable meadow loop, but gameplay authority is still not executable. The web host ticks the game with `{ time, dt }`, and `advanceGameState()` only increments `frame` and writes `lastTick`. The existing player, path, objective, and interaction descriptors are present, but no reducer currently updates path progress, accepts inspect, completes objectives, or projects `snapshot.gameplay`.

## Source facts

```txt
Entry route: index.html
Boot module: src/boot/boot-game.js
Host module: src/hosts/web-host.js
Game factory: src/game/create-into-the-meadow-game.js
State module: src/game/game-state.js
Snapshot module: src/game/game-snapshot.js
Meadow content: src/content/meadow-areas/arrival-meadow.js
Objective content: src/content/objectives/arrival-objectives.js
Interaction targets: src/content/interaction-targets/arrival-targets.js
External kits: meadow-area-kit, meadow-webgl-render-kit
Initial player position: { x: 0, y: 0, z: -36 }
Initial pathProgress: 0
Path point count: 6
Path start: { x: 0, z: -44 }
Path end: { x: 0, z: 20 }
Walk objective: walk-the-path at pathProgress >= 0.35
Inspect objective: inspect-tree after accepted inspect
Inspect target: focal-tree at { x: 0, y: 1.4, z: 24 }, radius 4.5
Arrival path target radius: 32
World wind strength: 0.38
```

## Current interaction loop

```txt
index.html
  -> canvas#scene, debug HUD, loading label
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() installs local DSK descriptors and validates external kit bridges
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> createInitialGameState({ manifest, dskInstall, sceneId })
  -> create meadow WebGL renderer
  -> exposeGameHost({ ...game, renderer, getRenderPlan, getSnapshot })
  -> requestAnimationFrame(frame)
  -> frame(now) computes time
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reads game.getDiagnostics()
  -> loop
```

## Target interaction loop

```txt
spawn player at arrival path
  -> preserve game.tick({ time, dt }) compatibility
  -> allow additive game.tick({ time, dt, actions })
  -> normalize host, scripted, fixture, and replay input into ActionFrame records
  -> sort and freeze ActionBatch records per tick
  -> apply ordered reducer pipeline
  -> every reducer returns ReducerResult
  -> ActionJournal stores accepted, rejected, and no-op actions
  -> ReducerResultJournal stores reducer order, events, diffs, and diagnostics
  -> path reducer samples ARRIVAL_MEADOW_CONFIG.features.path.points
  -> player pathProgress advances deterministically
  -> path threshold event fires once at progress >= 0.35
  -> objective reducer completes walk-the-path
  -> inspect reducer checks scene, payload, target id, distance, duplicate state, and objective state
  -> invalid inspect returns stable rejection reason
  -> valid inspect emits inspect:focal-tree
  -> story/objective reducers complete inspect-tree
  -> arrival completion reducer derives completion after both objectives finish
  -> createGameSnapshot() exposes snapshot.gameplay
  -> GameHost diagnostics include gameplay, reducer, and fixture status
  -> DOM-free fixture runner proves no-op, path walk, invalid inspect, valid inspect, completion, and replay parity
```

## Domains in use

### Runtime and host domains

- `static-browser-shell`
- `github-pages-deployment`
- `browser-boot-runtime`
- `web-host-runtime`
- `external-kit-loading`
- `cdn-kit-import-manifest`
- `animation-frame-loop`
- `debug-hud-runtime`
- `gamehost-state-contract`
- `gamehost-snapshot-contract`
- `gamehost-diagnostics-contract`
- `gamehost-render-snapshot-contract`
- `runtime-compatibility-contract`

### Game composition domains

- `product-game-factory`
- `manifest-authority`
- `dsk-registry`
- `dsk-descriptor-installer`
- `local-dsk-descriptor-validation`
- `external-meadow-area-bridge`
- `external-webgl-meadow-renderer`
- `fallback-meadow-area-kit`
- `deterministic-state-root`
- `scene-identity`
- `session-identity`
- `tick-clock`
- `last-tick-diagnostics`
- `content-pack-authority`

### Meadow content domains

- `arrival-meadow-content`
- `arrival-path-content`
- `focal-tree-content`
- `grass-content`
- `flower-content`
- `rock-content`
- `mushroom-content`
- `tree-line-content`
- `terrain-material-palette`
- `world-wind-state`
- `story-beat-ledger`
- `objective-ledger`
- `interaction-target-registry`

### Render domains

- `render-plan-generation`
- `render-plan-enhancement`
- `grass-patch-render-metadata`
- `wind-field-render-metadata`
- `post-process-stack-metadata`
- `outline-policy-metadata`
- `render-stats-diagnostics`
- `webgl-renderer-snapshot`

### Gameplay authority domains needed next

- `host-input-ingress`
- `scripted-input-domain`
- `fixture-input-domain`
- `replay-input-domain`
- `action-frame-contract`
- `action-batch-contract`
- `action-journal-contract`
- `action-frame-normalization`
- `action-acceptance-policy`
- `action-rejection-policy`
- `reducer-result-contract`
- `reducer-result-journal`
- `ordered-reducer-pipeline`
- `player-path-reducer`
- `path-point-sampling`
- `nearest-path-segment-sampling`
- `path-progress-threshold-detection`
- `gameplay-event-contract`
- `gameplay-event-journal`
- `interaction-affordance-evaluation`
- `focal-tree-proximity-check`
- `focal-tree-facing-check`
- `inspect-event-evaluation`
- `story-trigger-evaluation`
- `objective-state-authority`
- `objective-completion-evaluation`
- `arrival-completion-state`
- `gameplay-snapshot-contract`
- `gameplay-render-metadata-projection`
- `deterministic-replay-domain`
- `fixture-replay-domain`
- `playable-loop-smoke-target`

## Services currently offered

### Browser and host services

- Serve the static route.
- Select canvas, HUD, status, and loading DOM nodes.
- Start the web host.
- Load external kit modules from the game manifest.
- Create the meadow game object.
- Create the meadow WebGL renderer.
- Maintain the animation frame loop.
- Tick the game with stable `time` and fixed `dt`.
- Generate and enhance render plans.
- Render the plan.
- Expose `window.GameHost`.
- Surface debug HUD diagnostics when `?debug` is enabled.

### Game factory and state services

- Install local DSK descriptors.
- Validate external kit availability.
- Create a fallback meadow area kit if external area kit is unavailable.
- Create the arrival meadow kit from `ARRIVAL_MEADOW_CONFIG`.
- Create deterministic initial state.
- Track manifest version, frame, active scene, active session, player transform, world wind, story beats, objective state, and DSK install snapshot.
- Increment `frame` and write `lastTick`.
- Create the root game snapshot.
- Validate snapshot presence of manifest, state, render plan, and diagnostics.

### Content services

- Provide arrival meadow dimensions, anchor, path points, focal tree, grass, flowers, rocks, mushrooms, tree line, wind, style, and material palette.
- Provide story beats.
- Provide `walk-the-path` and `inspect-tree` objective descriptors.
- Provide `focal-tree` and `arrival-path` interaction target descriptors.

### Validation services

- Static smoke.
- DSK registry smoke.
- Render plan smoke.
- Deterministic scene smoke.

## Services needed next

- Normalize raw/scripted fixture input into `ActionFrame` records.
- Batch, sort, de-dupe, and freeze action frames.
- Emit `ActionResult` records for accepted, rejected, and no-op inputs.
- Maintain `ActionJournal` and `ReducerResultJournal` state.
- Run an ordered reducer pipeline.
- Sample path progress from the six source-owned path points.
- Update player position and path progress deterministically.
- Emit one-shot threshold events.
- Complete objectives from descriptor-owned conditions.
- Evaluate `focal-tree` inspect affordance against target id, radius, scene, payload, and duplicate state.
- Return stable inspect rejection reasons.
- Emit story, objective, completion, and diagnostic events.
- Project `snapshot.gameplay`.
- Add `GameHost` gameplay diagnostics.
- Run DOM-free fixture scripts and replay parity smoke.

## Kits identified

### External kits

```txt
meadow-area-kit
  provides: createMeadowAreaKit, getRenderPlan, getSnapshot, validate

meadow-webgl-render-kit
  provides: createMeadowWebglRenderKit, render, getSnapshot
```

### Active local DSKs

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

### Full local inventory

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

### Next-cut kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-journal-kit
meadow-action-result-contract-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-action-source-fixture-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-result-journal-kit
meadow-reducer-seed-fixture-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
path-threshold-event-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
inspect-result-reducer-kit
story-trigger-runtime-kit
objective-state-authority-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
gameplay-snapshot-fixture-kit
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

### Deferred kits

```txt
first-person-pointer-lock-kit
meadow-camera-smoothing-kit
meadow-save-persistence-kit
meadow-audio-ambient-kit
meadow-audio-interaction-kit
meadow-ui-objective-card-kit
meadow-accessibility-options-kit
meadow-protokit-promotion-kit
```

## Active blockers

1. `advanceGameState()` is still only a clock/frame reducer.
2. No `ActionFrame` or `ActionResult` contract exists.
3. No reducer result contract exists for accepted/rejected/no-op gameplay.
4. No path progress reducer uses the six path source points.
5. No inspect reducer evaluates the `focal-tree` target.
6. Objective completion is descriptor-ready but not runtime-driven.
7. `createGameSnapshot()` has no dedicated `gameplay` projection.
8. Existing smokes do not prove DOM-free gameplay replay parity.

## Recommended next slice

**Build target:** `IntoTheMeadow Reducer Result Runtime Gate + Gameplay Snapshot Fixture Lock`

```txt
preserve current static route, host, renderer, GameHost, and game.tick({ time, dt }) behavior
  -> add additive game.tick({ time, dt, actions }) support
  -> create ActionFrame and ActionBatch contracts
  -> create ActionResult and ReducerResult contracts
  -> add accepted/rejected/no-op journals
  -> add reducer pipeline with a no-op seed reducer first
  -> add path-progress reducer using ARRIVAL_MEADOW_CONFIG.features.path.points
  -> complete walk-the-path when pathProgress >= 0.35
  -> add focal-tree affordance and inspect reducer using ARRIVAL_INTERACTION_TARGETS
  -> reject unsupported, invalid_scene, invalid_payload, wrong_target, out_of_range, duplicate_event, and no_effect cases
  -> accept inspect:focal-tree when constraints pass
  -> complete inspect-tree and derive arrival completion
  -> add snapshot.gameplay with player, actions, reducers, events, objectives, story, interaction, completion, and render metadata
  -> add GameHost gameplay diagnostics
  -> add DOM-free fixtures for no-op tick, path walk, invalid inspect, valid inspect, objective completion, and replay parity
```

## Definition of done for the next implementation

- Existing visual page still boots.
- Existing static tests still pass.
- `game.tick({ time, dt })` remains compatible.
- `game.tick({ time, dt, actions })` returns deterministic state.
- `window.GameHost.getSnapshot().gameplay` exists.
- Invalid inspect does not mutate state and returns a stable rejection reason.
- Valid inspect completes `inspect-tree` after path progress objective is complete or when its preconditions are satisfied by fixture setup.
- Replay fixtures produce identical gameplay snapshots across repeated runs.

## No runtime changes in this pass

This run only updates `.agent` documentation and central repo ledger documentation. No product runtime source files changed.
