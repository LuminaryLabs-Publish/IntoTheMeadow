# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`  
**Branch:** `main`  
**Status:** `frame-scheduler-step-admission-authority-audited`

## Summary

IntoTheMeadow has one pinned external provider, 43 local DSK/kit declarations, immutable game state, a persistent WebGL renderer, browser `GameHost`, browser editor bridge and Node headless-editor tooling.

The active browser loop owns no authoritative clock or scheduler generation. Every RAF callback advances the game exactly once with `dt: 1 / 60`, renders with absolute RAF time, and schedules its successor. This makes future simulation refresh-rate dependent, allows visual time to jump independently after stalls, and permits a stop/start race to create multiple live RAF chains.

## Plan ledger

**Goal:** preserve the complete 44-kit architecture while defining one monotonic, single-chain, bounded frame transaction from RAF admission through fixed-step simulation and a correlated visible frame.

- [x] Compare the full ten-repository Publish organization list against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible synchronized repository.
- [x] Verify the repo-local documentation head matches the central ledger.
- [x] Inspect browser boot, host scheduling, state advancement, renderer timing, raw host exposure and existing proof surfaces.
- [x] Identify the complete interaction loop and all active, declared and missing domains.
- [x] Preserve every implemented or declared kit and every offered service.
- [x] Define the missing frame-scheduler and step-admission parent authority.
- [x] Add the timestamped tracker, turn ledger and system-specific audit family.
- [x] Refresh all required root `.agent` documents and machine registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Runtime scheduler implementation and executable timing fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T17-58-43-04-00 selected
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> import commit-pinned meadow-area provider
  -> validate 43 local descriptors
  -> create immutable game state and authored content references
  -> create render-plan enhancer, WebGL renderer, GameHost and editor bridge
  -> request one RAF callback

current browser callback
  -> receive RAF now
  -> derive render time = now / 1000
  -> call game.tick({ time, dt: 1 / 60 })
  -> commit frame + 1 and lastTick without clock admission
  -> build and enhance the render plan using absolute RAF time
  -> animate wind from absolute render-plan time
  -> draw outline and color passes
  -> publish renderer snapshot without clock correlation
  -> request the next RAF callback

stop/start
  -> stop changes one boolean only
  -> a pending RAF callback remains owned by the browser
  -> start clears the boolean and requests another callback
  -> the pending predecessor and new callback can both continue recursive chains

raw host path
  -> window.GameHost.game exposes tick and reset
  -> callers can bypass the browser scheduler
  -> arbitrary dt/time values can enter state
```

## Domains in use

```txt
browser document shell, loading and fatal projection
external provider import, fallback and structural validation
DSK descriptors, declaration state and snapshots
game manifest, immutable state, tick, reset and snapshots
authored story, objective and interaction-target content
terrain, path, grass, trees, scatter, wind and atmosphere
render-plan enhancement, topology caching and CPU mesh construction
WebGL context, program, buffers, uniforms, resize and two-pass drawing
camera descriptors and visual-frame projection
GameHost, browser editor and Node headless-editor observation
static checks, build and GitHub Pages deployment

declared but inert:
input, player, interaction, objective, story, ecology, audio, UI, save and adaptive performance

missing cross-cutting authority:
runtime clock, RAF ownership, scheduler generation, fixed-step accumulation,
step budgets, pause/resume results, stale callback rejection,
render/simulation clock correlation and visible-frame acknowledgement
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
runtime clock authorities: 0
RAF lease/generation owners: 0
fixed-step batch results: 0
clocked visible-frame acknowledgements: 0
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area normalization; path normalization; style/material normalization; deterministic seeded scatter; meadow feature descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter |
| `into-the-meadow-game-dsk` | game-manifest; kit-stack-registry; game-state-root; boot-sequence; game-snapshot |
| `web-host-dsk` | document-shell; browser-loop; host-debug-surface; asset-loading-host; browser-safety |
| `game-composition-dsk` | dsk-registry; scene-composition; render-composition; simulation-composition; composition-validation |
| `meadow-area-bridge-dsk` | meadow-area-config; meadow-feature-config; meadow-area-kit-adapter; meadow-area-state; meadow-area-validation |
| `meadow-terrain-texture-dsk` | terrain-surface-model; material-layer-system; path-layer-system; terrain-sampler; terrain-validation |
| `path-corridor-dsk` | path-curve-model; walkable-corridor; path-surface-detail; path-progression; path-validation |
| `grass-density-texture-kit` | density-texture-model; density-channels; density-compositor; density-sampler; density-validation |
| `grass-clump-archetype-kit` | clump-family-registry; card-layout-generator; texture-atlas-binding; clump-variant-generator; archetype-validation |
| `grass-static-batch-kit` | clump-mesh-builder; batch-variant-cache; atlas-material; static-batch-lod; batch-validation |
| `grass-patch-placement-kit` | patch-grid; density-driven-placement; clump-instance-selection; patch-instance-buffer; placement-validation |
| `grass-clump-instancing-render-kit` | batch-registry; instance-stream; draw-group-builder; shader-binding; render-validation |
| `grass-shader-wind-kit` | wind-uniforms; tip-bend-model; phase-field; gust-response; wind-validation |
| `grass-lod-policy-kit` | near-lod; mid-lod; far-lod; terrain-tint-lod; lod-validation |
| `grass-density-scaling-kit` | quality-scale; budget-scale; density-scale; profile-scale; scale-validation |
| `grass-debug-visualization-kit` | density-view; patch-view; instance-view; lod-view; debug-validation |
| `grass-patch-dsk` | patch-grid; blade-distribution; terrain-awareness; wind-binding; grass-validation |
| `gpu-grass-render-dsk` | grass-instance-buffer; grass-blade-mesh; shader-wind; grass-lod-render; grass-render-validation |
| `wind-field-dsk` | wind-state; wind-sampler; wind-zones; wind-consumers; wind-validation |
| `tree-object-dsk` | focal-tree-model; tree-line-model; tree-materials; tree-wind-binding; tree-validation |
| `meadow-scatter-dsk` | flower-scatter; rock-scatter; mushroom-scatter; placement-rules; scatter-validation |
| `meadow-atmosphere-dsk` | sky-gradient; sun-system; cloud-layer; distant-hills; atmosphere-validation |
| `meadow-player-dsk` | player-state; movement-profile; terrain-contact; player-actions; player-validation |
| `meadow-camera-dsk` | camera-mode; camera-rig; camera-collision; camera-feel; camera-validation |
| `meadow-input-dsk` | action-map; device-bindings; input-context; input-normalization; input-validation |
| `meadow-interaction-dsk` | interactable-registry; affordance-rules; inspect-state; interaction-events; interaction-validation |
| `meadow-story-dsk` | story-state; story-beats; dialogue-text; sequence-runner; story-validation |
| `meadow-objective-dsk` | objective-model; objective-flow; completion-ledger; feedback-surface; objective-validation |
| `meadow-ecology-dsk` | ambient-life; ecology-zones; ambience-triggers; non-gameplay-agents; ecology-validation |
| `meadow-audio-dsk` | ambient-bed; spatial-audio-cues; audio-state; audio-events; audio-validation |
| `meadow-ui-dsk` | minimal-hud; story-text-panel; debug-ui; ui-state; ui-validation |
| `meadow-save-dsk` | save-model; save-slots; persistence-adapter; migration; save-validation |
| `meadow-diagnostics-dsk` | runtime-health; render-health; determinism-checks; smoke-tests; diagnostics-report |
| `meadow-performance-dsk` | quality-profile; budget-policy; lod-policy; adaptive-scaling; performance-validation |
| `meadow-render-host-dsk` | renderer-selection; render-plan-ingest; pass-order; renderer-state; renderer-validation |
| `meadow-webgl-renderer-v2-kit` | WebGL context acquisition; shader program creation; attribute/uniform binding; CPU mesh ingestion; GPU buffer ownership; draw submission; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass-registry; render-target-system; sobel-outline-pass; color-grade-pass; post-validation |
| `render-target-kit` | scene-color-texture; depth-texture; normal-texture; ping-pong-buffer; resize-policy |
| `sobel-outline-pass-kit` | color-edge-threshold; depth-edge-threshold; normal-edge-threshold; outline-color; object-mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow-tint; highlight-tint |
| `depth-fog-pass-kit` | fog-near; fog-far; fog-color; distance-curve; horizon-haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality-tier |
| `final-composite-pass-kit` | scene-input; post-input; output-target; debug-overlay; fallback-composite |
| `static-pages-deploy-dsk` | build-config; github-pages-workflow; release-artifacts; cache-invalidation; deploy-validation |

## Source-backed findings

### Fixed dt is tied to callback count

The browser host calls `game.tick({ time, dt: 1 / 60 })` exactly once per RAF callback rather than deriving elapsed time or draining a fixed-step accumulator.

```txt
30 Hz display  -> 30 callbacks/sec * 1/60 = 0.5 simulated seconds/sec
60 Hz display  -> 60 callbacks/sec * 1/60 = 1.0 simulated seconds/sec
120 Hz display -> 120 callbacks/sec * 1/60 = 2.0 simulated seconds/sec
```

The current state does not yet move the player, but any future dt-based player, objective, ecology or audio consumer would inherit this refresh-rate dependency.

### Simulation and render clocks can diverge

After a hidden-tab pause or long main-thread stall:

```txt
RAF time:
  jumps to the current monotonic timestamp

simulation:
  advances one fixed 1/60 step only

wind shader:
  jumps to the new absolute RAF time
```

No result records deferred time, dropped time, catch-up policy or interpolation.

### Stop/start can create multiple recursive chains

`stop()` does not retain or cancel a RAF handle. If `start()` runs before a pending callback fires, the predecessor callback sees `stopped === false`, advances and schedules another successor while the newly scheduled callback does the same.

### Tick inputs are not admitted

`advanceGameState()` converts values with `Number(...)` and records them without proving finiteness, non-negativity, monotonicity, maximum delta or scheduler ownership. `window.GameHost.game` exposes direct `tick()` and `reset()` access.

### Render readback has no temporal provenance

The renderer snapshot reports plan, topology and mesh statistics, but not:

```txt
runtime clock id or generation
scheduler generation
RAF lease or callback sequence
simulation step batch
simulation revision
render time source
dropped or deferred time
visible frame acknowledgement
```

## Required parent domain

```txt
meadow-frame-scheduler-step-admission-authority-domain
```

This domain coordinates the existing web host, game state, renderer, diagnostics and performance owners. It should not move browser APIs into gameplay domains or create a parallel renderer.

## Candidate coordinating kits

```txt
runtime-clock-id-kit
runtime-clock-generation-kit
raf-lease-kit
frame-scheduler-generation-kit
frame-clock-sample-kit
frame-delta-classification-kit
fixed-step-policy-kit
fixed-step-accumulator-kit
fixed-step-budget-kit
simulation-step-command-kit
simulation-step-batch-result-kit
dropped-time-result-kit
deferred-time-result-kit
pause-command-kit
resume-command-kit
scheduler-stop-result-kit
stale-frame-callback-rejection-kit
render-time-projection-kit
frame-clock-correlation-kit
frame-observation-kit
frame-journal-kit
first-clocked-frame-ack-kit
refresh-rate-parity-fixture-kit
long-stall-budget-fixture-kit
stop-start-single-chain-fixture-kit
invalid-clock-input-fixture-kit
browser-frame-clock-smoke-kit
pages-frame-clock-smoke-kit
```

## Required transaction

```txt
RAF callback
  -> validate current runtime session, scheduler generation and RAF lease
  -> sample monotonic time
  -> classify first, normal, stalled, regressed, cancelled or stale
  -> accumulate bounded elapsed time
  -> admit zero or more fixed simulation steps under count and CPU budgets
  -> publish SimulationStepBatchResult
  -> publish explicit deferred-time or dropped-time result
  -> derive render time from committed simulation and interpolation evidence
  -> render one frame citing clock, step and render revisions
  -> schedule exactly one successor callback or commit an explicit stop
  -> publish FrameClockCorrelation and FrameObservation
  -> acknowledge the first visible frame citing the accepted frame result
```

## Required invariants

```txt
at most one live RAF chain exists for a runtime generation
every callback cites the current scheduler generation and RAF lease
simulation dt is finite, nonnegative, bounded and policy-owned
equivalent elapsed input produces equivalent simulated time across refresh rates
long stalls cannot trigger unbounded catch-up work
dropped and deferred time are explicit typed results
render time cites the same clock and step revision as projected game state
stop and fatal transitions retire the RAF lease exactly once
stale callbacks and direct invalid ticks perform zero state mutation
accepted user-visible frames receive a typed visible-frame acknowledgement
```

## Required fixture matrix

```txt
30/60/120 Hz refresh-rate parity
first-frame and normal-frame sampling
long stall with bounded catch-up
clock regression or non-monotonic sample rejection
negative, NaN and Infinity tick input rejection
stop with pending RAF callback
stop then immediate start single-chain proof
repeated start idempotency
fatal transition lease retirement
raw GameHost tick quarantine
simulation/render-time correlation
browser source, built output and GitHub Pages parity
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay, rendering, package scripts, dependencies and deployment files are unchanged. Existing checks were inspected but not executed. No refresh-rate parity, bounded catch-up, single-chain lifecycle, invalid-clock rejection or visible-frame clock proof currently exists.
