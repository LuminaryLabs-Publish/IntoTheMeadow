# Project breakdown: IntoTheMeadow web-host lifecycle retirement

**Timestamp:** `2026-07-13T05-31-58-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Selected by:** oldest eligible documented-selection fallback

## Summary

IntoTheMeadow was selected after a full organization/ledger comparison found no new repository, missing ledger, missing root `.agent` folder, or newer unsynchronized repo-local audit. The source breakdown identifies one missing parent authority: the browser host can stop or fail without terminally retiring its RAF chain, WebGL resources, editor listeners, or public globals.

## Plan ledger

**Goal:** preserve the complete repository/domain/kit breakdown while specifying one lifecycle transaction for start, pause, resume, fatal handling, and terminal retirement.

- [x] Compare the complete accessible Publish repo list with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible repos have root `.agent` state.
- [x] Apply the oldest-documented fallback.
- [x] Select and modify only `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Identify all interaction loops.
- [x] Identify all active, declared, planned, and missing domains.
- [x] Identify all 44 source-backed kit surfaces.
- [x] Identify every offered service declared by the 43 local DSKs.
- [x] Trace host lifecycle ownership and reachable gaps.
- [x] Define the required parent domain, candidate kits, transaction, and fixture gate.
- [x] Add required timestamped `.agent` outputs.
- [ ] Implement and execute lifecycle fixtures later.

## Selection comparison

```txt
accessible LuminaryLabs-Publish repositories: 10
eligible after Cavalry exclusion:             9
central ledger present:                       9
root .agent present:                          9
new eligible repositories:                    0
central-ledger-missing repositories:          0
root-.agent-missing repositories:             0
repo-local audit newer than central ledger:   0

IntoTheMeadow      2026-07-13T02-39-44-04-00 selected oldest
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
MyCozyIsland       2026-07-13T04-21-10-04-00
TheUnmappedHouse   2026-07-13T04-47-00-04-00
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is in scope for repo-local changes.

## Complete interaction loops

### Browser and Pages loop

```txt
index.html
  -> import src/boot/boot-game.js
  -> locate canvas, HUD, status, and loading surfaces
  -> startWebHost()
  -> load pinned external meadow-area-kit
  -> install local DSK descriptors
  -> create immutable game state and static topology render plan
  -> create plan enhancer
  -> create persistent WebGL renderer
  -> expose global GameHost
  -> install global NexusEditorEnvironment
  -> schedule RAF frame
  -> tick, enhance, validate, render, diagnose, reschedule
```

### Host lifecycle loop

```txt
startWebHost
  -> create participants
  -> schedule RAF

stop
  -> set stopped boolean
  -> retain participants

start after stop
  -> clear stopped boolean
  -> schedule RAF

fatal frame
  -> set stopped boolean
  -> show error
  -> retain participants and public capabilities
```

### Browser editor loop

```txt
NexusEditorEnvironment.invoke(action, args)
  -> clone arguments
  -> run runtime, scene, renderer, capture, viewport, or error capability
  -> return completed, unavailable, or failed result
  -> retain error and rejection listeners until bridge.dispose()
```

### Node headless editor loop

```txt
nexus-editor CLI / scenario / loop
  -> create NexusEngine headless environment
  -> expose runtime, scene, renderer, camera, browser, and workspace capabilities
  -> inspect, capture, observe, compare, decide, or mutate workspace
  -> persist evidence to .artifacts/headless-editor
```

### Deployment loop

```txt
static repository
  -> run source/static/determinism/headless checks when invoked
  -> publish static files through GitHub Pages workflow
  -> browser imports pinned external provider and local modules
```

## Domains in use

### Active runtime domains

```txt
game manifest and game-state root
browser document shell and boot failure projection
external provider loading and meadow-area adaptation
DSK registry, validation, and composition
immutable snapshots, reset, and diagnostics
meadow area, terrain, path, grass, tree, scatter, wind, and atmosphere
render-plan enhancement, schema validation, and topology identity
CPU mesh generation and WebGL presentation
RAF scheduling and game ticking
public GameHost readback
browser editor capabilities, capture, viewport, and error observation
Node headless editor runtime, terminal, scenarios, loops, workspace, and artifacts
static validation, build, GitHub Pages, repo-local audit, and central tracking
```

### Declared but currently planned/inert gameplay domains

```txt
player exploration
camera behavior beyond authored render-plan camera
browser input
interaction
authored story execution
objective progression
ecology agents
audio
production UI
save persistence
adaptive performance
multi-pass post-processing
```

### Missing lifecycle authority

```txt
host session and generation
host lifecycle phase/revision
RAF identity and cancellation
pause/resume/retire policy
participant registry and ordered cleanup
renderer and bridge disposal composition
public capability lease/revocation
fatal cleanup and duplicate-start admission
stale callback quarantine
typed lifecycle results, observations, journal, and visible acknowledgements
```

## Complete kit and offered service inventory

### External kit

- `meadow-area-kit`: deterministic meadow-area configuration, source render-plan generation, area snapshot, validation, and provider factory.

### Local DSKs and kits

- `into-the-meadow-game-dsk`: `game-manifest`, `kit-stack-registry`, `game-state-root`, `boot-sequence`, `game-snapshot`.
- `web-host-dsk`: `document-shell`, `browser-loop`, `host-debug-surface`, `asset-loading-host`, `browser-safety`.
- `game-composition-dsk`: `dsk-registry`, `scene-composition`, `render-composition`, `simulation-composition`, `composition-validation`.
- `meadow-area-bridge-dsk`: `meadow-area-config`, `meadow-feature-config`, `meadow-area-kit-adapter`, `meadow-area-state`, `meadow-area-validation`.
- `meadow-terrain-texture-dsk`: `terrain-surface-model`, `material-layer-system`, `path-layer-system`, `terrain-sampler`, `terrain-validation`.
- `path-corridor-dsk`: `path-curve-model`, `walkable-corridor`, `path-surface-detail`, `path-progression`, `path-validation`.
- `grass-density-texture-kit`: `density-texture-model`, `density-channels`, `density-compositor`, `density-sampler`, `density-validation`.
- `grass-clump-archetype-kit`: `clump-family-registry`, `card-layout-generator`, `texture-atlas-binding`, `clump-variant-generator`, `archetype-validation`.
- `grass-static-batch-kit`: `clump-mesh-builder`, `batch-variant-cache`, `atlas-material`, `static-batch-lod`, `batch-validation`.
- `grass-patch-placement-kit`: `patch-grid`, `density-driven-placement`, `clump-instance-selection`, `patch-instance-buffer`, `placement-validation`.
- `grass-clump-instancing-render-kit`: `batch-registry`, `instance-stream`, `draw-group-builder`, `shader-binding`, `render-validation`.
- `grass-shader-wind-kit`: `wind-uniforms`, `tip-bend-model`, `phase-field`, `gust-response`, `wind-validation`.
- `grass-lod-policy-kit`: `near-lod`, `mid-lod`, `far-lod`, `terrain-tint-lod`, `lod-validation`.
- `grass-density-scaling-kit`: `quality-scale`, `budget-scale`, `density-scale`, `profile-scale`, `scale-validation`.
- `grass-debug-visualization-kit`: `density-view`, `patch-view`, `instance-view`, `lod-view`, `debug-validation`.
- `grass-patch-dsk`: `patch-grid`, `blade-distribution`, `terrain-awareness`, `wind-binding`, `grass-validation`.
- `gpu-grass-render-dsk`: `grass-instance-buffer`, `grass-blade-mesh`, `shader-wind`, `grass-lod-render`, `grass-render-validation`.
- `wind-field-dsk`: `wind-state`, `wind-sampler`, `wind-zones`, `wind-consumers`, `wind-validation`.
- `tree-object-dsk`: `focal-tree-model`, `tree-line-model`, `tree-materials`, `tree-wind-binding`, `tree-validation`.
- `meadow-scatter-dsk`: `flower-scatter`, `rock-scatter`, `mushroom-scatter`, `placement-rules`, `scatter-validation`.
- `meadow-atmosphere-dsk`: `sky-gradient`, `sun-system`, `cloud-layer`, `distant-hills`, `atmosphere-validation`.
- `meadow-player-dsk`: `player-state`, `movement-profile`, `terrain-contact`, `player-actions`, `player-validation`.
- `meadow-camera-dsk`: `camera-mode`, `camera-rig`, `camera-collision`, `camera-feel`, `camera-validation`.
- `meadow-input-dsk`: `action-map`, `device-bindings`, `input-context`, `input-normalization`, `input-validation`.
- `meadow-interaction-dsk`: `interactable-registry`, `affordance-rules`, `inspect-state`, `interaction-events`, `interaction-validation`.
- `meadow-story-dsk`: `story-state`, `story-beats`, `dialogue-text`, `sequence-runner`, `story-validation`.
- `meadow-objective-dsk`: `objective-model`, `objective-flow`, `completion-ledger`, `feedback-surface`, `objective-validation`.
- `meadow-ecology-dsk`: `ambient-life`, `ecology-zones`, `ambience-triggers`, `non-gameplay-agents`, `ecology-validation`.
- `meadow-audio-dsk`: `ambient-bed`, `spatial-audio-cues`, `audio-state`, `audio-events`, `audio-validation`.
- `meadow-ui-dsk`: `minimal-hud`, `story-text-panel`, `debug-ui`, `ui-state`, `ui-validation`.
- `meadow-save-dsk`: `save-model`, `save-slots`, `persistence-adapter`, `migration`, `save-validation`.
- `meadow-diagnostics-dsk`: `runtime-health`, `render-health`, `determinism-checks`, `smoke-tests`, `diagnostics-report`.
- `meadow-performance-dsk`: `quality-profile`, `budget-policy`, `lod-policy`, `adaptive-scaling`, `performance-validation`.
- `meadow-render-host-dsk`: `renderer-selection`, `render-plan-ingest`, `pass-order`, `renderer-state`, `renderer-validation`.
- `meadow-webgl-renderer-v2-kit`: WebGL2/WebGL selection, precision-safe shader source, persistent topology cache, mesh upload, camera matrices, wind uniforms, cel/outline/fog passes, viewport resize, render snapshot, and resource disposal.
- `post-process-stack-dsk`: `pass-registry`, `render-target-system`, `sobel-outline-pass`, `color-grade-pass`, `post-validation`.
- `render-target-kit`: `scene-color-texture`, `depth-texture`, `normal-texture`, `ping-pong-buffer`, `resize-policy`.
- `sobel-outline-pass-kit`: `color-edge-threshold`, `depth-edge-threshold`, `normal-edge-threshold`, `outline-color`, `object-mask`.
- `color-grade-pass-kit`: `warmth`, `contrast`, `saturation`, `shadow-tint`, `highlight-tint`.
- `depth-fog-pass-kit`: `fog-near`, `fog-far`, `fog-color`, `distance-curve`, `horizon-haze`.
- `vignette-pass-kit`: `radius`, `softness`, `strength`, `center`, `quality-tier`.
- `final-composite-pass-kit`: `scene-input`, `post-input`, `output-target`, `debug-overlay`, `fallback-composite`.
- `static-pages-deploy-dsk`: `build-config`, `github-pages-workflow`, `release-artifacts`, `cache-invalidation`, `deploy-validation`.

## Kit census

```txt
external provider kits:             1
local DSK/kit declarations:        43
total source-backed surfaces:      44
required-v0.1 local declarations:  15
planned local declarations:        28
implemented lifecycle authority:    0
```

## Main source finding

The host composes resources at startup but not at shutdown:

```txt
created by host                    available cleanup              called by stop/fatal
RAF request                        cancelAnimationFrame           no
WebGL renderer                     renderer.dispose()             no
editor bridge and listeners        editorBridge.dispose()         no
NexusEditorEnvironment global      conditional delete in dispose  no
GameHost global                    no revoke surface               no
game and enhancer                  no terminal contract            no
```

`stop()` and `showFatal()` only set `stopped = true`. A second host can overwrite public globals while predecessor participants remain live. No lifecycle generation or typed result establishes ownership.

## Required parent domain

```txt
meadow-web-host-lifecycle-retirement-authority-domain
```

## Candidate kit composition

```txt
web-host-session-id-kit
web-host-generation-kit
web-host-lifecycle-phase-kit
web-host-lifecycle-revision-kit
web-host-start-command-kit
web-host-pause-command-kit
web-host-resume-command-kit
web-host-retire-command-kit
web-host-participant-registry-kit
raf-request-ownership-kit
raf-cancel-receipt-kit
host-duplicate-start-admission-kit
host-stale-generation-rejection-kit
game-host-capability-lease-kit
editor-bridge-capability-lease-kit
renderer-retirement-kit
editor-bridge-retirement-kit
fatal-host-transition-kit
host-lifecycle-result-kit
host-lifecycle-observation-kit
host-lifecycle-journal-kit
first-resumed-frame-ack-kit
first-retired-state-ack-kit
web-host-stop-resume-fixture-kit
web-host-retirement-fixture-kit
web-host-duplicate-start-fixture-kit
web-host-fatal-cleanup-fixture-kit
web-host-stale-callback-fixture-kit
```

## Required transaction

```txt
StartWebHostCommand
  -> allocate host generation
  -> admit one owner for document/canvas/global capability scope
  -> create participants
  -> wait for readiness
  -> enter Running

PauseWebHostCommand
  -> bind active generation
  -> cancel/account for pending RAF
  -> retain participants
  -> enter Paused

ResumeWebHostCommand
  -> validate retained participants
  -> allocate one RAF chain
  -> enter Running
  -> acknowledge first resumed frame

RetireWebHostCommand
  -> idempotently enter Stopping
  -> cancel RAF
  -> reject new capability calls
  -> detach editor listeners and revoke bridge global
  -> revoke GameHost global
  -> dispose WebGL resources exactly once
  -> retire remaining participants
  -> publish Retired, Degraded, or Failed

FatalHostResult
  -> publish bounded evidence
  -> apply the same retirement contract or an explicit degraded-retention policy
```

## Validation boundary

Documentation only. No runtime source, behavior, package, dependency, or deployment change occurred. Existing tests were not run and no lifecycle fixture currently proves cleanup or retirement.
