# Project Breakdown: IntoTheMeadow Editor Mutation Visible-Frame Settlement

**Timestamp:** `2026-07-15T01-39-38-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `e08389135f5b8a64b293b72b4ad368773334b67b`  
**Status:** `editor-mutation-visible-frame-settlement-authority-audited`

## Summary

IntoTheMeadow exposes a browser editor environment over the same mutable game used by the autonomous web-host RAF. `runtime.tick` directly advances the game and `runtime.reset` directly recreates game state, but the editor command returns before the host rebuilds the render plan, submits a renderer frame, or acknowledges a matching canvas.

`renderer.capture` serializes the canvas and current renderer snapshot immediately. It does not bind the capture to the runtime mutation that preceded it. The next RAF can also advance the game again before rendering, so a manual editor tick can result in two simulation advances before the first visible command acknowledgement.

The Node editor environment uses a different tick schema, owns private editor time, invalidates the enhancer on reset, builds observations synchronously, and exposes `renderer.compare`. The browser and Node surfaces share the `nexus-headless-editor-environment/v1` family without a versioned parity decision.

## Plan ledger

**Goal:** bind editor mutation, scheduler ownership, runtime revision, render plan, renderer submission, capture, and visible-frame evidence into one truthful command result.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Compare current eligible heads with their recorded documentation heads.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only `IntoTheMeadow` by the oldest synchronized central timestamp.
- [x] Inspect browser editor capabilities, the autonomous RAF host, game tick/reset, Node editor behavior, scenarios, package scripts, and browser observation proof.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Add the timestamped editor mutation and visible-frame audit family.
- [x] Change documentation only and target `main`.
- [x] Create no branch or pull request.
- [ ] Implement command/frame settlement and executable browser/Node parity fixtures later.

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
prior central timestamp: 2026-07-14T20-40-50-04-00
next oldest eligible repository: HorrorCorridor
```

## Complete interaction loop

```txt
document boot
  -> external meadow provider imports
  -> game, renderer and render-plan enhancer are created
  -> GameHost and NexusEditorEnvironment are published
  -> recursive RAF starts

normal RAF frame
  -> game.tick(time, 1/60)
  -> obtain source render plan
  -> enhance and validate render plan
  -> renderer.render(plan)
  -> update lastPlan and lastRender
  -> schedule the next RAF

browser editor runtime.tick
  -> direct game.tick(dt, time)
  -> return status=completed
  -> no RAF suspension
  -> no lastPlan refresh
  -> no render
  -> no visible-frame acknowledgement

browser editor runtime.reset
  -> direct game.reset()
  -> return status=completed
  -> no editor-time reset
  -> no enhancer invalidation
  -> no render
  -> no visible-frame acknowledgement

browser editor renderer.capture
  -> canvas.toDataURL()
  -> read current renderer snapshot
  -> return capture without state/frame binding

next RAF
  -> game ticks again
  -> a later state is rendered
```

## Main findings

### Browser editor mutation is not frame-settled

The browser bridge invokes the game directly. Its generic `invoke` result becomes `completed` after the capability function returns, not after a matching render plan and renderer frame are accepted.

### Capture can combine different revisions

The canvas can still contain the predecessor frame while `runtime.getState` already exposes the mutation. The renderer snapshot can likewise describe the last RAF render rather than the just-completed editor command.

### Autonomous RAF can add an unintended second step

Because editor mutation does not acquire or suspend the RAF lease, the next scheduled frame can call `game.tick` again before producing the first visible result of the manual editor tick.

### Browser and Node capability semantics diverge

```txt
surface                 browser                         Node
runtime.tick            { dt, time }                    { dt, ticks }
runtime.reset           game.reset only                 time=0, enhancer.invalidate, game.reset
renderer.capture        current browser canvas          rebuilt JSON/SVG observation artifacts
renderer.compare        unavailable                     available
time ownership          RAF timestamp and caller input  private deterministic editor time
protocol family         nexus-headless-editor-environment/v1
```

A shared protocol family exists, but no capability manifest or compatibility result states whether these differences are accepted.

## Domains in use

```txt
repository, host-generation and editor-command identity
browser startup and external provider admission
DSK and game composition
game-state tick and reset
browser RAF scheduling and lease ownership
render-plan generation, enhancement and validation
WebGL renderer state and canvas presentation
browser GameHost and editor capability publication
Node headless editor runtime and terminal transport
capture, compare, workspace and artifact publication
browser and Node capability-schema parity
editor mutation results, rejection and rollback
visible-frame acknowledgement
browser, build and Pages proof
repo-local and central audit tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned editor settlement surfaces: 20
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

`meadow-editor-mutation-visible-frame-settlement-authority-domain`

## Required transaction

```txt
EditorMutationCommand
  -> bind EditorCommandId, HostGeneration, capability manifest,
     previous RuntimeRevision and expected FrameRevision
  -> acquire or suspend the browser RAF lease
  -> classify headless or visible mutation policy
  -> execute exactly one tick, reset or admitted mutation
  -> publish the accepted RuntimeRevision
  -> rebuild and validate one matching render plan
  -> submit one matching renderer frame
  -> publish EditorMutationResult and participant receipts
  -> acknowledge FirstVisibleEditorMutationFrameAck
  -> permit capture and comparison only against that frame
  -> reject stale, duplicate, concurrent, retired and mixed-revision work
  -> restore the admitted RAF policy
```

## Planned coordinating kits

```txt
meadow-editor-mutation-visible-frame-settlement-authority-domain
editor-command-identity-kit
editor-capability-manifest-kit
editor-surface-parity-kit
editor-mutation-command-kit
editor-mutation-admission-kit
browser-raf-lease-kit
editor-step-suspension-kit
editor-runtime-revision-kit
editor-render-attempt-kit
editor-frame-settlement-kit
editor-capture-binding-kit
editor-reset-participant-kit
editor-stale-frame-rejection-kit
editor-mutation-result-kit
editor-visible-frame-ack-kit
editor-error-receipt-kit
editor-browser-fixture-kit
editor-node-browser-parity-fixture-kit
editor-deploy-parity-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-15T01-39-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T01-39-38-04-00.md
.agent/architecture-audit/2026-07-15T01-39-38-04-00-editor-mutation-frame-settlement-dsk-map.md
.agent/render-audit/2026-07-15T01-39-38-04-00-editor-mutation-stale-canvas-gap.md
.agent/gameplay-audit/2026-07-15T01-39-38-04-00-editor-tick-reset-double-step-loop.md
.agent/interaction-audit/2026-07-15T01-39-38-04-00-editor-command-frame-result-map.md
.agent/editor-runtime-audit/2026-07-15T01-39-38-04-00-browser-node-command-settlement-contract.md
.agent/deploy-audit/2026-07-15T01-39-38-04-00-editor-mutation-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T01-39-38-04-00-oldest-selection-editor-frame-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, renderer behavior, editor capabilities, scenarios, tests, dependencies, workflows, and deployment were not changed. No editor-command atomicity, browser/Node parity, capture freshness, reset convergence, double-step prevention, visible-frame convergence, artifact parity, or production-readiness claim is made.
