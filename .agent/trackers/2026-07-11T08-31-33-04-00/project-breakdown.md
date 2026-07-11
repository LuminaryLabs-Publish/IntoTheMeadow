# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

**Scope:** documentation and architecture audit only

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with a commit-pinned external source provider, a local fallback source, 43 local DSK declarations, a render-plan enhancer, CPU mesh construction, a WebGL renderer, browser and Node editor surfaces, authored objectives, interaction targets and story beats.

This pass identifies a runtime-step and clock-integrity gap shared by the browser RAF, browser editor bridge and Node headless editor. Step requests are not admitted through a finite, monotonic, bounded transaction. Invalid or out-of-band values can regress time, poison state with non-finite values, create a non-terminating headless loop or mutate state without a correlated rendered frame.

## Plan ledger

**Goal:** define one session-owned step authority that validates finite delta values, enforces monotonic simulation time, limits requested work, returns typed results and correlates every accepted step with state and frame observations.

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Verify root `.agent/START_HERE.md` state for all nine eligible repositories.
- [x] Select only `IntoTheMeadow` under the oldest eligible fallback rule.
- [x] Read `AGENTS.md` and current root `.agent` state.
- [x] Trace browser RAF step production.
- [x] Trace browser editor `runtime.tick` and `runtime.reset`.
- [x] Trace Node headless `runtime.tick`, local time and reset.
- [x] Trace state conversion and tick recording.
- [x] Inspect current positive-path editor command smoke coverage.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the DSK/domain boundary and executable fixture gate.
- [x] Change documentation only.
- [ ] Runtime implementation remains future work.

## Repository selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries present: 9
root .agent START_HERE files present: 9
new or missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central-ledger timestamp
```

```txt
IntoTheMeadow       selected / 2026-07-11T06-38-59-04-00
MyCozyIsland         tracked  / 2026-07-11T07-01-49-04-00
PrehistoricRush      tracked  / 2026-07-11T07-08-45-04-00
TheOpenAbove         tracked  / 2026-07-11T07-18-44-04-00
HorrorCorridor       tracked  / 2026-07-11T07-30-40-04-00
PhantomCommand       tracked  / 2026-07-11T07-38-25-04-00
ZombieOrchard        tracked  / 2026-07-11T07-59-08-04-00
TheUnmappedHouse     tracked  / 2026-07-11T08-11-14-04-00
AetherVale           tracked  / 2026-07-11T08-18-31-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization.

## Interaction loop

### Browser route

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> load external meadow-area provider
  -> create game, renderer and enhancer
  -> expose GameHost and NexusEditorEnvironment
  -> requestAnimationFrame(frame)
  -> time = now / 1000
  -> game.tick({ dt: 1 / 60, time })
  -> enhance raw plan
  -> render WebGL frame
  -> update diagnostics
  -> request next frame
```

### Browser editor step route

```txt
NexusEditorEnvironment.invoke("runtime.tick", arguments)
  -> structuredClone arguments
  -> default dt = 1 / 60 and time = 0
  -> call GameHost.game.tick directly
  -> advance state immediately
  -> no scheduler admission
  -> no session or expected-frame fence
  -> no render-plan enhancement
  -> no WebGL render
  -> no committed-frame acknowledgement
  -> return completed capability result
```

### Node headless step route

```txt
runtime.tick({ dt, ticks })
  -> Number(ticks)
  -> for index < Number(ticks)
  -> time += Number(dt)
  -> game.tick({ dt, time })
  -> return current time and state
```

There is no finite-value check, integer tick-count check, maximum work budget, monotonic-time policy, duplicate request handling or typed rejection result.

## Source-backed findings

### Browser host and browser editor use separate step producers

The web host owns a RAF loop and calls `game.tick()` once per callback with fixed `dt: 1 / 60` and wall-clock `time: now / 1000`.

The editor bridge exposes the raw game object through `GameHost.game` and calls `game.tick()` directly. The capability defaults `time` to zero, so an editor tick with no explicit time can regress `lastTick.time` after the browser has already advanced for many frames.

The editor can also tick while RAF is active. Both calls increment the same `state.frame`, but only the RAF path enhances and renders a plan.

### State accepts invalid clock values

`advanceGameState()` records:

```txt
frame = previous frame + 1
lastTick.dt = Number(input.dt ?? 1 / 60)
lastTick.time = Number(input.time ?? 0)
```

It does not reject:

```txt
NaN
Infinity
-Infinity
negative dt
negative time
regressed time
unreasonably large dt
```

### Node headless ticking is unbounded

The Node editor uses `for (index < Number(ticks))`.

Consequences:

```txt
ticks = Infinity -> non-terminating loop
ticks = 1.5 -> two steps, not one or a typed rejection
ticks < 0 -> zero steps but successful response
ticks = NaN -> zero steps but successful response
dt = Infinity or NaN -> local time and state become non-finite
dt < 0 -> simulation time moves backward
very large ticks -> unbounded synchronous work
```

### Reset semantics diverge

```txt
browser editor reset
  -> resets game state only
  -> RAF remains active
  -> next RAF uses current wall-clock time

Node headless reset
  -> sets local time to zero
  -> invalidates enhancer
  -> resets game state
```

There is no shared reset-clock transaction or first-post-reset step result.

### Current tests cover only the happy path

The command smoke invokes:

```txt
runtime.tick --ticks 3 --dt 0.016
```

It verifies success and frame `3`. It does not test finite-value rejection, time monotonicity, integer tick counts, work limits, reset behavior, concurrent browser stepping or state/frame correlation.

## Domains in use

```txt
browser shell and DOM boot
manifest and external dependency declaration
source-provider discovery, loading, fallback and source-plan production
DSK registry, descriptor installation, validation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime session and RAF lifecycle
browser editor capability dispatch and error observation
Node headless editor runtime and workspace capabilities
runtime step command admission and clock policy
simulation time, delta, frame sequence and reset epoch
terrain, path, grass, scatter, tree, wind, atmosphere and style composition
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost observation and browser/Node capture
HUD, loading and fatal projection
static validation, headless smoke, build and Pages deployment
```

## Complete kit and service inventory

### External kit

```txt
meadow-area-kit 0.1.0
  area normalization
  path normalization
  style and material normalization
  deterministic seeded scatter
  grass descriptors
  flower, rock, mushroom and tree-line descriptors
  focal-tree descriptors
  wind and atmosphere descriptors
  render-plan generation
  validation
  snapshot and reset
  optional runtime-kit adapter
```

### Declared local DSKs and offered services

```txt
into-the-meadow-game-dsk
  game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk
  document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk
  dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk
  meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
meadow-terrain-texture-dsk
  terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk
  path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit
  density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit
  clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit
  clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit
  patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit
  batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit
  wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit
  near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit
  quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit
  density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk
  patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk
  grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
wind-field-dsk
  wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk
  focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk
  flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk
  sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk
  player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk
  camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk
  action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk
  interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk
  story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk
  objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk
  ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk
  ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk
  minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk
  save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk
  runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk
  quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
meadow-render-host-dsk
  renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit
  webgl-context, shader-programs, mesh-buffer-cache, outline-pass, cel-fog-pass
post-process-stack-dsk
  pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit
  scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit
  color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit
  warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit
  fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit
  radius, softness, strength, center, quality-tier
final-composite-pass-kit
  scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk
  build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

### Runtime source-backed kit surfaces

```txt
meadow-area-kit external provider
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL compatibility adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
GameHost diagnostics surface
browser editor bridge
Node headless-editor environment
```

## Required composed authority

```txt
meadow-runtime-step-authority-domain
  -> runtime-step-command-kit
  -> runtime-step-admission-kit
  -> finite-delta-policy-kit
  -> monotonic-simulation-clock-kit
  -> step-budget-kit
  -> step-sequence-kit
  -> step-result-kit
  -> step-journal-kit
  -> session-frame-fence-kit
  -> browser-raf-step-adapter-kit
  -> browser-editor-step-adapter-kit
  -> headless-editor-step-adapter-kit
  -> reset-clock-transaction-kit
  -> step-frame-correlation-kit
  -> runtime-step-fixture-kit
```

Update existing owners first:

```txt
into-the-meadow-game-dsk
web-host-dsk
meadow-diagnostics-dsk
meadow-render-host-dsk
```

The parent domain should own only cross-surface admission, clock sequencing, work budgeting and result correlation.

## Required command and result

```js
{
  id: "step-0001",
  sessionId: "arrival-meadow:session-0",
  source: "browser-raf" | "browser-editor" | "node-editor",
  expectedFrame: 12,
  requestedSteps: 1,
  requestedDt: 0.0166666667,
  requestedTime: 0.216666667
}
```

```js
{
  commandId: "step-0001",
  status: "accepted" | "rejected" | "duplicate" | "stale",
  reason: "ok" | "non-finite-dt" | "negative-dt" | "non-integer-step-count" | "step-budget-exceeded" | "time-regression" | "session-mismatch" | "frame-mismatch",
  acceptedSteps: 1,
  consumedDt: 0.0166666667,
  priorFrame: 12,
  committedFrame: 13,
  priorTime: 0.2,
  committedTime: 0.216666667,
  renderCommitId: null,
  journalSequence: 1
}
```

## Required proof

```txt
NaN and infinite dt rejected
negative dt rejected unless an explicit rewind domain exists
NaN, infinite and negative tick counts rejected
fractional tick counts rejected
step count capped by a deterministic budget
zero-step request returns typed no-op or rejection
simulation time never regresses
browser editor cannot bypass active session scheduling
one accepted step increments frame exactly once
rejected requests mutate no state
reset retires the prior clock epoch
first post-reset step is correlated
headless and browser adapters return the same result schema
step journal is bounded and clone-safe
rendered frame identifies the accepted step that produced it
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Runtime Step Admission and Clock Integrity + Finite / Monotonic / Budget Fixture Gate
3. Source Provider Authority + External/Fallback Admission and Parity Fixture Gate
4. Render Topology Identity Authority + Source Mutation / Cache Rebuild Fixture Gate
5. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
6. Interaction Command Authority + Path/Inspect/Objective Progress Fixture Gate
7. DSK Registry Truth + Declared/Implemented/Consumed Fixture Gate
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
runtime step fixture: unavailable
clock monotonicity fixture: unavailable
step budget fixture: unavailable
browser/editor concurrency fixture: unavailable
```

Do not claim deterministic editor stepping until invalid values, time regression, work limits, reset epochs, concurrent RAF/editor calls and first correlated render commits are executable and passing.