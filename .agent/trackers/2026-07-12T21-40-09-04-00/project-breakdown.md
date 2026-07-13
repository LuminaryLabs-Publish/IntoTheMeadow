# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`  
**Branch:** `main`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

IntoTheMeadow contains one commit-pinned external meadow provider, 43 local DSK/kit declarations, immutable game state, deterministic meadow content, a persistent WebGL renderer, browser `GameHost`, a browser editor bridge and Node headless-editor tooling.

The current audit isolates WebGL context/resource recovery. One context, one shader program, five attribute bindings, twelve uniform bindings and five GPU buffers are owned implicitly for the renderer lifetime. No system admits context loss/restoration, suspends drawing, rebuilds a detached resource generation, rolls back failure or proves the first visible restored frame.

## Plan ledger

**Goal:** preserve the complete 44-kit architecture while documenting one renderer-context transaction from initial admission through loss, suspension, resource rebuild, atomic restoration and visible-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`, the oldest eligible central entry.
- [x] Inspect browser boot, host, precision proxy, context acquisition, shader/program construction, buffer ownership, drawing, snapshots, disposal and tests.
- [x] Identify the complete interaction loop and all active, declared and missing domains.
- [x] Preserve all 44 kit surfaces and every offered service.
- [x] Define the WebGL context/resource recovery parent authority.
- [x] Add the timestamped tracker, turn ledger and system-specific audit family.
- [x] Refresh all required root `.agent` documents and machine registry.
- [x] Update the central repository ledger and internal change log.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Runtime recovery implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T19-49-41-04-00 selected oldest
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
ZombieOrchard      2026-07-12T20-31-27-04-00
MyCozyIsland       2026-07-12T20-40-56-04-00
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-18-18-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> mount one full-viewport canvas
  -> load commit-pinned meadow-area provider
  -> validate 43 local descriptors
  -> create game, enhancer, renderer and editor bridge
  -> precision wrapper proxies canvas.getContext and shaderSource
  -> acquire webgl2 or webgl
  -> compile/link one shader program
  -> capture five attribute and twelve uniform locations
  -> expose GameHost
  -> request RAF

normal frame
  -> game.tick
  -> enhance render plan
  -> resize drawing buffer
  -> use captured program
  -> build or reuse CPU mesh
  -> if topology changed, delete old buffers and create five new buffers
  -> set uniforms
  -> draw outline pass
  -> draw color pass
  -> publish renderer snapshot
  -> request successor RAF

context loss
  -> no webglcontextlost listener
  -> no admitted preventDefault policy
  -> no context phase/generation transition
  -> no draw suspension or ContextLostResult
  -> no successful-snapshot suppression

context restoration
  -> no webglcontextrestored listener
  -> no program, binding, buffer or baseline-state rebuild
  -> no candidate validation, rollback or atomic generation install
  -> no scheduler-coordinated resume
  -> no first visible restored-frame acknowledgement

stop/fatal
  -> stop only flips a boolean
  -> renderer.dispose is not composed into host stop
  -> generic fatal projection only handles thrown errors
```

## Domains in use

```txt
browser document shell, loading and fatal projection
external provider import, fallback and structural validation
DSK descriptors, declaration state and snapshots
game manifest, immutable state, tick, reset and snapshots
authored story, objective and interaction-target content
terrain, path, grass, trees, scatter, wind and atmosphere
render-plan enhancement, topology cache and CPU mesh generation
WebGL context acquisition and precision-safe proxying
shader normalization, compilation, linking and binding discovery
GPU buffer allocation, replacement and disposal
viewport, GL state, two-pass draw and renderer readback
camera descriptors and visible-frame projection
GameHost, browser editor and Node headless-editor observation
static checks, build and GitHub Pages deployment

declared but inert:
input, player, interaction, objective, story, ecology, audio, UI, save and adaptive performance

missing:
renderer/canvas/context identity and generations
context-loss/restoration event authority
draw suspension and typed context results
GPU-resource manifest, leases and rebuild transaction
candidate validation, rollback and atomic installation
stale event/callback/resource rejection
context lifecycle observation and journal
first visible restored-frame acknowledgement
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented context-recovery authorities: 0
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

### Context and bindings are construction-time singletons

The renderer acquires `webgl2` or `webgl`, compiles/links one program and captures five attribute plus twelve uniform locations when `createMeadowWebglRendererV2()` is called. No context ID or generation is attached to those handles.

### No context lifecycle events are admitted

The page, boot, host, precision wrapper and renderer register no `webglcontextlost` or `webglcontextrestored` listener. There is no prevent-default policy, loss result, recovery command or terminal context outcome.

### Resource rebuild is not transactional

Five buffers are rebuilt on topology changes, but `bindMesh()` deletes predecessor buffers before creating the candidate set. There is no detached GPU manifest, rollback owner or atomic install result. Context restoration has no program/binding/buffer rebuild entry point.

### Snapshot publication can disagree with the visible surface

After two `drawArrays` calls, the renderer unconditionally publishes a normal snapshot. It does not inspect `gl.isContextLost()`, a typed draw result, browser composition or a first-visible-frame receipt.

### Existing proof is CPU/topology proof

`renderer-v2-smoke.mjs` validates descriptor transformation, topology keys and CPU mesh buffer shapes. It does not create a browser context, inject loss, restore resources or prove visible recovery.

## Required parent domain

```txt
meadow-webgl-context-resource-recovery-authority-domain
```

## Candidate coordinating kits

```txt
renderer-id-kit
canvas-surface-id-kit
webgl-context-id-kit
webgl-context-generation-kit
webgl-context-phase-kit
webgl-context-event-envelope-kit
webgl-context-loss-admission-kit
webgl-context-loss-result-kit
webgl-draw-suspension-kit
webgl-resource-manifest-kit
webgl-resource-generation-kit
webgl-program-lease-kit
webgl-binding-manifest-kit
webgl-buffer-lease-kit
webgl-restoration-command-kit
webgl-restoration-admission-kit
webgl-program-rebuild-kit
webgl-buffer-rebuild-kit
webgl-baseline-state-rebuild-kit
webgl-resource-candidate-validation-kit
webgl-resource-install-commit-kit
webgl-resource-rollback-kit
webgl-predecessor-retirement-kit
stale-webgl-event-rejection-kit
stale-webgl-resource-rejection-kit
webgl-context-recovery-result-kit
webgl-context-observation-kit
webgl-context-journal-kit
first-restored-frame-ack-kit
webgl-loss-before-first-frame-fixture-kit
webgl-loss-between-passes-fixture-kit
webgl-loss-during-rebuild-fixture-kit
webgl-repeated-loss-fixture-kit
webgl-unrecoverable-context-fixture-kit
browser-webgl-recovery-smoke-kit
pages-webgl-recovery-smoke-kit
```

## Required transaction

```txt
WebGLContextEventEnvelope
  -> validate runtime session, renderer, canvas and expected context generation
  -> classify Lost, Restored, RepeatedLoss, Stale, Cancelled or Terminal

Lost
  -> apply admitted preventDefault policy
  -> suspend draw admission
  -> publish ContextLostResult
  -> invalidate context-bound leases
  -> preserve detached CPU mesh and last-good render-plan evidence
  -> stop successful snapshot publication

Restored
  -> allocate successor context/resource generations
  -> build detached program, binding and five-buffer candidates
  -> restore viewport and baseline GL state
  -> validate complete resource manifest
  -> atomically install or preserve Suspended
  -> roll back partial candidates
  -> retire predecessor handles exactly once
  -> reject stale events, callbacks and resources
  -> resume through the existing scheduler owner
  -> publish ContextRecoveryResult
  -> acknowledge first visible successor frame

Terminal
  -> publish ReloadRequired or FatalContextResult
  -> retire listeners/resources
  -> project truthful user-visible status
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T21-40-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T21-40-09-04-00.md
.agent/architecture-audit/2026-07-12T21-40-09-04-00-webgl-context-resource-recovery-dsk-map.md
.agent/render-audit/2026-07-12T21-40-09-04-00-lost-context-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T21-40-09-04-00-context-loss-blank-meadow-loop.md
.agent/interaction-audit/2026-07-12T21-40-09-04-00-context-loss-restore-admission-map.md
.agent/webgl-context-audit/2026-07-12T21-40-09-04-00-generation-resource-rebuild-contract.md
.agent/deploy-audit/2026-07-12T21-40-09-04-00-webgl-context-recovery-fixture-gate.md
```

## Validation

Documentation only. Runtime source, gameplay, renderer behavior, package scripts, dependencies and deployment remain unchanged. `npm run check`, browser context-loss injection, restoration, repeated-loss, partial-rebuild rollback, first-restored-frame and Pages recovery fixtures were not run. No context recovery, resource rebuild, stale-generation, visible-frame or production-readiness claim is made.
