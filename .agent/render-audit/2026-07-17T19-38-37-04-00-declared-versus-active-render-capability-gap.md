# Render Audit: Declared Versus Active Capability

**Timestamp:** `2026-07-17T19-38-37-04-00`

## Summary

The repository has a real WebGL presentation surface, but the DSK snapshot does not prove which declared rendering capabilities produced the visible frame.

## Source-backed state

```txt
active-v0.1 render descriptors:
  meadow-render-host-dsk
  meadow-webgl-renderer-v2-kit
  post-process-stack-dsk
  grass-clump-instancing-render-kit

planned render descriptors still present in the local snapshot:
  gpu-grass-render-dsk
  render-target-kit
  sobel-outline-pass-kit
  color-grade-pass-kit
  depth-fog-pass-kit
  vignette-pass-kit
  final-composite-pass-kit
```

Every descriptor has `requires: []`. The installation snapshot therefore cannot prove that a visible render feature was dependency-complete, implementation-bound or active for the accepted frame.

## Required proof

```txt
RuntimeCapabilityManifest
  -> admitted renderer, grass and post-process capability IDs
  -> provider and implementation revisions
  -> activation generation
  -> excluded planned declarations

VisibleRenderCapabilityDigest
  -> accepted activation generation
  -> render-plan revision
  -> renderer frame revision
  -> active pass IDs

FirstActivationBoundFrameAck
```

## Boundary

No visual defect or render regression was reproduced. No renderer, shader, pass, mesh, frame scheduling or output behavior changed.