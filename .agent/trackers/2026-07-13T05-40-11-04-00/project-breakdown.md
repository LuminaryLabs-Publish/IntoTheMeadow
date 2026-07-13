# Project Breakdown: IntoTheMeadow Browser Editor Capability Admission

**Timestamp:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Repository head reviewed:** `2228efc95206d40e62cc714e83bbc71cbefe6339`  
**Status:** `browser-editor-capability-admission-authority-audited`

## Summary

IntoTheMeadow exposes a browser editor bridge beside the live RAF loop. The bridge publishes direct `runtime.tick` and `runtime.reset` mutation capabilities through `window.NexusEditorEnvironment`, while `window.GameHost` also exposes the raw game object. Those mutations do not pass through scheduler ownership, expected-state revisions, command identity, lifecycle generation, or visible-frame correlation. An editor call can therefore mutate gameplay between RAF frames and immediately observe or capture a render snapshot produced from the predecessor state.

## Plan ledger

**Goal:** require every browser editor capability to declare observation or mutation intent, bind one environment and scheduler generation, commit through one typed transaction, and acknowledge the first matching visible frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no eligible repo-local documentation head is ahead of central tracking.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest eligible central timestamp.
- [x] Trace browser boot, GameHost exposure, editor bridge registration, RAF mutation, direct tick/reset, capture, error observation, stop/start and disposal.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Define the missing browser editor capability-admission authority.
- [x] Add architecture, render, gameplay, interaction, editor-bridge and deployment audits.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute editor concurrency, lifecycle and frame-correlation fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local heads newer than central documentation heads: 0

IntoTheMeadow      2026-07-13T02-39-44-04-00 selected
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

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
browser document
  -> load src/boot/boot-game.js
  -> startWebHost()
  -> load pinned external meadow provider
  -> create immutable game state and render plan
  -> create WebGL renderer and render-plan enhancer
  -> expose window.GameHost including raw game
  -> install window.NexusEditorEnvironment
  -> start recursive requestAnimationFrame loop

live RAF frame
  -> game.tick({ time: now / 1000, dt: 1 / 60 })
  -> obtain and enhance render plan
  -> validate render contract
  -> render and replace lastPlan / lastRender
  -> schedule successor RAF callback

browser editor observation
  -> invoke runtime.status, state, snapshot, scene or renderer read capability
  -> clone arguments
  -> execute capability
  -> return generic completed/failed wrapper

browser editor mutation
  -> invoke runtime.tick or runtime.reset
  -> call raw game mutation directly
  -> no scheduler lease or expected state revision
  -> no render-plan or visible-frame commit
  -> generic completed result can return before RAF renders successor state

browser editor capture
  -> canvas.toDataURL immediately
  -> attach current renderer snapshot
  -> capture can cite predecessor rendered pixels after a successful mutation

host stop/start
  -> stop toggles one boolean
  -> editor bridge remains installed and mutation-capable
  -> start schedules another RAF callback
  -> bridge generation and error journal are retained

bridge disposal
  -> dispose can remove listeners and global bridge
  -> web host stop does not call dispose
  -> no environment-retirement receipt is published
```

## Domains in use

```txt
browser document, canvas, loading and fatal projection
external provider loading and local fallback
immutable game state, reset, snapshots and diagnostics
DSK declaration registry, required/planned status and validation
meadow area, terrain, path, scatter, trees, grass, wind and atmosphere
render-plan enhancement, contract normalization and CPU mesh generation
WebGL context, GPU resources, draw submission and renderer snapshots
RAF clock, frame scheduling and render publication
GameHost public readback and raw game exposure
browser editor capability registry and generic invocation wrapper
runtime observation, direct tick/reset mutation and canvas capture
browser error and unhandled-rejection observation
Node headless runtime, workspace, scenarios, loops and artifacts
static checks, deterministic checks, build and Pages deployment
missing browser editor capability admission, lifecycle and visible-frame authority
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented browser editor admission authorities: 0
planned browser editor authority kits including parent: 26
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

### Direct mutation bypass

`installIntoTheMeadowEditorBridge()` registers `runtime.tick` and `runtime.reset` by calling `gameHost.game.tick()` and `gameHost.game.reset()` directly. `exposeGameHost()` publishes the raw `game` object publicly, so mutation is not constrained to the bridge wrapper.

### Independent scheduler ownership

`startWebHost()` owns a recursive RAF loop that calls `game.tick()` every callback. Editor mutations do not acquire an RAF lease, pause the loop, wait for a fixed boundary, or bind to the active scheduler generation.

### Generic completion is not a gameplay commit receipt

`invoke()` returns `{ ok, status, action, data }`, but contains no command ID, expected revision, state revision before/after, scheduler generation, mutation classification, duplicate status, or stale rejection.

### State and rendered pixels can diverge

`runtime.tick` and `runtime.reset` complete synchronously. `lastPlan` and `lastRender` change only on the next RAF frame. A state read can therefore expose the successor while `renderer.capture` still captures predecessor pixels and renderer metadata.

### Stop does not retire editor mutation

The host `stop()` only sets `stopped = true`. It does not call `editorBridge.dispose()`, remove the global bridge, classify the environment as retired, or reject later mutation calls.

### Error observation is unbounded and generationless

The bridge appends browser errors, unhandled rejections and capability errors to one array without a bound, session generation, acknowledgement cursor, retention policy, or retirement reset.

### Reset and tick arguments lack admission

The game state accepts direct mutation. Tick increments the frame and records numeric `dt` and `time`; reset allocates the initial state. Neither path validates an expected state revision or publishes render correlation.

## Main failure paths

```txt
editor reset between RAF callbacks
  -> state returns to initial frame and session data
  -> lastPlan / lastRender still describe predecessor presentation
  -> capture can report completed with predecessor pixels

editor tick while RAF is active
  -> callback frequency plus external calls determine state frame count
  -> no command ordering or scheduler receipt explains the mutation

host stop
  -> RAF mutation pauses
  -> editor bridge remains globally reachable
  -> runtime.tick and runtime.reset remain mutation-capable

second environment installation
  -> target.NexusEditorEnvironment is overwritten
  -> predecessor listeners are not automatically retired
  -> both error listeners can remain active
```

## Required parent domain

```txt
meadow-browser-editor-capability-admission-authority-domain
```

## Required transaction

```txt
EditorCapabilityCommand
  -> bind editor environment ID and generation
  -> bind capability-registry and policy revisions
  -> classify observation or mutation
  -> validate arguments and expected state/render revisions
  -> reject unavailable, stale, duplicate or retired commands with zero mutation
  -> acquire an exclusive scheduler lease for mutation
  -> execute tick/reset at an admitted simulation boundary
  -> publish EditorCapabilityResult with before/after revisions
  -> refresh render-plan and render evidence when user-visible state changed
  -> acknowledge the first matching visible frame
  -> release the scheduler lease exactly once
  -> append a bounded redacted journal entry
```

## Candidate coordinating kits

```txt
meadow-browser-editor-capability-admission-authority-domain
editor-environment-id-kit
editor-environment-generation-kit
editor-capability-registry-revision-kit
editor-capability-policy-kit
editor-command-id-kit
editor-capability-command-kit
editor-capability-classification-kit
editor-observation-admission-kit
editor-mutation-admission-kit
editor-argument-validation-kit
editor-expected-state-revision-kit
editor-scheduler-generation-kit
editor-scheduler-lease-kit
editor-step-boundary-kit
editor-tick-transaction-kit
editor-reset-transaction-kit
editor-state-transition-result-kit
editor-render-correlation-kit
editor-visible-frame-ack-kit
stale-editor-command-rejection-kit
retired-editor-environment-rejection-kit
editor-command-journal-kit
bounded-editor-error-journal-kit
editor-environment-retirement-kit
editor-capability-fixture-gate-kit
```

## Validation boundary

Documentation only. No runtime, gameplay, renderer, editor bridge, package, test or deployment file changed. No browser, RAF-concurrency, reset/capture, lifecycle, duplicate-installation, bounded-error or Pages fixture was executed.
