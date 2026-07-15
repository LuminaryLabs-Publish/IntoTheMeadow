# Render Audit: Post-Process Descriptor Execution Gap

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The visible frame is not evidence that the declared post-process graph executed. The active renderer draws directly to the default framebuffer and reports an inline mode without a pass-by-pass result.

## Plan ledger

**Goal:** separate declared visual intent from the exact GPU work that produced the frame.

- [x] Inspect declared post-process passes and settings.
- [x] Inspect renderer targets, shaders, draws, and snapshot.
- [x] Identify executed, substituted, and absent work.
- [ ] Capture browser frames and pass receipts later.

## Declared graph

```txt
0  render-target
10 depth-fog
20 color-grade
30 edge-outline when enabled
40 vignette
50 final-composite
```

## Executed renderer path

```txt
resize canvas
  -> bind one program
  -> build/reuse one mesh
  -> clear default framebuffer
  -> draw front-face-expanded geometry outline
  -> draw cel-shaded mesh with inline depth-derived fog
  -> publish renderer snapshot
```

## Unproved or absent adoption

```txt
offscreen scene-color target
explicit depth or normal target
ping-pong targets
depth-fog pass receipt
color-grade pass receipt
Sobel outline pass receipt
vignette pass receipt
final-composite pass receipt
accepted fallback profile
output-texture identity
visible-frame acknowledgement tied to pass graph
```

The renderer may intentionally use a lightweight inline profile. The gap is that this is not negotiated, versioned, validated, or correlated with the descriptor graph.

## Required evidence

```txt
PostProcessFrameResult
  declaredGraphFingerprint
  admittedProfileId
  rendererCapabilityFingerprint
  resourceGeneration
  passReceipts[]
  substitutions[]
  skippedPasses[]
  outputTargetId
  submittedFrameId
  visibleFrameId
```

## Boundary

No visual behavior changed and no browser capture was performed.