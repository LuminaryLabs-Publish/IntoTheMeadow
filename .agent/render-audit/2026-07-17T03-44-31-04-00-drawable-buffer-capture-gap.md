# Render Audit: Drawable Buffer Capture Gap

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Finding

The live renderer draws to the default WebGL framebuffer. Context creation does not request `preserveDrawingBuffer`, and the editor capture capability later calls `canvas.toDataURL` without forcing or acknowledging a matching render.

```txt
accepted render plan
  -> WebGL default framebuffer draw
  -> renderer snapshot updated
  -> browser may composite/retire drawable contents
  -> arbitrary later toDataURL
  -> uncorrelated renderer snapshot attached
```

## Missing render contract

```txt
CaptureId
FrameId
renderer generation
plan ID and topology key
viewport revision
DPR
capture-safe color target
GPU/readback completion
pixel dimensions and digest
encoded artifact digest
FirstCaptureBoundFrameAck
```

## Risk

A capture can be blank, stale or associated with a renderer snapshot from a different visible frame. No such failure was reproduced; the code does not provide executable proof that it cannot happen.

## Required projection

Render one accepted capture frame into a capture-safe target or retain the exact default-buffer generation until readback settles. Publish the frame and pixel receipt before encoding or exposing the artifact.

## Boundary

Documentation only. No framebuffer, context attribute, render target, synchronization or encoding behavior changed.
