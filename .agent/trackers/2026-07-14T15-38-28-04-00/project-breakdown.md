# Project Breakdown: IntoTheMeadow Browser Startup Readiness and First Frame

**Timestamp:** `2026-07-14T15-38-28-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `771329ff99c2e70a2d4dba291d398bdc4917e8b9`  
**Retained runtime source revision:** `db9bd0127fcb28a2b37706ca32cc7b201a646d17`  
**Status:** `browser-startup-readiness-first-frame-authority-audited`

## Summary

The browser host publishes `globalThis.GameHost` and `globalThis.NexusEditorEnvironment`, hides the loading indicator, and resolves `startWebHost()` before one validated frame has rendered. Editor commands and canvas capture are therefore callable while the renderer may still be unproven or blank.

A failure before host creation rejects the boot promise, but a failure inside the first or later RAF is absorbed by `showFatal()`. That path marks the loop stopped and updates UI, yet leaves public globals, editor error listeners, renderer resources, enhancer state, and the partially adopted host available. No typed startup result, rollback receipt, boot generation, readiness revision, or first-frame acknowledgement exists.

## Plan ledger

**Goal:** make browser boot one generation-bound transaction that admits provider, game, renderer, editor bridge, public globals, loading projection, and the first validated visible frame atomically.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Compare all eligible `main` heads with their recorded repo-local documentation heads.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only `IntoTheMeadow` by the oldest synchronized central timestamp.
- [x] Inspect `index.html`, `boot-game.js`, `web-host.js`, `expose-game-host.js`, `install-editor-bridge.js`, game composition, package scripts, and prior audits.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Add the timestamped startup-readiness audit family.
- [x] Change documentation only and push directly to `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute startup admission, failure rollback, readiness, and first-frame fixtures later.

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
oldest synchronized central timestamp: 2026-07-14T09-58-25-04-00
```

## Complete interaction loop

```txt
document boot
  -> index.html loads boot-game.js
  -> startWebHost begins
  -> external meadow provider imports
  -> game composition is created
  -> WebGL renderer and render-plan enhancer are created
  -> GameHost is published globally
  -> editor bridge and global error listeners are installed
  -> loading indicator is hidden
  -> first RAF is scheduled

first RAF
  -> game tick advances
  -> raw render plan is read
  -> enhanced render contract is validated
  -> renderer submits the frame
  -> lastPlan and lastRender are published
  -> next RAF is scheduled

pre-host failure
  -> startWebHost rejects
  -> boot-game catch exposes fatal text

first-frame or later frame failure
  -> showFatal marks stopped
  -> fatal text is shown
  -> startWebHost has already resolved
  -> GameHost and NexusEditorEnvironment remain published
  -> editor listeners and renderer resources remain owned
  -> no typed terminal startup result or rollback receipt is published
```

## Main findings

### Public capability publication precedes readiness

`exposeGameHost()` assigns `target.GameHost` before any frame has validated or rendered. `installIntoTheMeadowEditorBridge()` then publishes `target.NexusEditorEnvironment`. Calls to `renderer.capture`, state readback, manual tick, and reset can occur before first-frame admission.

### Loading completion is projected too early

`loadingEl.hidden = true` occurs before the first RAF. The visible loading state therefore represents construction completion, not proven render readiness.

### Asynchronous frame failure cannot reject startup

`startWebHost()` schedules RAF and immediately returns the host object. A render-contract or renderer failure in `frame()` is handled internally by `showFatal()` after the promise has resolved, so the caller receives no failed startup result.

### Failure does not retire partial ownership

The fatal path does not call `editorBridge.dispose()`, renderer disposal, enhancer invalidation, public-global revocation, or an explicit scheduler-retirement operation. It does not publish participant receipts or identify which startup generation failed.

### No exact first-frame evidence exists

There is no `BootAttemptId`, `StartupRevision`, provider fingerprint, candidate manifest, typed `BrowserStartupResult`, `FirstVisibleMeadowFrameAck`, or stale-attempt rejection policy.

## Domains in use

```txt
repository, source and boot-attempt identity
browser document and module startup
external provider import and export admission
game and DSK composition candidate ownership
WebGL renderer and render-plan enhancer creation
GameHost public capability publication
NexusEditorEnvironment publication and listener ownership
loading, fatal and debug UI projection
RAF scheduling and first-frame validation
render-plan contract validation and visible frame submission
startup candidate adoption and rollback
stale boot-attempt rejection
startup diagnostics and typed results
source, browser, build and Pages validation
repo-local and central audit tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned startup authority surfaces: 18
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
| `post-process-stack-dsk` | Pass registry, targets, outline, color grade and validation. |
| `render-target-kit` | Scene color, depth, normal and ping-pong buffers plus resize policy. |
| `sobel-outline-pass-kit` | Color/depth/normal thresholds, outline color and object mask. |
| `color-grade-pass-kit` | Warmth, contrast, saturation and tonal tint. |
| `depth-fog-pass-kit` | Fog range, color, curve and horizon haze. |
| `vignette-pass-kit` | Radius, softness, strength, center and quality tier. |
| `final-composite-pass-kit` | Scene/post inputs, output, debug overlay and fallback composite. |
| `static-pages-deploy-dsk` | Build configuration, Pages workflow, artifacts, cache invalidation and deploy validation. |

## Required parent domain

```txt
meadow-browser-startup-readiness-first-frame-authority-domain
```

## Required transaction

```txt
BrowserStartupCommand
  -> allocate BootAttemptId and expected document generation
  -> resolve and fingerprint the external provider
  -> prepare game, renderer, enhancer and editor bridge candidates
  -> validate DSK and render-plan contracts
  -> keep public globals and loading completion unpublished
  -> submit and validate one exact candidate frame
  -> atomically publish GameHost, NexusEditorEnvironment and Ready state
  -> publish BrowserStartupResult and participant receipts
  -> acknowledge FirstVisibleMeadowFrameAck
  -> reject stale or superseded attempts
  -> on failure revoke candidates, listeners, globals and GPU ownership
  -> publish BrowserStartupFailureResult and rollback receipt
```

## Planned coordinating kits

```txt
meadow-browser-startup-readiness-first-frame-authority-domain
browser-startup-command-kit
boot-attempt-identity-kit
external-provider-admission-kit
game-composition-candidate-kit
renderer-candidate-kit
editor-bridge-candidate-kit
public-host-publication-kit
loading-state-projection-kit
first-frame-validation-kit
startup-atomic-adoption-kit
startup-rollback-kit
startup-failure-result-kit
readiness-state-kit
first-visible-frame-ack-kit
stale-boot-rejection-kit
startup-diagnostics-kit
startup-fixture-matrix-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-14T15-38-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T15-38-28-04-00.md
.agent/architecture-audit/2026-07-14T15-38-28-04-00-browser-startup-readiness-first-frame-dsk-map.md
.agent/render-audit/2026-07-14T15-38-28-04-00-pre-ready-public-frame-gap.md
.agent/gameplay-audit/2026-07-14T15-38-28-04-00-boot-to-first-frame-loop.md
.agent/interaction-audit/2026-07-14T15-38-28-04-00-startup-command-result-map.md
.agent/startup-audit/2026-07-14T15-38-28-04-00-candidate-adoption-failure-rollback-contract.md
.agent/deploy-audit/2026-07-14T15-38-28-04-00-browser-startup-fixture-gate.md
.agent/central-sync-audit/2026-07-14T15-38-28-04-00-repo-ledger-startup-readiness-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, tests, dependencies, workflows and deployment were not changed. No atomic startup admission, accurate loading readiness, first-frame convergence, failure rollback, public-global retirement, artifact parity, or production-readiness claim is made.