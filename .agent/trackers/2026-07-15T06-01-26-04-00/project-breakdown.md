# Project Breakdown: IntoTheMeadow Shader Precision Capability Admission

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `7bd3e6eae676a6279684b54e71b8f0c66b57e75b`  
**Status:** `shader-precision-capability-admission-authority-audited`

## Summary

IntoTheMeadow wraps its real WebGL context so every graphics shader source is rewritten before compilation. The wrapper removes every explicit `lowp`, `mediump`, or `highp` floating-point precision declaration and prepends `precision mediump float;` to both vertex and fragment shaders.

The base vertex shader contains no explicit precision declaration, while the base fragment shader already requests `mediump`. The compatibility wrapper therefore changes the vertex source and would also silently downgrade any future shader that explicitly requires `highp`. No device precision capability query, authored requirement descriptor, transformed-source fingerprint, fallback result, warning receipt, renderer snapshot field, or cross-device fixture records this mutation.

## Plan ledger

**Goal:** preserve renderer compatibility without silently replacing authored shader precision requirements or accepting a compiled program whose effective precision policy is unknown.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Compare each eligible `main` head with its recorded repo-local documentation head.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only `IntoTheMeadow` by the oldest synchronized central timestamp.
- [x] Inspect the precision-safe compatibility wrapper, base renderer shader sources, compile/link path, renderer snapshot, render smoke and browser observation proof.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Add the timestamped shader-precision audit family.
- [x] Change documentation only and target `main`.
- [x] Create no branch or pull request.
- [ ] Implement precision admission and executable device fixtures later.

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
prior central timestamp: 2026-07-15T01-39-38-04-00
next oldest eligible repository: HorrorCorridor at 2026-07-15T02-00-17-04-00
```

## Complete interaction loop

```txt
document boot
  -> import pinned meadow provider
  -> create game, renderer and render-plan enhancer
  -> publish GameHost and NexusEditorEnvironment
  -> start recursive RAF

renderer creation
  -> compatibility wrapper proxies canvas.getContext
  -> base renderer requests WebGL2 or WebGL
  -> compatibility wrapper proxies createShader and shaderSource
  -> shader type is recorded in a WeakMap

shader submission
  -> remove every explicit float precision declaration
  -> prepend precision mediump float
  -> submit transformed vertex source
  -> submit transformed fragment source
  -> compile and link the program
  -> expose no transformed-source identity or precision result

normal frame
  -> game.tick
  -> build and validate render plan
  -> renderer.render
  -> update topology/cache/render snapshot
  -> snapshot omits effective shader precision and source fingerprint

validation
  -> renderer-v2 smoke validates render-plan and mesh data only
  -> browser observation proves a screenshot and completed frame marker
  -> no fixture queries precision capability or compares precision variants
```

## Main findings

### Precision policy is imposed outside the renderer contract

The compatibility wrapper applies one global source transform to every graphics shader. It does not consume a renderer descriptor stating the required precision for each stage and does not publish a result explaining why a transform was needed.

### Vertex and fragment stages are treated as equivalent

The base vertex source has no explicit precision declaration. The wrapper injects `mediump` into it. The fragment source already declares `mediump`, so the same transform has a different semantic effect by stage.

### Explicit high precision would be silently removed

The regular expression removes `highp` declarations as well as `lowp` and `mediump`. A future shader can request `highp`, compile after being rewritten to `mediump`, and still produce a normal renderer snapshot.

### Capability and fallback evidence is absent

```txt
gl.getShaderPrecisionFormat query: absent
vertex precision requirement descriptor: absent
fragment precision requirement descriptor: absent
precision fallback order: absent
transformed-source hash: absent
original-source hash: absent
precision warning receipt: absent
compile result with effective policy: absent
renderer snapshot precision fields: absent
cross-device precision fixture: absent
visual differential fixture: absent
```

### Current tests do not execute the precision wrapper

`tests/renderer-v2-smoke.mjs` validates enhanced descriptors and generated mesh buffers. It does not create a WebGL context, compile shaders, inspect transformed source, query precision capability, or compare output across precision policies.

## Domains in use

```txt
repository and audit identity
browser startup and external provider admission
DSK and game composition
game-state tick and reset
browser RAF scheduling
render-plan generation, enhancement and validation
mesh generation and topology caching
canvas and WebGL context acquisition
shader source identity and stage classification
device shader precision capability
precision requirement and fallback policy
shader source transformation
shader compile and program link settlement
renderer snapshot and diagnostic publication
browser editor and capture surfaces
visual differential and cross-device proof
build, Pages and central tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned shader-precision authority surfaces: 18
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
| `meadow-ui-dsk` | HUD, story panel, debug UI and UI state. |
| `meadow-save-dsk` | Save model, slots, persistence adapter and migration. |
| `meadow-diagnostics-dsk` | Runtime/render health, determinism checks and smoke reports. |
| `meadow-performance-dsk` | Quality profile, budgets, LOD and adaptive scaling. |
| `meadow-render-host-dsk` | Renderer selection, plan ingest, pass order and state. |
| `meadow-webgl-renderer-v2-kit` | Context, shaders, attributes, uniforms, mesh ingest, buffers, draw, resize, snapshot and disposal. |
| `post-process-stack-dsk` | Pass registry, ordered enablement, settings and structural validation. |
| `render-target-kit` | Scene color, depth, normal and ping-pong buffers plus resize policy. |
| `sobel-outline-pass-kit` | Color/depth/normal thresholds, outline color and object mask. |
| `color-grade-pass-kit` | Warmth, contrast, saturation and tonal tint. |
| `depth-fog-pass-kit` | Fog range, color, curve and horizon haze. |
| `vignette-pass-kit` | Radius, softness, strength, center and quality tier. |
| `final-composite-pass-kit` | Scene/post inputs, output, debug overlay and fallback composite. |
| `static-pages-deploy-dsk` | Build configuration, Pages workflow, artifacts, cache invalidation and deploy validation. |

## Required parent domain

`meadow-shader-precision-capability-admission-authority-domain`

## Required transaction

```txt
ShaderProgramAdmissionCommand
  -> bind RendererGeneration, ProgramId and source revisions
  -> classify vertex and fragment stages independently
  -> query device precision capabilities
  -> resolve authored precision requirements and fallback order
  -> reject unsupported mandatory requirements
  -> transform source only through an accepted policy
  -> fingerprint original and effective source
  -> compile and link detached candidates
  -> publish ShaderTransformResult and ShaderProgramAdmissionResult
  -> atomically adopt the accepted program
  -> expose effective precision in renderer diagnostics and snapshots
  -> publish FirstPrecisionAdmittedFrameAck
```

## Planned coordinating kits

```txt
meadow-shader-precision-capability-admission-authority-domain
shader-source-identity-kit
shader-stage-descriptor-kit
device-precision-capability-query-kit
shader-precision-requirement-kit
shader-source-transform-policy-kit
shader-transform-result-kit
shader-source-fingerprint-kit
shader-compile-attempt-kit
shader-program-link-result-kit
shader-precision-fallback-order-kit
shader-cache-key-kit
renderer-precision-snapshot-kit
precision-warning-receipt-kit
cross-device-precision-fixture-kit
vertex-world-range-fixture-kit
visual-differential-fixture-kit
pages-precision-parity-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-15T06-01-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T06-01-26-04-00.md
.agent/architecture-audit/2026-07-15T06-01-26-04-00-shader-precision-capability-admission-dsk-map.md
.agent/render-audit/2026-07-15T06-01-26-04-00-global-mediump-source-rewrite-gap.md
.agent/gameplay-audit/2026-07-15T06-01-26-04-00-vertex-wind-world-precision-risk-loop.md
.agent/interaction-audit/2026-07-15T06-01-26-04-00-shader-program-admission-result-map.md
.agent/shader-precision-audit/2026-07-15T06-01-26-04-00-stage-requirement-capability-transform-contract.md
.agent/deploy-audit/2026-07-15T06-01-26-04-00-cross-device-shader-precision-fixture-gate.md
.agent/central-sync-audit/2026-07-15T06-01-26-04-00-oldest-selection-shader-precision-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, compatibility wrapper, shader source, renderer behavior, editor capabilities, tests, dependencies, workflows and deployment were not changed. No precision correctness, high-precision preservation, cross-device visual parity, build parity, Pages parity or production-readiness claim is made.
