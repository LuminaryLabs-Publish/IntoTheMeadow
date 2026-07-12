# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Last aligned:** `2026-07-11T22-08-13-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, a persistent WebGL renderer, browser editor capabilities and a Node headless-editor surface.

This pass isolates the render-surface resolution boundary. Each render samples live CSS dimensions and DPR, mutates the canvas drawing buffer, configures the GL viewport and derives camera aspect. No pixel budget, WebGL capability result, resize generation, surface revision, fallback tier or capture/frame correlation proves which resolution was actually committed.

## Plan ledger

**Goal:** preserve the full-screen meadow while making viewport and drawing-buffer changes bounded, revisioned, recoverable and visible through renderer, capture and frame evidence.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Skip active unsynchronized `AetherVale` lifecycle-audit work.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repository.
- [x] Trace CSS viewport, DPR, canvas resize, GL viewport, projection, renderer snapshot and capture.
- [x] Preserve the complete interaction loop, domain map, kit inventory and service map.
- [x] Define surface identity, revision, policy, budgets, fallback, results, journals and fixture gates.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable render-surface fixtures remain future work.

## Current interaction loop

```txt
browser viewport / zoom
  -> CSS canvas dimensions and DPR change
  -> next RAF advances state and builds a render plan
  -> renderer.resize samples live values
  -> canvas drawing-buffer dimensions mutate
  -> GL viewport and camera projection use requested dimensions
  -> outline and color passes draw
  -> renderer snapshot publishes without dimensions or surface revision

browser editor
  -> getViewport reads live browser and canvas values
  -> capture reads canvas data URL and dimensions
  -> latest renderer snapshot is attached independently
  -> no surface/frame identity proves parity
```

## Main finding

```txt
DPR policy: hard-coded clamp from 1 to 2
pixel budget: absent
WebGL surface-limit query: absent
actual drawing-buffer readback: absent
resize command and generation: absent
surface revision: absent
fallback and rollback result: absent
renderer snapshot dimensions: absent
capture/frame surface receipt: absent
```

At 3840 by 2160 CSS pixels and DPR 2, the renderer requests 7680 by 4320, or 33,177,600 drawing-buffer pixels, without a product budget or capability classification.

## Required parent domain

```txt
meadow-render-surface-resolution-authority-domain
```

Core composition:

```txt
render-surface-id-kit
render-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
webgl-surface-capability-kit
resize-command-kit
resize-coalescing-kit
render-surface-plan-kit
drawing-buffer-allocation-kit
render-surface-fallback-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-surface-observation-rejection-kit
render-surface-observation-kit
capture-surface-correlation-kit
visible-frame-surface-ack-kit
render-surface-journal-kit
render-surface-fixture-kit
browser-resize-dpr-smoke-kit
```

## Ordered implementation gates

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T22-08-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T22-08-13-04-00.md
.agent/architecture-audit/2026-07-11T22-08-13-04-00-render-surface-resolution-dsk-map.md
.agent/render-audit/2026-07-11T22-08-13-04-00-dpr-drawing-buffer-budget-gap.md
.agent/gameplay-audit/2026-07-11T22-08-13-04-00-resize-projection-capture-loop.md
.agent/interaction-audit/2026-07-11T22-08-13-04-00-viewport-resize-surface-result-map.md
.agent/render-surface-audit/2026-07-11T22-08-13-04-00-resolution-budget-revision-contract.md
.agent/deploy-audit/2026-07-11T22-08-13-04-00-render-surface-fixture-gate.md
```

A canvas filling the window is not proof of a bounded committed render surface. Success requires actual drawing-buffer dimensions and one surface revision to propagate through projection, renderer snapshot, capture and the first visible frame.
