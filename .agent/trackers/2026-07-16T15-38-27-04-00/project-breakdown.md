# Project Breakdown: Browser Failure Classification and Bounded Diagnostic Projection

**Timestamp:** `2026-07-16T15-38-27-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `fd198200bd6236c67f0c5f36bb773d008a58b331`  
**Status:** `browser-failure-classification-bounded-diagnostic-projection-authority-audited`

## Summary

IntoTheMeadow has three separate browser failure paths: boot rejection, render-loop fatal failure, and editor/global browser error collection. They expose raw stack, message, filename and location details through the visible HUD or globally accessible editor diagnostics, while the editor error array grows without a bound, deduplication, retention policy, stable public code, severity, retryability or recovery result.

## Plan ledger

**Goal:** retain useful internal failure evidence while publishing one bounded, typed and redacted result through the game HUD, editor bridge, diagnostics and release fixtures.

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead priority repositories.
- [x] Select only IntoTheMeadow by the oldest synchronized central timestamp.
- [x] Inspect boot, web-host, editor bridge, diagnostics, public host exposure and smoke surfaces.
- [x] Identify the complete interaction loop, domains, all 44 kit surfaces and offered services.
- [x] Define one browser-failure authority and 20 coordinating surfaces.
- [x] Add the timestamped audit family under root `.agent`.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement typed failure admission, bounded diagnostics, redaction, recovery and browser/deployment fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/IntoTheMeadow
selection rule: oldest synchronized central timestamp
selected prior timestamp: 2026-07-16T05-58-36-04-00
next oldest: LuminaryLabs-Publish/HorrorCorridor at 2026-07-16T07-03-14-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> index.html loads boot-game.js
  -> boot queries canvas, HUD, status and loading elements
  -> startWebHost loads the external meadow provider
  -> create game, renderer, enhancer, public GameHost and editor bridge

normal frame
  -> recursive RAF advances the time-only game state
  -> derive, enhance and validate the render plan
  -> render the WebGL frame
  -> optionally project debug counters

boot failure
  -> boot catch reveals the HUD
  -> writes error.stack, error.message or String(error) into #status
  -> writes a generic loading failure string

runtime fatal failure
  -> showFatal stops frame scheduling
  -> reveals the HUD
  -> writes raw stack/message text into #status
  -> writes a generic renderer-stopped string

browser/editor failure observation
  -> window error and unhandledrejection listeners append raw records
  -> capability failures append raw action/message records
  -> browser.getErrors and editor snapshot expose the full accumulated array

missing settlement
  -> no stable public error code, severity or operation identity
  -> no retryability or recovery command/result
  -> no internal/public record separation or redaction policy
  -> no bounded buffer, deduplication or retention policy
  -> no safe diagnostic-frame acknowledgement
```

## Domains in use

```txt
repository and audit identity
browser entry startup and host lifecycle
external provider loading and fallback composition
DSK registry descriptor validation and snapshots
meadow area configuration and render-plan generation
authored scene, target, objective and story content
initial gameplay state and progression references
render-plan enhancement and WebGL presentation
public GameHost inspection surface
browser global error and rejection observation
editor capability invocation and error projection
visible HUD loading, debug and fatal projection
internal diagnostics and validation state
failure classification, retention, redaction and recovery
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

`src/boot/boot-game.js` catches startup rejection and writes `error.stack`, `error.message` or `String(error)` directly into the visible `#status` element.

`src/hosts/web-host.js` repeats the same raw projection from `showFatal()` for render-plan, renderer or frame exceptions. The host records only a local `stopped` boolean and exposes `start()` again, without a fault generation, typed terminal result, retry classification or recovery receipt.

`src/editor/install-editor-bridge.js` installs global `error` and `unhandledrejection` listeners. It stores raw message, filename, line and column values in an array with no capacity or retention limit. Capability exceptions append raw action/message entries. The complete array is returned by `browser.getErrors` and `snapshot().errors`.

```txt
raw boot stack/message projection: present
raw runtime fatal stack/message projection: present
raw filename and source location capture: present
raw capability action/message projection: present
globally accessible error snapshot: present
unbounded error array: present

stable public failure code: absent
failure source/operation taxonomy: absent
severity and health state: absent
retryability policy: absent
error and correlation IDs: absent
internal/public record split: absent
redaction policy: absent
buffer capacity and eviction policy: absent
duplicate collapse: absent
recovery command/result: absent
FirstSafeFailureFrameAck: absent
```

This is a source-derived diagnostic safety, lifecycle and proof gap. No secret disclosure, memory exhaustion or failed recovery incident was reproduced.

## Required authority

`meadow-browser-failure-classification-bounded-diagnostic-projection-authority-domain`

```txt
BrowserFailureAdmissionCommand
  -> bind repository, release, route, runtime, renderer, editor and capability revisions
  -> bind failure source, operation and original cause
  -> classify stable code, severity, retryability and terminality
  -> allocate ErrorId and CorrelationId
  -> store one bounded internal diagnostic record
  -> redact and normalize one public failure envelope
  -> deduplicate repeated equivalent failures
  -> publish BrowserFailureAdmissionResult
  -> settle host health as healthy, degraded or failed

FailureProjectionCommand
  -> bind the accepted failure result and active presentation generation
  -> project safe HUD and editor diagnostics
  -> reject raw cause, stack, path or retired-generation leakage
  -> publish FirstSafeFailureFrameAck

FailureRecoveryCommand
  -> bind an accepted retryable failure and expected generations
  -> clear or replace affected resources atomically
  -> preserve terminal records and correlation history
  -> publish FailureRecoveryResult
```

## Planned authority surfaces

```txt
1. meadow-browser-failure-classification-bounded-diagnostic-projection-authority-domain
2. failure-source-registry-kit
3. failure-operation-classification-kit
4. failure-code-taxonomy-kit
5. failure-severity-policy-kit
6. failure-retryability-policy-kit
7. failure-correlation-id-kit
8. public-failure-envelope-kit
9. internal-diagnostic-record-kit
10. diagnostic-redaction-kit
11. bounded-error-buffer-kit
12. failure-deduplication-kit
13. host-health-state-kit
14. boot-failure-projection-kit
15. runtime-fatal-projection-kit
16. editor-capability-failure-projection-kit
17. browser-global-failure-projection-kit
18. failure-recovery-command-kit
19. browser-failure-fixture-kit
20. first-safe-failure-frame-ack-kit
```

## Complete kit and offered service inventory

| Kit | Status | Offered services |
|---|---|---|
| `meadow-area-kit` | external loaded | meadow configuration, render-plan generation, snapshot, validation |
| `into-the-meadow-game-dsk` | active-v0.1 | game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot |
| `web-host-dsk` | active-v0.1 | document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety |
| `game-composition-dsk` | active-v0.1 | dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation |
| `meadow-area-bridge-dsk` | active-v0.1 | meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation |
| `meadow-terrain-texture-dsk` | planned | terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation |
| `path-corridor-dsk` | planned | path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation |
| `grass-density-texture-kit` | active-v0.1 | density-texture-model, density-channels, density-compositor, density-sampler, density-validation |
| `grass-clump-archetype-kit` | active-v0.1 | clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation |
| `grass-static-batch-kit` | active-v0.1 | clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation |
| `grass-patch-placement-kit` | active-v0.1 | patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation |
| `grass-clump-instancing-render-kit` | active-v0.1 | batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation |
| `grass-shader-wind-kit` | planned | wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation |
| `grass-lod-policy-kit` | planned | near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation |
| `grass-density-scaling-kit` | planned | quality-scale, budget-scale, density-scale, profile-scale, scale-validation |
| `grass-debug-visualization-kit` | planned | density-view, patch-view, instance-view, lod-view, debug-validation |
| `grass-patch-dsk` | planned | patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation |
| `gpu-grass-render-dsk` | planned | grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation |
| `wind-field-dsk` | planned | wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation |
| `tree-object-dsk` | planned | focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation |
| `meadow-scatter-dsk` | planned | flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation |
| `meadow-atmosphere-dsk` | planned | sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation |
| `meadow-player-dsk` | planned | player-state, movement-profile, terrain-contact, player-actions, player-validation |
| `meadow-camera-dsk` | planned | camera-mode, camera-rig, camera-collision, camera-feel, camera-validation |
| `meadow-input-dsk` | planned | action-map, device-bindings, input-context, input-normalization, input-validation |
| `meadow-interaction-dsk` | planned | interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation |
| `meadow-story-dsk` | planned | story-state, story-beats, dialogue-text, sequence-runner, story-validation |
| `meadow-objective-dsk` | planned | objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation |
| `meadow-ecology-dsk` | planned | ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation |
| `meadow-audio-dsk` | planned | ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation |
| `meadow-ui-dsk` | planned | minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation |
| `meadow-save-dsk` | planned | save-model, save-slots, persistence-adapter, migration, save-validation |
| `meadow-diagnostics-dsk` | active-v0.1 | runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report |
| `meadow-performance-dsk` | active-v0.1 | quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation |
| `meadow-render-host-dsk` | active-v0.1 | renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation |
| `meadow-webgl-renderer-v2-kit` | active-v0.1 | model, state, events, validation, snapshot |
| `post-process-stack-dsk` | active-v0.1 | pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation |
| `render-target-kit` | planned | scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy |
| `sobel-outline-pass-kit` | planned | color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask |
| `color-grade-pass-kit` | planned | warmth, contrast, saturation, shadow-tint, highlight-tint |
| `depth-fog-pass-kit` | planned | fog-near, fog-far, fog-color, distance-curve, horizon-haze |
| `vignette-pass-kit` | planned | radius, softness, strength, center, quality-tier |
| `final-composite-pass-kit` | planned | scene-input, post-input, output-target, debug-overlay, fallback-composite |
| `static-pages-deploy-dsk` | active-v0.1 | build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation |

## Census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned browser-failure authority surfaces: 20
```

## Repo-local output

```txt
.agent/trackers/2026-07-16T15-38-27-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T15-38-27-04-00.md
.agent/architecture-audit/2026-07-16T15-38-27-04-00-browser-failure-diagnostics-dsk-map.md
.agent/render-audit/2026-07-16T15-38-27-04-00-raw-fatal-visible-diagnostic-gap.md
.agent/gameplay-audit/2026-07-16T15-38-27-04-00-failure-stop-restart-loop.md
.agent/interaction-audit/2026-07-16T15-38-27-04-00-failure-command-result-map.md
.agent/diagnostics-audit/2026-07-16T15-38-27-04-00-error-taxonomy-redaction-retention-contract.md
.agent/deploy-audit/2026-07-16T15-38-27-04-00-failure-projection-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T15-38-27-04-00-oldest-selection-failure-diagnostics-reconciliation.md
```

## Validation boundary

Documentation only. Runtime JavaScript, authored content, manifest, rendering, editor behavior, packages, tests, workflows and deployment were not changed. Browser failure injection, redaction, buffer, recovery, artifact and Pages fixtures were not executed.