# IntoTheMeadow Project Breakdown

**Generated:** `2026-07-12T09-06-38-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`

## Summary

This documentation pass isolates browser editor-bridge lifecycle and error-journal authority. The bridge registers global `error` and `unhandledrejection` listeners, stores every entry in an unbounded array, clones the complete array into queries and snapshots, and overwrites `globalThis.NexusEditorEnvironment` without retiring a predecessor bridge. `startWebHost().stop()` suspends only the RAF path and does not dispose the bridge or its listeners.

## Plan ledger

**Goal:** make one session-scoped authority own editor-bridge installation, global publication, capability leases, browser error normalization, bounded retention, query/acknowledgement, restart, replacement and deterministic disposal.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Detect newer unsynchronized `PrehistoricRush` repo-local documentation and avoid concurrent modification.
- [x] Select only `IntoTheMeadow` as the next-oldest stable eligible repository.
- [x] Trace page boot, `GameHost` publication, bridge installation, capabilities, error listeners, error retention, snapshots, host stop/start and browser-global replacement.
- [x] Identify the complete interaction loop, all domains, all 44 declared kits and every offered service.
- [x] Add architecture, render, gameplay, interaction, editor-bridge and deployment audits.
- [x] Refresh all required root `.agent` documents and the machine-readable kit registry.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Runtime bridge lifecycle, bounded-journal implementation and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PrehistoricRush    central 2026-07-12T07-09-49-04-00; repo-local 2026-07-12T09-01-44-04-00; skipped as active/unsynchronized
IntoTheMeadow      2026-07-12T07-19-47-04-00; selected next-oldest stable
PhantomCommand     2026-07-12T07-29-32-04-00
HorrorCorridor     2026-07-12T07-41-06-04-00
ZombieOrchard      2026-07-12T07-51-04-04-00
MyCozyIsland       2026-07-12T08-00-16-04-00
TheUnmappedHouse   2026-07-12T08-10-36-04-00
AetherVale         2026-07-12T08-31-49-04-00
TheOpenAbove       2026-07-12T08-50-32-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization by this pass.

## Complete interaction loop

```txt
page boot
  -> import commit-pinned meadow provider
  -> install DSK descriptors
  -> create immutable game
  -> create render-plan enhancer
  -> create persistent WebGL renderer
  -> expose global GameHost
  -> install global NexusEditorEnvironment
  -> attach error and unhandledrejection listeners
  -> schedule RAF

frame
  -> sample RAF absolute time
  -> game.tick({ time, dt: 1/60 })
  -> produce source render plan
  -> enhance and validate plan
  -> resize/reuse/rebuild WebGL resources
  -> submit outline and color draws
  -> publish debug text
  -> schedule successor RAF

editor capability
  -> invoke capability ID with cloned arguments
  -> execute against GameHost/canvas/browser
  -> return completed, unavailable or failed result
  -> failed capability pushes one entry into the bridge-local error array

browser fault
  -> global error or unhandledrejection listener
  -> normalize a partial entry
  -> append to unbounded bridge-local array
  -> browser.getErrors or bridge.snapshot clones the complete array

host stop/start
  -> stop toggles one boolean
  -> bridge, listeners, errors and global publication remain live
  -> start schedules another RAF

re-bootstrap
  -> create another GameHost and bridge
  -> overwrite global pointers
  -> predecessor bridge is not automatically disposed
  -> predecessor listeners and retained errors can remain reachable
```

## Source-backed findings

```txt
bridge identity: fixed string only
bridge generation/revision: absent
runtime-session binding: absent
predecessor bridge admission/retirement: absent
listener leases: absent
error sequence/timestamp/frame correlation: absent
error journal retention bound: absent
error acknowledgement/clear cursor: absent
query pagination/limit: absent
capability lease/revocation: absent
stale bridge rejection: absent
host stop -> bridge disposal: absent
host replacement -> predecessor disposal: absent
browser bridge restart/error-flood fixture: absent
```

## Domains in use

```txt
browser shell, loading and visible fatal projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path, grass, trees, wind, atmosphere and scatter
player, input, interaction, story, objective, ecology, audio, UI and persistence declarations
render-plan enhancement, topology caching and CPU mesh construction
WebGL context, shader, buffer, resize, draw and disposal ownership
post-process declarations and physical rendering
GameHost publication and raw game reachability
browser editor capability registration, invocation and capture
browser error and unhandled rejection observation
headless editor environment, terminal, scenarios and artifact output
validation, build and Pages deployment
editor-bridge generation, listener leases, bounded error journal and replacement authority: missing
```

## Complete kit inventory and services

```txt
external
  meadow-area-kit
    area normalization; path normalization; style/material normalization; deterministic seeded scatter; grass/flower/rock/mushroom/tree descriptors; wind/atmosphere descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter

local declarations
  into-the-meadow-game-dsk
    game-manifest; kit-stack-registry; game-state-root; boot-sequence; game-snapshot
  web-host-dsk
    document-shell; browser-loop; host-debug-surface; asset-loading-host; browser-safety
  game-composition-dsk
    dsk-registry; scene-composition; render-composition; simulation-composition; composition-validation
  meadow-area-bridge-dsk
    meadow-area-config; meadow-feature-config; meadow-area-kit-adapter; meadow-area-state; meadow-area-validation
  meadow-terrain-texture-dsk
    terrain-surface-model; material-layer-system; path-layer-system; terrain-sampler; terrain-validation
  path-corridor-dsk
    path-curve-model; walkable-corridor; path-surface-detail; path-progression; path-validation
  grass-density-texture-kit
    density-texture-model; density-channels; density-compositor; density-sampler; density-validation
  grass-clump-archetype-kit
    clump-family-registry; card-layout-generator; texture-atlas-binding; clump-variant-generator; archetype-validation
  grass-static-batch-kit
    clump-mesh-builder; batch-variant-cache; atlas-material; static-batch-lod; batch-validation
  grass-patch-placement-kit
    patch-grid; density-driven-placement; clump-instance-selection; patch-instance-buffer; placement-validation
  grass-clump-instancing-render-kit
    batch-registry; instance-stream; draw-group-builder; shader-binding; render-validation
  grass-shader-wind-kit
    wind-uniforms; tip-bend-model; phase-field; gust-response; wind-validation
  grass-lod-policy-kit
    near-lod; mid-lod; far-lod; terrain-tint-lod; lod-validation
  grass-density-scaling-kit
    quality-scale; budget-scale; density-scale; profile-scale; scale-validation
  grass-debug-visualization-kit
    density-view; patch-view; instance-view; lod-view; debug-validation
  grass-patch-dsk
    patch-grid; blade-distribution; terrain-awareness; wind-binding; grass-validation
  gpu-grass-render-dsk
    grass-instance-buffer; grass-blade-mesh; shader-wind; grass-lod-render; grass-render-validation
  wind-field-dsk
    wind-state; wind-sampler; wind-zones; wind-consumers; wind-validation
  tree-object-dsk
    focal-tree-model; tree-line-model; tree-materials; tree-wind-binding; tree-validation
  meadow-scatter-dsk
    flower-scatter; rock-scatter; mushroom-scatter; placement-rules; scatter-validation
  meadow-atmosphere-dsk
    sky-gradient; sun-system; cloud-layer; distant-hills; atmosphere-validation
  meadow-player-dsk
    player-state; movement-profile; terrain-contact; player-actions; player-validation
  meadow-camera-dsk
    camera-mode; camera-rig; camera-collision; camera-feel; camera-validation
  meadow-input-dsk
    action-map; device-bindings; input-context; input-normalization; input-validation
  meadow-interaction-dsk
    interactable-registry; affordance-rules; inspect-state; interaction-events; interaction-validation
  meadow-story-dsk
    story-state; story-beats; dialogue-text; sequence-runner; story-validation
  meadow-objective-dsk
    objective-model; objective-flow; completion-ledger; feedback-surface; objective-validation
  meadow-ecology-dsk
    ambient-life; ecology-zones; ambience-triggers; non-gameplay-agents; ecology-validation
  meadow-audio-dsk
    ambient-bed; spatial-audio-cues; audio-state; audio-events; audio-validation
  meadow-ui-dsk
    minimal-hud; story-text-panel; debug-ui; ui-state; ui-validation
  meadow-save-dsk
    save-model; save-slots; persistence-adapter; migration; save-validation
  meadow-diagnostics-dsk
    runtime-health; render-health; determinism-checks; smoke-tests; diagnostics-report
  meadow-performance-dsk
    quality-profile; budget-policy; lod-policy; adaptive-scaling; performance-validation
  meadow-render-host-dsk
    renderer-selection; render-plan-ingest; pass-order; renderer-state; renderer-validation
  meadow-webgl-renderer-v2-kit
    WebGL context acquisition; shader programs; attribute/uniform binding; CPU mesh ingestion; GPU buffers; draw submission; resize; snapshot; disposal
  post-process-stack-dsk
    pass-registry; render-target-system; sobel-outline-pass; color-grade-pass; post-validation
  render-target-kit
    scene-color-texture; depth-texture; normal-texture; ping-pong-buffer; resize-policy
  sobel-outline-pass-kit
    color-edge-threshold; depth-edge-threshold; normal-edge-threshold; outline-color; object-mask
  color-grade-pass-kit
    warmth; contrast; saturation; shadow-tint; highlight-tint
  depth-fog-pass-kit
    fog-near; fog-far; fog-color; distance-curve; horizon-haze
  vignette-pass-kit
    radius; softness; strength; center; quality-tier
  final-composite-pass-kit
    scene-input; post-input; output-target; debug-overlay; fallback-composite
  static-pages-deploy-dsk
    build-config; github-pages-workflow; release-artifacts; cache-invalidation; deploy-validation
```

## Runtime implementation surfaces

```txt
src/hosts/web-host.js
  external provider load; game/renderer/enhancer/bridge creation; RAF; fatal projection; host stop/start
src/boot/expose-game-host.js
  global GameHost publication and raw game exposure
src/editor/install-editor-bridge.js
  capability registry; global publication; error listeners; error array; invoke/snapshot/dispose
scripts/into-the-meadow-environment.mjs
  Node headless environment and artifact-backed capabilities
tests/headless-editor-*.mjs
  Node environment/command/loop proof, not browser bridge lifecycle proof
```

## Required parent domain

```txt
meadow-editor-bridge-lifecycle-and-error-journal-authority-domain
```

## Candidate coordinating kits

```txt
editor-bridge-id-kit
editor-bridge-generation-kit
editor-bridge-install-command-kit
editor-bridge-install-admission-kit
editor-bridge-predecessor-retirement-kit
editor-bridge-publication-kit
editor-capability-lease-kit
browser-listener-lease-kit
browser-error-entry-kit
browser-error-sequence-kit
browser-error-normalization-kit
browser-error-retention-policy-kit
browser-error-journal-kit
browser-error-query-kit
browser-error-ack-kit
editor-bridge-stop-policy-kit
editor-bridge-dispose-plan-kit
editor-bridge-dispose-result-kit
stale-editor-bridge-rejection-kit
editor-bridge-observation-kit
editor-bridge-lifecycle-journal-kit
editor-bridge-restart-fixture-kit
browser-error-flood-fixture-kit
browser-listener-retirement-fixture-kit
browser-editor-bridge-smoke-kit
```

## Required transaction

```txt
EditorBridgeInstallCommand
  -> admit runtime session, host generation and predecessor bridge generation
  -> allocate candidate bridge ID/generation
  -> register capability leases
  -> register listener leases
  -> atomically publish candidate global surface
  -> retire predecessor leases and journal
  -> return typed install result

browser/capability fault
  -> normalize source, message, stack, action, time, frame and bridge generation
  -> assign monotonic error sequence
  -> apply bounded count/byte/age retention policy
  -> expose paged clone-safe query and acknowledgement cursor

host stop/dispose/replacement
  -> reject new invokes
  -> revoke capability leases
  -> remove listeners exactly once
  -> release retained error entries by policy
  -> remove global only when generation still matches
  -> publish typed disposal result
```

## Validation boundary

Documentation only. Runtime source, package scripts, dependencies, render output and deployment are unchanged. Existing Node headless-editor tests do not instantiate the browser bridge, repeatedly install it, inject global browser errors, verify retention bounds or prove listener retirement.
