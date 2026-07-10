# Render Audit: Render Consumption Proof Row Gap

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Render surface

`IntoTheMeadow` has a visual/render surface.

```txt
canvas#scene
  -> meadow-webgl-renderer-v2-compatible
  -> meadow-webgl-renderer-v2
  -> enhanced render plan
  -> aggregate renderer snapshot
  -> GameHost.getRenderSnapshot()
  -> editor bridge renderer.getSnapshot / renderer.capture
```

## What works

```txt
renderer v2 exists locally
renderer render returns aggregate stats
render enhancer emits grass, wind, postprocess, performance, and stats descriptors
GameHost exposes getRenderPlan, getRenderSnapshot, and getRenderEnhancerSnapshot
headless editor bridge can invoke renderer.getSnapshot and renderer.capture
package check already has renderer and headless editor smoke coverage
```

## Gap

Renderer readback is aggregate, not row-level proof.

Missing rows:

```txt
source descriptor id
source descriptor type
expected consumer
consumed / ignored / unsupported / fallback status
fallback class
renderer snapshot field used as evidence
postProcess mode evidence
primitive fallback attribution
cache/topology evidence
GameHost projection id
editor observation id
```

## Do not solve first

```txt
visual fidelity
renderer replacement
external CDN migration
new meadow content
shader tuning
camera/control rewiring
```

## Next proof target

Add render expectation rows, normalize the existing renderer snapshot, and expose an additive `GameHost` proof projection that keeps the legacy `GameHost` shape intact.
