# IntoTheMeadow Project Breakdown

- Repo: `LuminaryLabs-Publish/IntoTheMeadow`
- Run timestamp: `2026-07-07T04:41:22-04:00`
- Tracker path: `.agent/trackers/2026-07-07T04-41-22-04-00/project-breakdown.md`
- Central ledger target: `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md`
- Exclusion check: not `TheCavalryOfRome`

## Selection reason

`IntoTheMeadow` was selected as the next eligible follow-up repo after the latest documented Publish ledger pass on `PrehistoricRush`. The repo is inside the `LuminaryLabs-Publish` project lane, is not excluded by the Cavalry rule, and had not yet received a follow-up `.agent/kit-registry.json` pass.

## Source files inspected

- `README.md`
- `package.json`
- `src/boot/boot-game.js`
- `src/hosts/web-host.js`
- `src/game/create-into-the-meadow-game.js`
- `src/game/game-state.js`
- `src/boot/install-dsks.js`
- `src/dsks/index.js`
- `src/content/dsk-registry.js`
- `src/content/game-manifest.js`
- `src/content/meadow-areas/arrival-meadow.js`
- `src/content/objectives/arrival-objectives.js`
- `src/content/story/story-beats.js`
- `src/content/interaction-targets/arrival-targets.js`
- `.agent/README.md`

## Project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, scene composition, story/objective content, repo-local DSK descriptors, diagnostics, static validation, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The current milestone is a v0.1 scaffold and browser proof. The repo already has a thin `index.html` route, boot host, manifest, local DSK registry, external kit imports, content modules, render-plan enhancement, diagnostics, static tests, and GitHub Pages workflow. The main missing slice is playable state: input, movement, camera, proximity inspection, objective completion, and story beat triggering are still descriptor-first or content-only.

## Interaction loop

### Current runtime loop

```txt
browser opens index.html
-> src/boot/boot-game.js finds canvas / HUD / status / loading nodes
-> startWebHost() imports external meadow kits from GAME_MANIFEST
-> createIntoTheMeadowGame() installs local DSK descriptors
-> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG) builds the arrival meadow model
-> exposeGameHost() exposes state, snapshot, diagnostics, and render snapshots
-> requestAnimationFrame frame loop runs at fixed dt = 1/60
-> game.tick({ time, dt }) increments deterministic frame state
-> game.getRenderPlan(time) asks the meadow area kit for a render plan
-> enhanceRenderPlan() applies repo-local visual/performance enhancements
-> meadow-webgl-render-kit renders the plan
-> debug HUD reports validation, DSK count, object count, grass patches, and vertices
```

### Target playable loop

```txt
spawn player at the arrival path
-> read keyboard / pointer / touch input through meadow-input-dsk
-> move along the path with meadow-player-dsk
-> update camera through meadow-camera-dsk
-> sample path progress from path-corridor-dsk
-> trigger path-discovery story beat at path-progress:0.25
-> detect focal tree affordance through meadow-interaction-dsk
-> inspect focal tree
-> complete walk-the-path and inspect-tree objectives
-> record completion in meadow-objective-dsk and meadow-save-dsk
-> expose final state through GameHost for smoke validation
-> unlock the next meadow area / story scene
```

## Domains in use

### Repo foundation domains

- **Game foundation**: manifest, repo identity, build metadata, default scene, public route, snapshot root.
- **Host runtime**: DOM discovery, browser boot, loading state, debug HUD, animation frame loop.
- **Game composition**: external kit loading, local DSK install, state creation, content wiring, render-plan production.
- **DSK registry**: local kit ids, required v0.1 kit ids, external kit ids, descriptor validation.
- **Diagnostics**: validation status, kit counts, content counts, render object counts, GameHost surface.
- **Deployment**: static Pages route and package check scripts.

### World and render domains

- **Meadow area bridge**: adapter from product config into external `meadow-area-kit`.
- **Meadow terrain texture**: material layers, path material bands, terrain sampler, terrain validation.
- **Path corridor**: authored path points, path width, progression sampling, corridor walkability.
- **Vegetation / grass patching**: grass patch model, blade distribution, LOD and budget policy.
- **GPU grass render**: grass instance buffers, shader wind, grass render validation.
- **Wind field**: wind state, wind sampler, wind zones, wind consumers.
- **Tree object**: focal tree model, tree-line model, materials, wind binding.
- **Meadow scatter**: flower, rock, mushroom, and tree-line scatter rules.
- **Atmosphere**: golden-hour style, sky gradient, sun, cloud layer, distant hills.
- **Render host**: render-plan ingest, renderer selection, pass order, renderer state.
- **Post-process stack**: render target, outline, color grade, depth fog, vignette, final composite.
- **Performance**: quality profiles, object budgets, outline policy, adaptive scaling.

### Playable game domains

- **Input**: action map, device bindings, input normalization, input context.
- **Player exploration**: player position, yaw, pitch, movement profile, terrain contact, actions.
- **Camera**: mode, rig, follow / look behavior, collision, camera feel.
- **Interaction**: interactable registry, proximity checks, inspect state, action events.
- **Story flow**: story state, story beats, dialogue text, one-shot trigger runner.
- **Objective progression**: objective model, objective flow, completion ledger, feedback surface.
- **Ecology ambience**: ambient life, ecology zones, non-gameplay agents, ambience triggers.
- **Audio**: ambient bed, spatial cues, audio state, events.
- **UI**: minimal HUD, story panel, debug UI, UI state.
- **Persistence**: save model, slots, persistence adapter, migration.

## Services that the kits offer

### External kits

- `meadow-area-kit`
  - Accepts `ARRIVAL_MEADOW_CONFIG`.
  - Provides `getRenderPlan({ time })`.
  - Provides `getSnapshot()`.
  - Provides `validate()`.
  - Owns reusable meadow-area object generation and validation.

- `meadow-webgl-render-kit`
  - Accepts a canvas.
  - Provides `render(plan)`.
  - Provides render metrics such as vertex counts.
  - Optionally provides `getSnapshot()` for diagnostics.

### Active v0.1 local DSKs

- `into-the-meadow-game-dsk`: `game-manifest`, `kit-stack-registry`, `game-state-root`, `boot-sequence`, `game-snapshot`.
- `web-host-dsk`: `document-shell`, `browser-loop`, `host-debug-surface`, `asset-loading-host`, `browser-safety`.
- `game-composition-dsk`: `dsk-registry`, `scene-composition`, `render-composition`, `simulation-composition`, `composition-validation`.
- `meadow-area-bridge-dsk`: `meadow-area-config`, `meadow-feature-config`, `meadow-area-kit-adapter`, `meadow-area-state`, `meadow-area-validation`.
- `meadow-render-host-dsk`: `renderer-selection`, `render-plan-ingest`, `pass-order`, `renderer-state`, `renderer-validation`.
- `meadow-diagnostics-dsk`: `runtime-health`, `render-health`, `determinism-checks`, `smoke-tests`, `diagnostics-report`.
- `meadow-performance-dsk`: `quality-profile`, `budget-policy`, `lod-policy`, `adaptive-scaling`, `performance-validation`.
- `post-process-stack-dsk`: `pass-registry`, `render-target-system`, `sobel-outline-pass`, `color-grade-pass`, `post-validation`.
- `static-pages-deploy-dsk`: `build-config`, `github-pages-workflow`, `release-artifacts`, `cache-invalidation`, `deploy-validation`.

### Planned local gameplay DSK services

- `meadow-input-dsk`: action map, device bindings, normalized action state.
- `meadow-player-dsk`: player state, movement profile, terrain contact, player action events.
- `meadow-camera-dsk`: camera mode, camera rig, feel tuning, collision guard.
- `meadow-interaction-dsk`: interactable registry, affordance rules, inspect state, interaction events.
- `meadow-story-dsk`: story state, beat triggers, sequence runner, one-shot dialogue events.
- `meadow-objective-dsk`: objective model, completion ledger, objective feedback.
- `meadow-save-dsk`: save model, slots, persistence adapter, migration guard.

### Planned world/render DSK services

- `meadow-terrain-texture-dsk`: terrain material layers, path layers, sampler, validation.
- `path-corridor-dsk`: path curve model, walkable corridor, path detail, progress sampling.
- `grass-patch-dsk`: patch grid, blade distribution, terrain awareness, wind binding.
- `gpu-grass-render-dsk`: grass instance buffers, blade mesh, shader wind, LOD rendering.
- `wind-field-dsk`: wind state, sampler, zones, consumer contracts.
- `tree-object-dsk`: focal tree model, tree line, materials, wind binding.
- `meadow-scatter-dsk`: flowers, rocks, mushrooms, placement rules.
- `meadow-atmosphere-dsk`: sky, sun, clouds, distant hills.
- `meadow-ecology-dsk`: ambient life, ecology zones, ambience triggers.
- `meadow-audio-dsk`: ambient bed, spatial cues, audio events.
- `meadow-ui-dsk`: minimal HUD, story text panel, debug UI.

### Post-process kit services

- `render-target-kit`: scene color, depth, normal textures, ping-pong buffer, resize policy.
- `sobel-outline-pass-kit`: color/depth/normal thresholds, outline color, object mask.
- `color-grade-pass-kit`: warmth, contrast, saturation, shadow tint, highlight tint.
- `depth-fog-pass-kit`: near/far fog, fog color, distance curve, horizon haze.
- `vignette-pass-kit`: radius, softness, strength, center, quality tier.
- `final-composite-pass-kit`: scene input, post input, output target, debug overlay, fallback composite.

## All kits identified

### External kit ids

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Required v0.1 DSK ids

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

### Full local DSK / kit ids

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

## Current strengths

- The repo is already cleanly split as a product repo, not a kit foundry.
- The manifest makes the external CDN imports explicit.
- The DSK registry is deterministic and validates required v0.1 descriptors.
- GameHost already exposes the right smoke-test surfaces.
- Arrival meadow content is compact and well scoped: path, focal tree, grass, flowers, rocks, mushrooms, tree line, wind, and golden-hour style.
- The story and objective modules already define the first two pieces of the intended playable loop.

## Current gaps

- `advanceGameState()` only increments frame and stores the last tick; it does not process player movement, input, objective completion, or story triggers.
- `meadow-input-dsk`, `meadow-player-dsk`, `meadow-camera-dsk`, `meadow-interaction-dsk`, `meadow-story-dsk`, and `meadow-objective-dsk` are declared but not yet executable behavior modules.
- The render plan is not yet tied to a live player/camera state.
- `ARRIVAL_OBJECTIVES` and `STORY_BEATS` describe completions/triggers, but no runtime service evaluates them.
- `ARRIVAL_INTERACTION_TARGETS` describes proximity affordances, but no runtime service resolves interactability.
- No `.agent/kit-registry.json` existed before this pass.

## Recommended next project slice

### Arrival Meadow Playable Loop Cutover

Implement the first real interaction loop while preserving the current static scaffold.

```txt
1. Keep index.html and src/boot/boot-game.js thin.
2. Add an input collector in web-host-dsk that emits normalized actions.
3. Add meadow-input-dsk runtime helpers for move/look/inspect/debug-reset actions.
4. Expand advanceGameState() into a service-composed reducer.
5. Add meadow-player-dsk movement along the arrival path corridor.
6. Add path-corridor-dsk progress sampling against ARRIVAL_MEADOW_CONFIG.features.path.points.
7. Add meadow-camera-dsk camera state in GameHost snapshots and render-plan metadata.
8. Add meadow-interaction-dsk proximity checks for focal-tree and arrival-path.
9. Add meadow-story-dsk one-shot trigger evaluation for arrival/path-discovery/focal-tree.
10. Add meadow-objective-dsk completion evaluation for walk-the-path and inspect-tree.
11. Add deterministic smoke tests for start -> path-progress -> inspect-tree -> objectives complete.
12. Keep reusable terrain/grass/render behavior in ProtoKits or standalone DSK modules.
```

## Ideation for what is next

### Playable prologue

- Start with no menu.
- Fade directly into the meadow path.
- Let the player move slowly along the path.
- Use one short story line at arrival, one at path progress, one at tree inspection.
- Complete the slice when both objectives are done.

### Visual upgrade

- Replace descriptor-level grass with patch bands along the path.
- Add warm golden-hour directional light metadata to render plan.
- Push focal tree as the main silhouette and keep flowers/rocks lower priority.
- Use subtle wind response on grass, mushrooms, and tree canopy.

### Kit promotion route

- Keep story/objective/interaction product-specific until multiple games need them.
- Promote `path-corridor-dsk`, `grass-patch-dsk`, `wind-field-dsk`, and `tree-object-dsk` only after this repo proves executable contracts.
- Treat `meadow-area-kit` and `meadow-webgl-render-kit` as external, stable dependencies.

## Acceptance checks for the next pass

- `npm run check` passes.
- `window.GameHost.getState().player.pathProgress` changes with player movement.
- `window.GameHost.getState().progression.completedObjectiveIds` eventually includes `walk-the-path`.
- Inspecting the focal tree adds `inspect-tree` to completed objectives.
- Story beat ids include `arrival`, `path-discovery`, and `focal-tree` after the full loop.
- GameHost snapshots remain deterministic for a fixed input script.
