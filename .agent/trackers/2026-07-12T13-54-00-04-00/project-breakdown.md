# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T13-54-00-04-00`  
**Branch:** `main`  
**Mode:** documentation-only central reconciliation

## Summary

`IntoTheMeadow` was selected because its repo-local grass visibility/LOD audit at `2026-07-12T13-38-52-04-00` was newer than the central ledger at `2026-07-12T11-29-40-04-00`. This run preserves the source-backed finding, refreshes the root `.agent` entrypoints, adds a new audit family, and synchronizes the central ledger without changing runtime code.

The active grass path declares near, mid, far and terrain-tint tiers, but patch creation permanently chooses only near or mid batches from density. The distance policy is not consumed, far and terrain-tint are unreachable from placement, every grass instance is baked into one static mesh, and the renderer draws the complete mesh in both outline and color passes.

## Plan ledger

**Goal:** align repo-local and central documentation around one camera-bound grass visibility authority while preserving the complete interaction, domain, kit and service inventory.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Prioritize its newer repo-local audit over the oldest-documented fallback.
- [x] Re-read grass placement, LOD, mesh, renderer and proof findings.
- [x] Identify the interaction loop and all active domains.
- [x] Reconcile one external provider plus 43 local kit declarations and services.
- [x] Add timestamped architecture, render, gameplay, interaction, grass, central-sync and deploy audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute grass visibility/LOD authority later.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      central 2026-07-12T11-29-40-04-00; repo-local 2026-07-12T13-38-52-04-00; selected
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> import commit-pinned meadow-area provider
  -> install 43 local declarations plus one external provider
  -> create immutable game and source render plan
  -> create performance, wind and post-process descriptors
  -> generate grass density texture and clump archetypes
  -> create near, mid and far static batches
  -> create patch grid and instances
  -> choose near or mid batch from density
  -> flatten every instance into draw groups
  -> attach four-tier LOD policy without consuming pick(distance)
  -> build one static CPU mesh and topology key
  -> create WebGL renderer, GameHost and editor bridge
  -> start RAF

browser frame
  -> tick immutable game with fixed 1/60 dt
  -> reuse enhanced plan and static mesh
  -> resize canvas and derive camera matrices
  -> upload wind, time, light and outline uniforms
  -> draw the entire mesh as outline
  -> draw the entire mesh as color
  -> publish aggregate counts and cache snapshot
  -> schedule successor RAF

proof path
  -> Node checks validate descriptors, topology and mesh array alignment
  -> browser checks validate page/editor/GPU markers and screenshot size
  -> no fixture moves the camera through LOD bands or outside patch frusta
  -> no frame receipt names the accepted grass visible set
```

## Source-backed finding

```txt
declared LOD tiers: near, mid, far, terrain-tint
policy API: grass-lod-policy-kit.pick(distance)
active calls to pick(distance): 0
placement rule: density > 0.55 => near; otherwise mid
far selected by placement: no
terrain-tint representation: absent
culled representation: absent
patch bounds/frustum classification: absent
hysteresis: absent
visible patch/instance/vertex/draw budgets: absent
all grass baked into one mesh: yes
full-mesh draw passes per frame: 2
```

## Domains in use

```txt
browser shell, loading and fatal projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
immutable game manifest, state, tick, reset, snapshot and diagnostics
runtime session, RAF clock and reset epoch
camera descriptors, viewport and browser-view observation
terrain and path generation, material layers and sampling
grass density textures and quality scaling
grass clump archetypes and static batch generation
patch-grid creation and density-driven instance placement
draw-group aggregation and wind shader binding
grass distance bands, frustum classification and hysteresis
grass visible-set, mesh, vertex and draw-budget admission
terrain-tint representation and transition policy
wind fields and shader animation
flowers, rocks, mushrooms, ground cover, distant trees and focal tree
render-plan enhancement, validation and topology caching
CPU mesh construction and immutable vertex payloads
WebGL context, program, buffers, uniforms and draw submission
renderer snapshots and committed-frame observation
player, input, interaction, objective, story, ecology, audio, UI and persistence
GameHost publication and raw runtime reachability
browser editor capabilities, capture and error observation
Node headless editor, scenarios and artifact output
validation, static build and GitHub Pages deployment
```

## Kit and service inventory

### External provider

- `meadow-area-kit`: area/path/style/material normalization; deterministic seeded scatter; grass, flower, rock, mushroom and tree descriptors; wind and atmosphere descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter.

### Local declarations

- `into-the-meadow-game-dsk`: game manifest, kit-stack registry, state root, boot sequence, snapshots.
- `web-host-dsk`: document shell, browser loop, host diagnostics, asset loading, browser safety.
- `game-composition-dsk`: DSK registry, scene/render/simulation composition, composition validation.
- `meadow-area-bridge-dsk`: area and feature config, provider adapter, state and validation.
- `meadow-terrain-texture-dsk`: terrain surface, material layers, path layers, sampler and validation.
- `path-corridor-dsk`: path curve, walkable corridor, detail, progression and validation.
- `grass-density-texture-kit`: density model, channels, compositor, sampler and validation.
- `grass-clump-archetype-kit`: clump registry, card layouts, atlas binding, variants and validation.
- `grass-static-batch-kit`: clump mesh builder, variant cache, atlas material, static batch LOD and validation.
- `grass-patch-placement-kit`: patch grid, density placement, instance selection/buffer and validation.
- `grass-clump-instancing-render-kit`: batch registry, instance stream, draw groups, shader binding and validation.
- `grass-shader-wind-kit`: wind uniforms, tip bend, phase field, gust response and validation.
- `grass-lod-policy-kit`: near, mid, far, terrain-tint policies and validation.
- `grass-density-scaling-kit`: quality, budget, density and profile scaling plus validation.
- `grass-debug-visualization-kit`: density, patch, instance and LOD views plus validation.
- `grass-patch-dsk`: patch grid, blade distribution, terrain awareness, wind binding and validation.
- `gpu-grass-render-dsk`: instance buffer, blade mesh, shader wind, LOD rendering and validation.
- `wind-field-dsk`: wind state, sampler, zones, consumers and validation.
- `tree-object-dsk`: focal tree, tree line, materials, wind binding and validation.
- `meadow-scatter-dsk`: flower, rock and mushroom scatter, placement rules and validation.
- `meadow-atmosphere-dsk`: sky, sun, clouds, distant hills and validation.
- `meadow-player-dsk`: player state, movement, terrain contact, actions and validation.
- `meadow-camera-dsk`: camera mode, rig, collision, feel and validation.
- `meadow-input-dsk`: action map, device bindings, context, normalization and validation.
- `meadow-interaction-dsk`: interactable registry, affordances, inspection, events and validation.
- `meadow-story-dsk`: story state, beats, dialogue, sequence runner and validation.
- `meadow-objective-dsk`: objective model/flow, completion ledger, feedback and validation.
- `meadow-ecology-dsk`: ambient life, zones, triggers, non-gameplay agents and validation.
- `meadow-audio-dsk`: ambient bed, spatial cues, audio state/events and validation.
- `meadow-ui-dsk`: minimal HUD, story panel, debug UI, UI state and validation.
- `meadow-save-dsk`: save model, slots, persistence adapter, migration and validation.
- `meadow-diagnostics-dsk`: runtime/render health, determinism checks, smokes and reports.
- `meadow-performance-dsk`: quality profile, budgets, LOD, adaptive scaling and validation.
- `meadow-render-host-dsk`: renderer selection, plan ingest, pass order, state and validation.
- `meadow-webgl-renderer-v2-kit`: context, program, attributes/uniforms, CPU mesh, GPU buffers, draws, resize, snapshot and disposal.
- `post-process-stack-dsk`: pass registry, targets, Sobel outline, grade and validation.
- `render-target-kit`: color/depth/normal textures, ping-pong buffers and resize policy.
- `sobel-outline-pass-kit`: color/depth/normal thresholds, outline color and mask.
- `color-grade-pass-kit`: warmth, contrast, saturation, shadow and highlight tint.
- `depth-fog-pass-kit`: near/far fog, color, curve and horizon haze.
- `vignette-pass-kit`: radius, softness, strength, center and quality tier.
- `final-composite-pass-kit`: scene/post inputs, output target, debug overlay and fallback composite.
- `static-pages-deploy-dsk`: build config, Pages workflow, artifacts, cache invalidation and deploy validation.

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Required transaction

```txt
committed camera, viewport, topology, policy and performance revisions
  -> create GrassVisibilityCommand
  -> classify stable patch bounds against the current frustum
  -> measure camera distance to admitted bounds
  -> choose near, mid, far, terrain-tint or culled
  -> apply entry/exit hysteresis against predecessor tier
  -> enforce patch, instance, vertex and draw budgets
  -> construct immutable GrassVisibilityResult
  -> reject stale input generations
  -> build and install candidate visible mesh/draw generation
  -> preserve predecessor after candidate failure
  -> publish bounded per-tier observations
  -> acknowledge first visible frame with the same visibility revision
```

## Validation boundary

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
package scripts or dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser/Pages smoke: not run
grass visibility fixtures: unavailable
```
