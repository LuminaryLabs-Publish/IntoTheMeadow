# Project Breakdown: IntoTheMeadow Render-Surface Viewport Authority

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Repository head reviewed:** `9fc1ceab092f330a73d7dd4376082e360980bce1`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

IntoTheMeadow derives its WebGL backing store directly inside every render call from `canvas.clientWidth || innerWidth`, `canvas.clientHeight || innerHeight`, and a globally sampled DPR clamped to `1..2`. It then mutates `canvas.width` and `canvas.height` before mesh preparation, camera projection, drawing, snapshot publication, or capture correlation succeeds.

There is no render-surface identity, measured-host revision, zero-size deferral, pixel budget, GPU-limit admission, atomic backing-store/projection commit, rollback result, viewport-bearing renderer snapshot, or first visible frame acknowledgement. Browser viewport readback and canvas capture can therefore describe independently sampled layout, backing-store, renderer, and pixel states.

## Plan ledger

**Goal:** require every CSS-size or DPR change to produce one validated viewport candidate, atomically adopt canvas backing-store, WebGL viewport, camera projection, renderer metadata, and capture provenance, then acknowledge the first matching visible frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Confirm no eligible repo is new, ledger-missing, root-agent-missing, or locally ahead of central tracking.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest eligible documented timestamp.
- [x] Read the page shell, boot path, web host, renderer compatibility layer, base renderer, editor bridge, GameHost, game state, package scripts, and retained audits.
- [x] Trace CSS measurement, DPR sampling, canvas backing-store mutation, WebGL viewport, camera projection, renderer snapshot, browser readback, and canvas capture.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Define the missing render-surface viewport authority and 27-surface candidate kit family.
- [x] Add architecture, render, gameplay, interaction, viewport, deploy, and central-sync audits.
- [x] Change no runtime source, dependency, script, test, or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute viewport, DPR, zero-size, failure, capture, build, and Pages fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local heads newer than central documentation heads: 0

IntoTheMeadow      2026-07-13T05-40-11-04-00 selected
PhantomCommand     2026-07-13T05-59-03-04-00
HorrorCorridor     2026-07-13T07-00-29-04-00
ZombieOrchard      2026-07-13T07-41-11-04-00
PrehistoricRush    2026-07-13T08-39-12-04-00
TheUnmappedHouse   2026-07-13T09-03-20-04-00
TheOpenAbove       2026-07-13T09-40-27-04-00
AetherVale         2026-07-13T10-05-15-04-00
MyCozyIsland       2026-07-13T10-41-40-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
browser document
  -> fixed full-screen main and canvas
  -> load src/boot/boot-game.js
  -> startWebHost()
  -> create game, enhancer, WebGL renderer, GameHost and editor bridge
  -> request recursive RAF

RAF callback
  -> game.tick({ time: now / 1000, dt: 1 / 60 })
  -> obtain and enhance render plan
  -> validate render contract
  -> renderer.render(plan)

renderer.render
  -> sample global devicePixelRatio
  -> clamp DPR to 1..2
  -> read canvas.clientWidth/clientHeight
  -> fall back to global innerWidth/innerHeight when either measurement is falsy
  -> immediately mutate canvas.width/canvas.height
  -> prepare or reuse GPU mesh
  -> set gl.viewport from the new backing dimensions
  -> derive perspective aspect from those backing dimensions
  -> draw outline and color passes
  -> publish renderer snapshot without viewport identity

editor observation
  -> browser.getViewport independently reads inner size, DPR and canvas backing size
  -> renderer.getSnapshot independently reads the last renderer snapshot
  -> renderer.capture immediately encodes current canvas pixels and attaches the last renderer snapshot
  -> no shared viewport or visible-frame revision binds those values

layout or DPR transition
  -> no ResizeObserver-owned command or transition generation
  -> next active render silently samples and adopts whatever values exist
  -> stopped or failed hosts do not converge the render surface
  -> no terminal viewport result or first matching frame acknowledgement
```

## Domains in use

```txt
browser document, CSS layout, fixed full-screen canvas and loading/fatal projection
external provider loading and local deterministic fallback generation
immutable game state, frame count, reset, snapshots and diagnostics
DSK declaration registry, required/planned state and validation
meadow terrain, path, scatter, trees, grass, wind and atmosphere
render-plan enhancement, contract normalization and CPU mesh generation
render-surface identity, CSS host measurement and DPR policy
canvas backing-store sizing and browser layout transitions
GPU size/limit admission and render pixel budgeting
WebGL context, buffers, viewport, draw submission and renderer snapshots
camera perspective projection derived from backing-store aspect
RAF scheduling, host pause/resume/fatal lifecycle and frame publication
GameHost and browser editor state/render/viewport/capture readback
Node headless editor workspace, scenarios, loops and artifacts
static checks, deterministic checks, build and Pages deployment
missing viewport transaction, rollback, readback and visible-frame authority
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented viewport authorities: 0
planned viewport authority surfaces including parent: 27
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area normalization; path normalization; style/material normalization; deterministic seeded scatter; feature descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter |
| `into-the-meadow-game-dsk` | game manifest; kit-stack registry; game-state root; boot sequence; game snapshot |
| `web-host-dsk` | document shell; browser loop; host debug surface; asset loading; browser safety |
| `game-composition-dsk` | DSK registry; scene composition; render composition; simulation composition; composition validation |
| `meadow-area-bridge-dsk` | meadow configuration; feature configuration; provider adapter; area state; area validation |
| `meadow-terrain-texture-dsk` | terrain surface model; material layers; path layers; terrain sampling; terrain validation |
| `path-corridor-dsk` | path curve; walkable corridor; surface detail; path progression; path validation |
| `grass-density-texture-kit` | density texture; density channels; density compositor; density sampler; density validation |
| `grass-clump-archetype-kit` | clump registry; card layout; atlas binding; clump variants; archetype validation |
| `grass-static-batch-kit` | clump mesh; variant cache; atlas material; static-batch LOD; batch validation |
| `grass-patch-placement-kit` | patch grid; density placement; instance selection; instance buffer; placement validation |
| `grass-clump-instancing-render-kit` | batch registry; instance stream; draw groups; shader binding; render validation |
| `grass-shader-wind-kit` | wind uniforms; tip bend; phase field; gust response; wind validation |
| `grass-lod-policy-kit` | near, mid and far LOD; terrain-tint LOD; LOD validation |
| `grass-density-scaling-kit` | quality, budget, density and profile scaling; scale validation |
| `grass-debug-visualization-kit` | density, patch, instance and LOD views; debug validation |
| `grass-patch-dsk` | patch grid; blade distribution; terrain awareness; wind binding; grass validation |
| `gpu-grass-render-dsk` | instance buffer; blade mesh; shader wind; grass LOD rendering; render validation |
| `wind-field-dsk` | wind state; wind sampler; wind zones; wind consumers; wind validation |
| `tree-object-dsk` | focal tree; tree line; tree materials; wind binding; tree validation |
| `meadow-scatter-dsk` | flower, rock and mushroom scatter; placement rules; scatter validation |
| `meadow-atmosphere-dsk` | sky gradient; sun; clouds; distant hills; atmosphere validation |
| `meadow-player-dsk` | player state; movement profile; terrain contact; player actions; player validation |
| `meadow-camera-dsk` | camera mode; rig; collision; feel; camera validation |
| `meadow-input-dsk` | action map; device bindings; input context; normalization; input validation |
| `meadow-interaction-dsk` | interactable registry; affordance rules; inspect state; interaction events; validation |
| `meadow-story-dsk` | story state; beats; dialogue; sequence runner; story validation |
| `meadow-objective-dsk` | objective model; flow; completion ledger; feedback; objective validation |
| `meadow-ecology-dsk` | ambient life; ecology zones; ambience triggers; non-gameplay agents; validation |
| `meadow-audio-dsk` | ambient bed; spatial cues; audio state; audio events; audio validation |
| `meadow-ui-dsk` | minimal HUD; story panel; debug UI; UI state; UI validation |
| `meadow-save-dsk` | save model; slots; persistence adapter; migration; save validation |
| `meadow-diagnostics-dsk` | runtime health; render health; determinism checks; smoke tests; diagnostics report |
| `meadow-performance-dsk` | quality profile; budget policy; LOD policy; adaptive scaling; validation |
| `meadow-render-host-dsk` | renderer selection; render-plan ingest; pass order; renderer state; validation |
| `meadow-webgl-renderer-v2-kit` | WebGL context; shaders; attributes/uniforms; CPU mesh ingest; GPU buffers; draw submission; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass registry; render targets; Sobel outline; color grade; post validation |
| `render-target-kit` | scene color; depth; normal; ping-pong buffers; resize policy |
| `sobel-outline-pass-kit` | color, depth and normal thresholds; outline color; object mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow tint; highlight tint |
| `depth-fog-pass-kit` | fog near/far; fog color; distance curve; horizon haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality tier |
| `final-composite-pass-kit` | scene input; post input; output target; debug overlay; fallback composite |
| `static-pages-deploy-dsk` | build configuration; Pages workflow; release artifacts; cache invalidation; deploy validation |

## Source-backed findings

### Zero-size is treated as full-window size

The renderer uses `canvas.clientWidth || globalThis.innerWidth || 1` and the equivalent height expression. A legitimate CSS measurement of zero is therefore not deferred or classified as hidden. It becomes a global-window allocation candidate.

### DPR policy has no pixel or GPU budget

DPR is clamped to `1..2`, but width and height are otherwise unconstrained. An 8K CSS viewport at DPR 2 requests a `15360 × 8640` backing store, or `132,710,400` pixels. One RGBA8 color surface alone is about 506 MiB before depth, double buffering, driver overhead, mesh buffers, or post-processing targets.

### Backing-store mutation precedes render success

`resize()` assigns `canvas.width` and `canvas.height` before mesh preparation, `gl.viewport`, projection construction, draw submission, and snapshot publication. A later exception can leave the canvas on a successor backing size while the renderer snapshot still describes the predecessor submission.

### Camera, viewport and snapshot have no common revision

The WebGL viewport and perspective aspect use the new backing dimensions, but the renderer snapshot omits CSS width, CSS height, DPR, backing width, backing height, projection aspect, surface generation, viewport revision, or frame revision.

### Browser readback can be mixed-revision

`browser.getViewport` independently reads global inner dimensions, global DPR, and canvas backing dimensions. It does not report the measured CSS box, effective DPR, selected pixel budget, renderer viewport, camera aspect, or committed viewport revision.

### Capture has no viewport or frame correlation

`renderer.capture` immediately calls `canvas.toDataURL`, reports the current canvas backing dimensions, and attaches the last renderer snapshot. No identity proves that the pixels, backing size, camera projection, render snapshot, and browser measurement belong to one committed frame.

### Layout changes have no lifecycle owner

There is no `ResizeObserver`, DPR-change observer, viewport command, stale-candidate rejection, duplicate suppression, zero-size policy, rollback result, or first viewport-frame acknowledgement. Active RAF eventually resamples layout, while stopped or failed hosts do not converge.

## Main failure paths

```txt
canvas temporarily measures 0 × 0
  -> falsy measurement falls back to global window size
  -> renderer allocates a full-window backing store instead of deferring

large viewport or DPR transition
  -> backing dimensions are accepted without a pixel budget
  -> allocation, clear or draw can fail after canvas mutation
  -> no typed failure or predecessor restoration exists

resize succeeds but mesh/draw fails
  -> canvas backing dimensions identify the successor
  -> renderer snapshot remains predecessor
  -> capture/readback can combine both revisions

layout changes while host is stopped
  -> no RAF render adopts the new size
  -> browser.getViewport sees new global layout and old canvas backing size
  -> no stale or not-ready result explains the mismatch

capture during viewport transition
  -> toDataURL reads current pixels/backing size
  -> renderer metadata may describe the last successful predecessor frame
  -> no viewport or frame identity distinguishes them
```

## Required parent domain

```txt
meadow-render-surface-viewport-authority-domain
```

## Required transaction

```txt
ViewportChangeCommand
  -> bind render-surface ID and generation
  -> measure the actual host CSS box
  -> sample DPR under an explicit policy
  -> read GPU limits and apply a render-pixel budget
  -> classify zero, hidden, invalid, duplicate, stale or superseded candidates
  -> prepare detached canvas-backing, WebGL-viewport and camera-projection candidates
  -> validate aspect, dimensions and allocation limits
  -> atomically adopt every participant or preserve the predecessor
  -> publish ViewportCommitResult with before/after revisions
  -> render one FrameViewportEnvelope using the committed revision
  -> expose one revisioned viewport readback
  -> correlate capture with that exact visible frame
  -> publish FirstViewportFrameAck
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

## Required proof matrix

```txt
normal CSS resize
DPR increase and decrease
browser zoom transition
zero-size then restore
hidden surface then restore
rapid resize coalescing
stale measurement rejection
duplicate measurement suppression
pixel-budget clamping
GPU-limit rejection
after-resize mesh failure
canvas mutation rollback
camera/WebGL aspect parity
browser viewport readback parity
capture/frame/viewport identity parity
stopped-host layout transition
fatal-host layout transition
source browser smoke
production build smoke
built-output smoke
GitHub Pages smoke
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-13T10-59-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T10-59-22-04-00.md
.agent/architecture-audit/2026-07-13T10-59-22-04-00-render-surface-viewport-authority-dsk-map.md
.agent/render-audit/2026-07-13T10-59-22-04-00-viewport-backing-store-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T10-59-22-04-00-resize-render-capture-loop.md
.agent/interaction-audit/2026-07-13T10-59-22-04-00-viewport-change-commit-result-map.md
.agent/viewport-audit/2026-07-13T10-59-22-04-00-host-measurement-dpr-pixel-budget-contract.md
.agent/deploy-audit/2026-07-13T10-59-22-04-00-viewport-fixture-gate.md
.agent/central-sync-audit/2026-07-13T10-59-22-04-00-repo-ledger-viewport-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

Documentation and source analysis only. Runtime JavaScript, renderer behavior, CSS, dependencies, scripts, tests, workflows, and deployment were not changed. `npm run check`, live browser viewport fixtures, built-output fixtures, and Pages fixtures were not executed.