# Project Breakdown: IntoTheMeadow Runtime Reset Session Replay Authority

**Timestamp:** `2026-07-14T09-58-25-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed repository head:** `47a1811e6771c0cee1e33e96b78c43f04d062f77`  
**Retained runtime source revision:** `db9bd0127fcb28a2b37706ca32cc7b201a646d17`  
**Status:** `runtime-reset-session-replay-authority-audited`

## Summary

IntoTheMeadow exposes `runtime.reset` in both browser and headless editor environments, but the two paths reset different participants and neither produces a new session generation or reset result. The core game recreates state with the same `arrival-meadow:session-0` identity while retaining the meadow provider and cached base render plan.

The browser path leaves the host's last plan, last render, enhancer cache, renderer cache, RAF lease and editor observation state intact. The headless path resets local time and invalidates the enhancer but retains `lastCapture`, allowing comparisons to cross the reset boundary. No first post-reset frame proves that state, render and editor evidence belong to one successor session.

## Plan ledger

**Goal:** make reset one atomic session transition that retires predecessor tick, render and observation work, creates a uniquely identified successor, and proves the first matching visible or headless frame.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only IntoTheMeadow by the oldest eligible central timestamp.
- [x] Inspect game state, game reset, GameHost, browser editor bridge, web host, headless environment and command smoke.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Add the timestamped reset/replay audit family.
- [x] Change documentation only.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement reset admission, replay evidence and browser/headless fixtures later.

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
selection rule: oldest eligible synchronized central timestamp
```

## Complete interaction loop

```txt
browser boot
  -> external meadow provider loads
  -> game, renderer, enhancer and editor bridge are created
  -> RAF advances game state and publishes plan/render snapshots

browser runtime.reset
  -> editor bridge calls game.reset()
  -> state returns to frame 0
  -> activeSessionId remains arrival-meadow:session-0
  -> meadow provider and base render plan remain
  -> lastPlan, lastRender, enhancer and renderer caches remain
  -> active RAF continues without a reset barrier
  -> next frame eventually replaces some retained readback

headless runtime.reset
  -> local time becomes 0
  -> enhancer is invalidated
  -> game.reset() recreates the same session identity
  -> lastCapture remains from the predecessor
  -> renderer.compare can compare successor state against predecessor capture

proof
  -> command smoke ticks three frames
  -> no reset, duplicate, stale-command, replay or first-reset-frame fixture
```

## Main findings

### Reset does not create a successor identity

`createInitialGameState()` always emits `activeSessionId: ${sceneId}:session-0`. `game.reset()` calls it again with the same scene and DSK snapshot, so before and after states cannot be distinguished by session generation.

### Browser and headless reset different participants

Browser `runtime.reset` calls `game.reset()` only. Headless `runtime.reset` additionally resets local time and invalidates the enhancer. Neither path declares a canonical reset participant manifest.

### Render and observation evidence can survive reset

The web host retains `lastPlan` and `lastRender`. The renderer and enhancer remain live. The headless environment retains `lastCapture`. Readback immediately after reset can therefore mix successor state with predecessor render or capture evidence.

### Reset races the active scheduler

The browser editor can invoke `runtime.reset` while RAF is active, and editor callers can also invoke `runtime.tick`. There is no frame lease, expected revision, command ID or stale completion rejection.

### Replay is not independently provable

There is no reset journal containing predecessor fingerprint, successor fingerprint, command identity, participant receipts or first successor frame. Repeating a tick sequence after reset cannot be compared as an admitted replay transaction.

## Domains in use

```txt
repository and source revision identity
browser and headless environment identity
immutable game state and active session identity
runtime tick and reset commands
RAF and manual editor tick scheduling
meadow provider and base render-plan ownership
render-plan enhancer and renderer caches
GameHost and editor capability readback
headless capture baseline and renderer comparison
error and observation ledgers
reset participant preparation and atomic adoption
stale command and stale frame rejection
replay journal and state/render fingerprints
first reset-session frame acknowledgement
static, browser, build and Pages validation
repo-local and central audit tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned reset/replay authority surfaces: 21
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
meadow-runtime-reset-session-replay-authority-domain
```

## Required transaction

```txt
RuntimeResetCommand
  -> bind environment, command, predecessor session and expected state revision
  -> suspend RAF and manual tick submission leases
  -> capture predecessor state, provider, plan, renderer and observation fingerprints
  -> prepare a successor SessionGeneration
  -> reset state, provider, plan, enhancer, renderer and editor participants by policy
  -> clear or explicitly carry error and capture ledgers
  -> reject duplicate, stale or superseded reset work
  -> atomically adopt every successor participant or preserve every predecessor
  -> publish RuntimeResetResult and participant receipts
  -> append deterministic replay evidence
  -> resume one accepted scheduler generation
  -> publish FirstResetSessionFrameAck
```

## Planned coordinating kits

```txt
meadow-runtime-reset-session-replay-authority-domain
runtime-reset-command-kit
session-generation-kit
expected-state-revision-admission-kit
frame-submission-suspension-kit
manual-tick-admission-kit
state-reset-candidate-kit
provider-reset-participant-kit
render-plan-reset-participant-kit
enhancer-cache-reset-kit
renderer-cache-reset-kit
browser-observation-reset-kit
headless-capture-baseline-reset-kit
error-ledger-reset-policy-kit
reset-atomic-adoption-kit
reset-rollback-kit
runtime-reset-result-kit
reset-replay-journal-kit
reset-diagnostics-kit
first-reset-session-frame-ack-kit
reset-fixture-matrix-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-14T09-58-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T09-58-25-04-00.md
.agent/architecture-audit/2026-07-14T09-58-25-04-00-runtime-reset-session-replay-dsk-map.md
.agent/render-audit/2026-07-14T09-58-25-04-00-reset-state-render-evidence-coherence-gap.md
.agent/gameplay-audit/2026-07-14T09-58-25-04-00-reset-session-replay-loop.md
.agent/interaction-audit/2026-07-14T09-58-25-04-00-runtime-reset-command-result-map.md
.agent/reset-replay-audit/2026-07-14T09-58-25-04-00-session-generation-participant-reset-contract.md
.agent/deploy-audit/2026-07-14T09-58-25-04-00-reset-replay-fixture-gate.md
.agent/central-sync-audit/2026-07-14T09-58-25-04-00-repo-ledger-reset-replay-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, tests, dependencies, workflows and deployment were not changed. No reset atomicity, unique session generation, scheduler isolation, replay parity, first-reset-frame convergence or production-readiness claim is made.