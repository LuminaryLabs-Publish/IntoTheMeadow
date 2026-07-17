# Project Breakdown: WebGL Capture Readback and Frame Correlation

**Timestamp:** `2026-07-17T03-44-31-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit head:** `ba702cc59dd0a8a4acfae3246ac16b45261d0c4d`  
**Status:** `webgl-capture-readback-frame-correlation-authority-audited`

## Summary

IntoTheMeadow exposes three visually similar but technically different evidence paths: a live WebGL canvas `toDataURL` capture, a Node-generated SVG observation, and a Chromium command-line screenshot. None carries one accepted browser-session, render-frame, viewport, plan, pixel-buffer and artifact identity. The live WebGL context uses the default non-preserved drawing buffer, the capture capability performs no explicit render/readback settlement, and the Chromium screenshot and DOM checks run in separate browser processes before being combined into one report.

## Intent

Make one capture generation authoritative across the accepted render plan, completed WebGL frame, drawable pixel buffer, viewport/DPR, browser session, encoded artifact, renderer snapshot and visible proof.

## Checklist

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible repositories retain central ledger and root `.agent` coverage.
- [x] Confirm every eligible `main` head matches its central repo-local documentation head.
- [x] Select only IntoTheMeadow by the oldest synchronized central timestamp.
- [x] Inspect live host, WebGL renderer, browser editor bridge, Node environment, Chromium observation script and tests.
- [x] Identify the complete interaction loop, active domains, all 44 kit surfaces and offered services.
- [x] Define one capture-readback authority and 19 coordinating surfaces.
- [x] Add this timestamped root `.agent` audit family.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement capture settlement and browser/artifact/Pages fixtures later.

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
selected prior timestamp: 2026-07-16T21-01-07-04-00
next oldest: LuminaryLabs-Publish/HorrorCorridor at 2026-07-16T22-00-47-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> load pinned meadow provider
  -> compose game, enhancer, WebGL renderer, GameHost and editor bridge
  -> RAF ticks game, enhances plan and renders canvas

live editor capture
  -> invoke renderer.capture at an arbitrary event-loop point
  -> call canvas.toDataURL directly
  -> attach the latest renderer snapshot
  -> return no frame/session/readback receipt

Node headless capture
  -> rebuild plan and mesh independently
  -> generate JSON metrics and a synthetic SVG
  -> label output as visual observation
  -> never execute the live WebGL renderer

Chromium observation
  -> launch process A for screenshot
  -> launch process B for DOM dump
  -> combine screenshot size and DOM markers in one report
  -> retain no common browser-session or frame identity

missing settlement
  -> capture request admission
  -> exact render-frame completion
  -> safe drawable/readback ownership
  -> viewport and DPR binding
  -> pixel and metadata digest
  -> one correlated artifact result
  -> FirstCaptureBoundFrameAck
```

## Domains in use

```txt
repository and audit identity
browser startup, host lifecycle and RAF scheduling
external meadow provider loading
DSK registration and composition validation
meadow content and render-plan generation
performance profile and visual-budget derivation
grass placement, batching, instancing and LOD
wind, tree, scatter, terrain, atmosphere and camera descriptors
render-contract enhancement and dependency caching
WebGL context, viewport, buffers, shaders and draw submission
canvas pixel readback and image encoding
browser editor capability admission and invocation
Node synthetic observation generation
Chromium screenshot and DOM observation
capture generation, frame correlation, provenance and artifact digests
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

`src/renderers/meadow-webgl-renderer-v2.js` creates WebGL without requesting `preserveDrawingBuffer`, renders directly to the default framebuffer and publishes a renderer snapshot with no frame identity, viewport revision or pixel digest.

`src/editor/install-editor-bridge.js` implements `renderer.capture` as a synchronous `canvas.toDataURL(...)` plus the latest renderer snapshot. It does not request a fresh render, wait for a matching frame, bind a capture generation, verify drawable-buffer validity or correlate the encoded pixels with the attached snapshot.

`scripts/into-the-meadow-environment.mjs` implements `renderer.capture` by rebuilding the descriptor plan and mesh and generating a synthetic SVG. It is useful structural evidence, but it is not a live browser/WebGL capture and carries no shared identity with the browser capability.

`scripts/run-browser-observation.mjs` launches Chromium once for the screenshot and again for the DOM dump. The final report combines evidence from two independent browser sessions without a shared runtime, plan, frame or viewport generation.

`tests/headless-editor-environment-smoke.mjs` proves that the Node capability returns two artifacts. It does not exercise the browser bridge, WebGL readback, pixel correctness, screenshot/DOM correlation, artifact parity or Pages behavior.

```txt
live canvas capture capability: present
explicit capture request identity: absent
explicit matching render-frame identity: absent
preserved/readback-safe target: absent
readback fence or completion result: absent
viewport/DPR capture binding: absent
pixel digest: absent
renderer snapshot correlation: absent
Node synthetic/live classification result: absent
single-session screenshot/DOM evidence: absent
browser/artifact/Pages capture parity: absent
FirstCaptureBoundFrameAck: absent
```

This is a capture correctness and proof-boundary gap. No blank, stale or mismatched production capture was reproduced.

## Required authority

`meadow-webgl-capture-readback-frame-correlation-authority-domain`

```txt
CaptureAdmissionCommand
  -> bind runtime, browser session, renderer, plan, viewport, DPR and requested format revisions
  -> allocate CaptureId and CaptureGeneration
  -> reject stale, hidden, disposed or unavailable surfaces
  -> publish CaptureAdmissionResult

CaptureFrameCommitCommand
  -> render or select one exact accepted frame
  -> bind FrameId, plan topology key and renderer generation
  -> settle GPU submission and capture-safe pixel ownership
  -> publish CaptureFrameCommitResult

CaptureReadbackCommand
  -> read the exact accepted color target
  -> encode pixels with dimensions, color-space and format metadata
  -> calculate pixel and metadata digests
  -> correlate the renderer snapshot and browser session
  -> publish CaptureReadbackResult

CaptureArtifactCommitCommand
  -> classify live WebGL, synthetic SVG and browser screenshot evidence
  -> retain provenance and reject mixed-session evidence
  -> commit source, artifact and Pages receipts
  -> publish CaptureArtifactResult
  -> publish FirstCaptureBoundFrameAck
```

## Planned authority surfaces

```txt
1. meadow-webgl-capture-readback-frame-correlation-authority-domain
2. capture-request-admission-kit
3. browser-session-identity-kit
4. render-frame-identity-kit
5. viewport-dpr-capture-binding-kit
6. drawable-buffer-lifetime-kit
7. capture-safe-render-target-kit
8. webgl-readback-settlement-kit
9. pixel-readback-kit
10. bitmap-encoding-kit
11. capture-metadata-envelope-kit
12. renderer-snapshot-correlation-kit
13. stale-capture-rejection-kit
14. synthetic-live-capture-classification-kit
15. screenshot-dom-session-correlation-kit
16. capture-artifact-digest-kit
17. capture-artifact-commit-kit
18. browser-capture-fixture-kit
19. first-capture-bound-frame-ack-kit
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
planned capture-correlation surfaces: 19
```

## Validation boundary

Documentation and source inspection only. Runtime JavaScript, renderer behavior, browser capture behavior, tests, workflows and deployment were not changed. No blank or stale capture was reproduced, and no capture correctness, WebGL readback settlement, source/artifact/Pages parity or production readiness is claimed.
