# IntoTheMeadow Project Breakdown

- Repo: `LuminaryLabs-Publish/IntoTheMeadow`
- Run timestamp: `2026-07-07T03-28-26-04-00`
- Selected because: it was present in `LuminaryLabs-Publish`, was not `TheCavalryOfRome`, and did not have a central `repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md` entry in `LuminaryLabs-Dev/LuminaryLabs` at the start of this pass.

## Project identity

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game. The repo owns the game/deploy surface and consumes reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

Architecture rule captured by the repo:

```txt
IntoTheMeadow owns the game.
ProtoKits own reusable meadow systems.
NexusEngine owns runtime/DSK contracts.
```

## Current interaction loop

### Browser / runtime loop

1. `index.html` creates a full-screen canvas and HUD shell.
2. `src/boot/boot-game.js` calls `startWebHost()`.
3. `startWebHost()` loads `meadow-area-kit` and `meadow-webgl-render-kit` from CDN URLs declared in `GAME_MANIFEST`.
4. `createIntoTheMeadowGame()` installs local DSK descriptors, creates the arrival meadow area, and creates initial game state.
5. Each animation frame:
   - ticks game state with `{ time, dt }`,
   - gets the meadow render plan,
   - enhances the render plan with local DSK services,
   - renders through the external WebGL render kit,
   - updates debug HUD diagnostics when `?debug` is present.
6. `window.GameHost` exposes `getState()`, `getSnapshot()`, and `getDiagnostics()` for validation and automation.

### Intended player loop

The content already points to a first playable meadow loop:

1. Spawn on the arrival path.
2. Follow the meadow path until progress is high enough.
3. Inspect the old focal tree.
4. Trigger story beats from path progress and inspect actions.
5. Complete `walk-the-path` and `inspect-tree` objectives.
6. Transition to the next meadow story beat / meadow area once scene progression exists.

## Domains in use

### Runtime / composition domains

- Game foundation
- Web host runtime
- Game composition
- Meadow area bridge
- Render host
- Diagnostics
- Performance
- Static Pages deployment

### Meadow simulation / content domains

- Meadow area
- Terrain texturing
- Path corridor
- Grass / vegetation patches
- GPU grass rendering
- Wind weather field
- Tree object styling
- Meadow scatter
- Atmosphere
- Ecology ambience

### Player / progression domains

- Player exploration
- Camera
- Input
- Interaction
- Story flow
- Objective progression
- Audio
- UI
- Save / persistence

### Render pipeline domains

- Post-process stack
- Render target
- Sobel outline pass
- Color grade pass
- Depth fog pass
- Vignette pass
- Final composite pass

## Kits and DSKs

### External kits currently imported

- `meadow-area-kit`
- `meadow-webgl-render-kit`

### Required v0.1 local DSKs

- `into-the-meadow-game-dsk`
- `web-host-dsk`
- `game-composition-dsk`
- `meadow-area-bridge-dsk`
- `meadow-render-host-dsk`
- `meadow-diagnostics-dsk`
- `meadow-performance-dsk`
- `post-process-stack-dsk`
- `static-pages-deploy-dsk`

### Additional planned / registered local DSKs

- `meadow-terrain-texture-dsk`
- `path-corridor-dsk`
- `grass-patch-dsk`
- `gpu-grass-render-dsk`
- `wind-field-dsk`
- `tree-object-dsk`
- `meadow-scatter-dsk`
- `meadow-atmosphere-dsk`
- `meadow-player-dsk`
- `meadow-camera-dsk`
- `meadow-input-dsk`
- `meadow-interaction-dsk`
- `meadow-story-dsk`
- `meadow-objective-dsk`
- `meadow-ecology-dsk`
- `meadow-audio-dsk`
- `meadow-ui-dsk`
- `meadow-save-dsk`
- `render-target-kit`
- `sobel-outline-pass-kit`
- `color-grade-pass-kit`
- `depth-fog-pass-kit`
- `vignette-pass-kit`
- `final-composite-pass-kit`

### Implemented local module services already used by render enhancement

- `tree-object-dsk`
  - Enhances focal trees with stronger branch/root/canopy counts.
  - Adds hero-soft render styling.
- `grass-patch-dsk`
  - Creates grass patch bounds and budgets.
  - Defines near/mid/far LOD policy.
- `wind-field-dsk`
  - Provides wind state.
  - Samples wind at world position and time.
- `meadow-performance-dsk`
  - Provides quality profiles.
  - Computes grass, flower, scatter, treeline, and outline budgets.
- `post-process-stack-dsk`
  - Defines render target, depth fog, color grade, edge outline, vignette, and final composite pass ordering.

## Service surface by kit / DSK

| DSK / kit | Services |
|---|---|
| `into-the-meadow-game-dsk` | game manifest, kit stack registry, game state root, boot sequence, game snapshot |
| `web-host-dsk` | document shell, browser loop, host debug surface, asset loading host, browser safety |
| `game-composition-dsk` | DSK registry, scene composition, render composition, simulation composition, composition validation |
| `meadow-area-bridge-dsk` | meadow area config, feature config, meadow area kit adapter, meadow area state, meadow area validation |
| `meadow-terrain-texture-dsk` | terrain surface model, material layers, path layers, terrain sampler, terrain validation |
| `path-corridor-dsk` | path curve model, walkable corridor, path surface detail, path progression, path validation |
| `grass-patch-dsk` | patch grid, blade distribution, terrain awareness, wind binding, grass validation |
| `gpu-grass-render-dsk` | grass instance buffer, blade mesh, shader wind, grass LOD render, grass render validation |
| `wind-field-dsk` | wind state, wind sampler, wind zones, wind consumers, wind validation |
| `tree-object-dsk` | focal tree model, tree-line model, tree materials, tree wind binding, tree validation |
| `meadow-scatter-dsk` | flower scatter, rock scatter, mushroom scatter, placement rules, scatter validation |
| `meadow-atmosphere-dsk` | sky gradient, sun system, cloud layer, distant hills, atmosphere validation |
| `meadow-player-dsk` | player state, movement profile, terrain contact, player actions, player validation |
| `meadow-camera-dsk` | camera mode, camera rig, camera collision, camera feel, camera validation |
| `meadow-input-dsk` | action map, device bindings, input context, input normalization, input validation |
| `meadow-interaction-dsk` | interactable registry, affordance rules, inspect state, interaction events, interaction validation |
| `meadow-story-dsk` | story state, story beats, dialogue text, sequence runner, story validation |
| `meadow-objective-dsk` | objective model, objective flow, completion ledger, feedback surface, objective validation |
| `meadow-ecology-dsk` | ambient life, ecology zones, ambience triggers, non-gameplay agents, ecology validation |
| `meadow-audio-dsk` | ambient bed, spatial audio cues, audio state, audio events, audio validation |
| `meadow-ui-dsk` | minimal HUD, story text panel, debug UI, UI state, UI validation |
| `meadow-save-dsk` | save model, save slots, persistence adapter, migration, save validation |
| `meadow-diagnostics-dsk` | runtime health, render health, determinism checks, smoke tests, diagnostics report |
| `meadow-performance-dsk` | quality profile, budget policy, LOD policy, adaptive scaling, performance validation |
| `meadow-render-host-dsk` | renderer selection, render plan ingest, pass order, renderer state, renderer validation |
| `post-process-stack-dsk` | pass registry, render target system, Sobel outline pass, color grade pass, post validation |
| `render-target-kit` | scene color texture, depth texture, normal texture, ping-pong buffer, resize policy |
| `sobel-outline-pass-kit` | color/depth/normal edge thresholds, outline color, object mask |
| `color-grade-pass-kit` | warmth, contrast, saturation, shadow tint, highlight tint |
| `depth-fog-pass-kit` | fog near/far/color, distance curve, horizon haze |
| `vignette-pass-kit` | radius, softness, strength, center, quality tier |
| `final-composite-pass-kit` | scene input, post input, output target, debug overlay, fallback composite |
| `static-pages-deploy-dsk` | build config, GitHub Pages workflow, release artifacts, cache invalidation, deploy validation |

## Current content inventory

- Default scene: `arrival-meadow`
- Meadow size: width `90`, depth `110`
- Feature config:
  - path with six points
  - focal tree at `{ x: 0, y: 0, z: 24 }`
  - grass blade count `3600`
  - flowers `420`
  - rocks `46`
  - mushrooms `34`
  - tree line `36`
  - wind strength `0.38`
- Story beats:
  - `arrival`
  - `path-discovery`
  - `focal-tree`
- Objectives:
  - `walk-the-path`
  - `inspect-tree`
- Interaction targets:
  - `focal-tree`
  - `arrival-path`

## Gaps / next work

1. **No real player control yet.** State has a player position and yaw/pitch, but `advanceGameState()` only increments frame and records last tick.
2. **No live objective completion yet.** Objectives exist as content but are not evaluated against player events.
3. **No real inspection flow yet.** Interaction targets exist but are not connected to input, proximity, camera ray, or action events.
4. **Story triggers are content-only.** `path-progress:0.25` and `inspect:focal-tree` are declared but not fired by runtime transitions.
5. **Local DSKs are mostly descriptor-first.** Several DSKs are registered before they have executable service modules.
6. **Meadow-area rendering depends on external CDN kits.** The repo has a fallback meadow kit, but high-fidelity rendering depends on external kit availability.

## Recommended next implementation slice

### Arrival Meadow Playable Loop Cutover

Goal: make the current beautiful meadow scaffold actually playable without bloating the publish repo.

Checklist:

- [ ] Implement `meadow-input-dsk` action map: move, look, inspect, pause/debug.
- [ ] Implement `meadow-player-dsk` movement state: grounded walking, path progress sampling, step smoothing.
- [ ] Implement `meadow-camera-dsk` camera state: first-person or close third-person, look clamp, focal-tree framing.
- [ ] Implement `meadow-interaction-dsk`: proximity candidates, camera-facing affordance, inspect event.
- [ ] Implement `meadow-objective-dsk`: evaluate `walk-the-path` and `inspect-tree` from state events.
- [ ] Implement `meadow-story-dsk`: trigger story beats once from objective/progress/inspect events.
- [ ] Keep reusable terrain/path/grass/wind/render behavior in ProtoKits or formal local DSK service modules.
- [ ] Preserve `window.GameHost.getState()` and `window.GameHost.getDiagnostics()`.
- [ ] Add a deterministic smoke test that simulates path progress and inspection without WebGL.

## Recommended docs cleanup

- Add `.agent/kit-registry.md` or `.agent/kit-registry.json` generated from `src/content/dsk-registry.js`.
- Add a docs note clarifying active executable modules vs descriptor-only planned DSKs.
- Add a next-slice checklist to README after the current milestone.
- Add a `docs/ARRIVAL_MEADOW_PLAYABLE_LOOP.md` design doc before implementing player/input/camera behavior.

## Push log

This run added:

- `.agent/README.md`
- `.agent/trackers/2026-07-07T03-28-26-04-00/project-breakdown.md`

Central tracking expected in `LuminaryLabs-Dev/LuminaryLabs`:

- `repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md`
- `internal-change-log/2026-07-07T03-28-26-04-00-into-the-meadow-breakdown.md`
