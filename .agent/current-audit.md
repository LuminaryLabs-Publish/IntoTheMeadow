# Current Audit: Render-Surface Viewport Authority

**Updated:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-central-reconciled`  
**Immediate predecessor:** `browser-editor-capability-admission-authority-central-reconciled` at `2026-07-13T05-40-11-04-00`

## Summary

The WebGL renderer owns viewport behavior as direct mutation rather than as a domain transaction. Every render samples `globalThis.devicePixelRatio`, clamps it to `1..2`, reads `canvas.clientWidth/clientHeight`, falls back to global window dimensions when either value is falsy, and immediately assigns `canvas.width/height`.

The backing-store mutation occurs before mesh preparation, WebGL viewport, camera projection, both draw passes, renderer snapshot publication, browser readback, canvas capture, or visible acknowledgement succeeds. There is no render-surface identity, host-measurement revision, zero-size deferral, pixel budget, GPU-limit admission, atomic commit, rollback result, or first viewport-frame acknowledgement.

## Plan ledger

**Goal:** define one viewport transaction that validates policy and every participant before a visible surface or public observation changes.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories have central and root `.agent` coverage.
- [x] Select only IntoTheMeadow by the oldest eligible central timestamp.
- [x] Trace CSS host measurement, DPR, backing size, WebGL viewport, camera aspect, renderer snapshot, browser readback and capture.
- [x] Identify all active domains.
- [x] Preserve all 44 declared kit surfaces and services.
- [x] Define the viewport authority and 27 candidate surfaces.
- [x] Add the timestamped tracker and system audits.
- [x] Change no runtime source, dependency, script, test or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute browser/build/Pages viewport fixtures later.

## Complete interaction loop

```txt
index.html
  -> fixed full-screen main and canvas
  -> boot game and start web host
  -> create game, enhancer, renderer, GameHost and editor bridge
  -> request RAF

RAF callback
  -> tick immutable game state
  -> create time-overlay render plan
  -> enhance and validate plan
  -> renderer.render(plan)

renderer viewport path
  -> sample DPR
  -> read CSS width and height
  -> use global window fallback for falsy measurements
  -> assign canvas backing width and height
  -> prepare/reuse mesh
  -> set WebGL viewport
  -> derive camera aspect
  -> draw outline and color passes
  -> replace renderer snapshot without viewport identity

public observation
  -> browser.getViewport reads global layout, DPR and canvas backing dimensions
  -> renderer.getSnapshot reads the last successful renderer metadata
  -> renderer.capture encodes current canvas pixels and attaches that metadata
  -> no shared viewport/frame revision binds them
```

## Domains in use

```txt
browser document, CSS layout, canvas and loading/fatal projection
external provider loading and deterministic fallback generation
immutable game state, frame, reset, snapshots and diagnostics
DSK declaration registry, composition and validation
meadow terrain, path, scatter, trees, grass, wind and atmosphere
render-plan enhancement, contract normalization and CPU mesh generation
render-surface identity and host CSS measurement
DPR sampling, quality policy, pixel budget and GPU-limit admission
canvas backing-store sizing and zero-size lifecycle
WebGL viewport, camera perspective and draw submission
RAF scheduling and host lifecycle
GameHost and browser editor viewport/readback/capture projection
Node headless runtime, workspace, scenarios, loops and artifacts
static, deterministic, build and Pages proof
missing viewport commit, rollback, readback and visible-frame authority
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented viewport authorities: 0
planned viewport authority surfaces including parent: 27
```

## Implemented kit families

```txt
provider/composition:
  meadow-area-kit
  into-the-meadow-game-dsk
  web-host-dsk
  game-composition-dsk
  meadow-area-bridge-dsk

world:
  meadow-terrain-texture-dsk
  path-corridor-dsk
  wind-field-dsk
  tree-object-dsk
  meadow-scatter-dsk
  meadow-atmosphere-dsk

grass:
  grass-density-texture-kit
  grass-clump-archetype-kit
  grass-static-batch-kit
  grass-patch-placement-kit
  grass-clump-instancing-render-kit
  grass-shader-wind-kit
  grass-lod-policy-kit
  grass-density-scaling-kit
  grass-debug-visualization-kit
  grass-patch-dsk
  gpu-grass-render-dsk

planned gameplay/application:
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

render/deploy:
  meadow-render-host-dsk
  meadow-webgl-renderer-v2-kit
  post-process-stack-dsk
  render-target-kit
  sobel-outline-pass-kit
  color-grade-pass-kit
  depth-fog-pass-kit
  vignette-pass-kit
  final-composite-pass-kit
  static-pages-deploy-dsk
```

The complete per-kit service table is preserved in `.agent/trackers/2026-07-13T10-59-22-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Offered service groups

```txt
provider/composition:
  deterministic area generation, external/fallback provider adaptation,
  manifests, DSK registry, boot, state, snapshots and validation

world/grass:
  terrain/path models, deterministic scatter, density fields, clump archetypes,
  placement, instancing, shader wind, LOD, trees, atmosphere and diagnostics

planned gameplay:
  player, camera, input, interaction, story, objectives, ecology, audio,
  UI, persistence, diagnostics and adaptive performance contracts

render/deploy:
  render-plan ingest, WebGL ownership/submission, post-process descriptors,
  resize, snapshot, disposal, static build, Pages workflow and deploy validation

editor/headless:
  public state/render/viewport observations, direct tick/reset mutation,
  canvas capture, browser errors, terminal/scenario/loop execution and artifacts
```

## Source-backed findings

```txt
actual host-box authority: absent
zero-size deferral: absent
zero-size behavior: global window fallback
sampled DPR: global per render
DPR cap: 2
pixel budget: absent
GPU dimension admission: absent
backing-store mutation before frame success: confirmed
viewport revision: absent
camera-projection revision: absent
renderer snapshot viewport fields: absent
ResizeObserver ownership: absent
stale/duplicate measurement result: absent
rollback result: absent
browser viewport readback revision: absent
capture viewport/frame correlation: absent
first viewport frame acknowledgement: absent
```

## Main failure paths

```txt
zero CSS measurement
  -> fallback to global window size
  -> full-window backing allocation instead of deferral

large viewport at high DPR
  -> no pixel-budget or GPU-limit gate
  -> allocation/draw can fail after canvas mutation

resize followed by mesh or draw failure
  -> canvas dimensions are successor
  -> renderer snapshot is predecessor

layout change while host stopped
  -> browser layout becomes successor
  -> canvas/render state stays predecessor
  -> public readback has no stale/not-ready classification

capture during transition
  -> current canvas pixels and dimensions
  -> last renderer snapshot
  -> no shared viewport/frame identity
```

## Required parent domain

```txt
meadow-render-surface-viewport-authority-domain
```

## Required transaction

```txt
ViewportChangeCommand
  -> bind surface ID and generation
  -> collect actual host CSS measurement and DPR evidence
  -> apply quality, GPU-limit and pixel-budget policy
  -> reject invalid, zero, duplicate, stale or superseded candidates
  -> prepare detached backing-store, WebGL-viewport and camera candidates
  -> validate shared dimensions and aspect
  -> atomically adopt all participants or preserve the predecessor
  -> publish ViewportCommitResult
  -> render FrameViewportEnvelope
  -> publish revisioned readback and capture evidence
  -> acknowledge FirstViewportFrameAck
```

## Planned coordinating kits

```txt
meadow-render-surface-viewport-authority-domain
render-surface-id-kit
render-surface-generation-kit
host-css-box-measurement-kit
viewport-measurement-command-kit
viewport-measurement-result-kit
device-pixel-ratio-sample-kit
device-pixel-ratio-policy-kit
gpu-limit-admission-kit
render-pixel-budget-kit
zero-size-surface-deferral-kit
viewport-revision-kit
viewport-candidate-kit
canvas-backing-store-candidate-kit
camera-projection-candidate-kit
webgl-viewport-candidate-kit
resize-observer-adapter-kit
dpr-change-adapter-kit
viewport-atomic-commit-kit
viewport-rollback-kit
stale-viewport-rejection-kit
duplicate-viewport-suppression-kit
render-frame-viewport-envelope-kit
viewport-readback-kit
capture-viewport-correlation-kit
first-viewport-frame-ack-kit
viewport-fixture-gate-kit
```

## Retained architecture priorities

```txt
browser editor capability admission
web-host lifecycle retirement
workspace canonical containment
provider-source parity
WebGL context/resource recovery
single-chain fixed-step scheduling
executable DSK provider consumption
playable exploration and progression
camera-bound grass visibility/LOD
audio user-gesture lifecycle
atomic save/migration and independent replay
```

## Validation boundary

Documentation only. No runtime authority, pixel budget, zero-size policy, viewport transaction, rollback, readback correlation, capture correlation, browser fixture, build fixture or Pages fixture was executed.