# Project Breakdown: IntoTheMeadow Runtime Renderer Identity

**Timestamp:** `2026-07-15T20:38:13-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed runtime source revision:** `105a8fb0d06aa3e5e9d00203b96a973963d5fe21`  
**Reviewed pre-audit documentation head:** `a502f9789573704c81f05510d51a5e0deac52dde`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Summary

IntoTheMeadow declares the base WebGL renderer in `game.manifest.json` and `GAME_MANIFEST`, but the browser host directly imports a compatibility wrapper that proxies WebGL contexts and normalizes shader float precision. The wrapper is operational behavior, not a naming-only alias.

The required `meadow-webgl-renderer-v2-kit` is present in both the local and required-v0.1 registries, but `src/dsks/index.js` supplies neither an explicit domain label nor explicit services for it. Its descriptor therefore advertises generic fallback services instead of its actual renderer capabilities. Existing static, mesh and headless checks do not prove manifest, descriptor and executable renderer convergence.

## Plan ledger

**Goal:** preserve render-plan and WebGL ownership while defining one revision-bound renderer identity shared by manifests, DSK services, executable selection and proof.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledger entries and ten root `.agent` states.
- [x] Compare each eligible `main` head with its documented repo-local head.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` using the oldest synchronized timestamp.
- [x] Inspect both manifests, browser host, renderer wrapper, DSK registry, DSK descriptor, static smoke, renderer smoke and headless environment.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Preserve all 44 declared kit surfaces.
- [x] Add the timestamped renderer-identity audit family under root `.agent`.
- [x] Change documentation only and push directly to `main`.
- [x] Create no branch or pull request.
- [ ] Implement renderer identity admission and executable fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: IntoTheMeadow
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T15-41-21-04-00
next oldest eligible repository: PrehistoricRush at 2026-07-15T16-00-32-04-00
```

## Complete interaction loop

```txt
document boot
  -> index.html loads src/boot/boot-game.js
  -> boot queries canvas, HUD, status and loading elements
  -> startWebHost imports the pinned external meadow-area-kit
  -> createIntoTheMeadowGame installs local DSK descriptors
  -> web-host.js imports meadow-webgl-renderer-v2-compatible.js directly
  -> compatible renderer imports meadow-webgl-renderer-v2.js as its base
  -> compatible renderer proxies canvas.getContext
  -> compatible context records shader types
  -> shaderSource strips existing float precision and prepends mediump
  -> base renderer creates the accepted WebGL renderer
  -> editor bridge and GameHost are published
  -> recursive RAF begins

normal frame
  -> game.tick advances frame/time state
  -> game builds the raw meadow render plan
  -> enhancer creates and validates render-plan v2
  -> compatible renderer projects the visible frame
  -> GameHost snapshots expose game, enhancer and renderer state

identity and proof surfaces
  -> game.manifest.json declares meadow-webgl-renderer-v2.js
  -> GAME_MANIFEST declares meadow-webgl-renderer-v2.js
  -> dsk-registry requires meadow-webgl-renderer-v2-kit
  -> DSK descriptor falls back to generic services
  -> static smoke checks only the renderer factory token
  -> renderer smoke validates enhanced plan and mesh data
  -> headless environment produces mesh/SVG observations
  -> no proof binds the declared module to the executable wrapper and first browser frame
```

## Main findings

### Declared and executable modules diverge

```txt
JSON manifest module:       ./src/renderers/meadow-webgl-renderer-v2.js
JavaScript manifest module: ./src/renderers/meadow-webgl-renderer-v2.js
browser host import:        ./src/renderers/meadow-webgl-renderer-v2-compatible.js
```

The compatibility wrapper changes shader submission. It removes existing float precision declarations from graphics shaders and prepends `precision mediump float;` before forwarding the source to WebGL.

### Required renderer DSK is under-described

`meadow-webgl-renderer-v2-kit` is required for v0.1 but absent from `DOMAIN_LABELS` and `SERVICES`. `createDskDescriptor()` therefore uses the fallback service set:

```txt
model
state
events
validation
snapshot
```

Those services do not identify the implementation's context creation, shader compilation, attribute/uniform binding, mesh ingestion, GPU buffers, drawing, resizing, snapshot and disposal responsibilities.

### Existing proof can pass without identity convergence

- Static smoke requires the base renderer file and checks that `web-host.js` contains `createMeadowWebglRendererV2`, but does not assert the exact imported module.
- Renderer-v2 smoke validates render-plan descriptors and mesh buffers, but does not instantiate the base or compatible WebGL renderer.
- The Node headless environment uses mesh observation and generated SVG output, not the browser renderer or compatibility wrapper.

## Domains in use

```txt
repository and audit identity
browser document startup and host bootstrap
external provider manifest and dynamic import
local DSK registry and descriptor construction
game composition and state tick
renderer manifest identity and revision
renderer selection and module loading
compatibility wrapper and shader precision policy
WebGL context proxy and shader submission
render-plan generation enhancement and validation
mesh construction GPU resource and frame presentation
GameHost and editor capability publication
static smoke mesh smoke and headless observation
source build Pages and central tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned renderer-identity authority surfaces: 19
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | Area/path/style normalization, deterministic scatter, render-plan generation, validation, snapshot and reset adaptation. |
| `into-the-meadow-game-dsk` | Manifest, kit stack, root game state, boot sequence and snapshots. |
| `web-host-dsk` | Document shell, browser loop, debug host, asset loading and browser safety. |
| `game-composition-dsk` | Registry, scene/render/simulation composition and validation. |
| `meadow-area-bridge-dsk` | Meadow configuration, provider adapter, area state and validation. |
| `meadow-terrain-texture-dsk` | Terrain model, materials, path layers, sampling and validation. |
| `path-corridor-dsk` | Path curve, corridor, detail, progression and validation. |
| `grass-density-texture-kit` | Density channels, composition, sampling and validation. |
| `grass-clump-archetype-kit` | Clump registry, card layout, atlas binding and variants. |
| `grass-static-batch-kit` | Clump meshes, variant cache, atlas material and static LOD. |
| `grass-patch-placement-kit` | Patch grid, density placement, instance selection and buffers. |
| `grass-clump-instancing-render-kit` | Batch registry, instance stream, draw groups and shader binding. |
| `grass-shader-wind-kit` | Wind uniforms, tip bend, phase field and gust response. |
| `grass-lod-policy-kit` | Near, mid, far and terrain-tint LOD policy. |
| `grass-density-scaling-kit` | Quality, budget, density and profile scaling. |
| `grass-debug-visualization-kit` | Density, patch, instance and LOD views. |
| `grass-patch-dsk` | Patch grid, blade distribution, terrain awareness and wind binding. |
| `gpu-grass-render-dsk` | Instance buffers, blade mesh, shader wind and LOD rendering. |
| `wind-field-dsk` | Wind state, sampling, zones and consumers. |
| `tree-object-dsk` | Focal tree, tree line, materials and wind binding. |
| `meadow-scatter-dsk` | Flower, rock and mushroom scatter and placement rules. |
| `meadow-atmosphere-dsk` | Sky, sun, clouds and distant hills. |
| `meadow-player-dsk` | Player state, movement, terrain contact and actions. |
| `meadow-camera-dsk` | Camera mode, rig, collision and feel. |
| `meadow-input-dsk` | Action map, bindings, contexts and normalization. |
| `meadow-interaction-dsk` | Interactable registry, affordances, inspection and events. |
| `meadow-story-dsk` | Story state, beats, dialogue and sequences. |
| `meadow-objective-dsk` | Objective model, flow, completion and feedback. |
| `meadow-ecology-dsk` | Ambient life, zones, triggers and non-gameplay agents. |
| `meadow-audio-dsk` | Ambient bed, spatial cues, audio state and events. |
| `meadow-ui-dsk` | Minimal HUD, story panel, debug UI, UI state and validation. |
| `meadow-save-dsk` | Save model, slots, persistence adapter and migration. |
| `meadow-diagnostics-dsk` | Runtime/render health, determinism checks and smoke reports. |
| `meadow-performance-dsk` | Quality profile, budgets, LOD and adaptive scaling. |
| `meadow-render-host-dsk` | Renderer selection, render-plan ingest, pass order, state and validation. |
| `meadow-webgl-renderer-v2-kit` | Implementation provides context, shaders, attributes, uniforms, mesh ingest, buffers, draw, resize, snapshot and disposal; current DSK descriptor exposes only generic fallback services. |
| `post-process-stack-dsk` | Pass registry, ordered enablement, settings and structural validation. |
| `render-target-kit` | Scene color, depth, normal and ping-pong buffers plus resize policy. |
| `sobel-outline-pass-kit` | Color/depth/normal thresholds, outline color and object mask. |
| `color-grade-pass-kit` | Warmth, contrast, saturation and tonal tint. |
| `depth-fog-pass-kit` | Fog range, color, curve and horizon haze. |
| `vignette-pass-kit` | Radius, softness, strength, center and quality tier. |
| `final-composite-pass-kit` | Scene/post inputs, output, debug overlay and fallback composite. |
| `static-pages-deploy-dsk` | Build configuration, Pages workflow, artifacts, cache invalidation and deploy validation. |

## Required parent domain

`meadow-runtime-renderer-identity-manifest-proof-authority-domain`

## Required transaction

```txt
RendererIdentityAdmissionCommand
  -> bind manifest, DSK registry, host, module, build and deployment revisions
  -> resolve one immutable RendererIdentityDescriptor
  -> name the base module, compatibility wrappers and exact executable module
  -> bind shader precision and WebGL context policies
  -> validate DSK services against implementation capabilities
  -> reject missing, stale, duplicate or divergent renderer identities
  -> create one RendererGeneration
  -> bind context and GPU resources to that generation
  -> publish RendererIdentityAdmissionResult
  -> project one matching frame
  -> acknowledge FirstRendererIdentityFrameAck
  -> retire the module chain exactly once
```

## Planned coordinating kits

```txt
meadow-runtime-renderer-identity-manifest-proof-authority-domain
renderer-manifest-source-kit
renderer-executable-module-kit
renderer-revision-identity-kit
renderer-wrapper-chain-kit
shader-precision-compatibility-policy-kit
webgl-context-proxy-policy-kit
renderer-capability-descriptor-kit
renderer-dsk-service-contract-kit
renderer-selection-admission-kit
manifest-runtime-convergence-kit
renderer-identity-admission-result-kit
renderer-generation-lifecycle-kit
browser-renderer-instantiation-fixture-kit
shader-precision-compile-fixture-kit
base-wrapper-equivalence-fixture-kit
headless-browser-renderer-parity-kit
source-build-pages-renderer-parity-kit
first-renderer-identity-frame-ack-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, manifests, DSK registry, DSK descriptors, shader source, renderer behavior, editor behavior, tests, dependencies, workflows and deployment were not changed. No shader failure, renderer incompatibility, manifest consumer failure, identity convergence, source/build/Pages parity or production readiness is claimed.
