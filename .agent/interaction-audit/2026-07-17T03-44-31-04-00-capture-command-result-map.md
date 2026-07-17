# Interaction Audit: Capture Command and Result Map

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Current command

```txt
renderer.capture({ format, quality })
  -> canvas.toDataURL(format, quality)
  -> { format, width, height, dataUrl, renderer }
```

The response has no capture ID, frame ID, browser session, viewport revision, plan key, readback status or digest.

## Required command map

```txt
CaptureAdmissionCommand
  CaptureAdmissionResult

CaptureFrameCommitCommand
  CaptureFrameCommitResult

CaptureReadbackCommand
  CaptureReadbackResult

CaptureArtifactCommitCommand
  CaptureArtifactResult
  FirstCaptureBoundFrameAck
```

## Required rejection states

```txt
runtime-retired
renderer-disposed
surface-hidden
surface-zero-area
context-lost
stale-plan
stale-frame
readback-unavailable
encode-failed
mixed-browser-session
synthetic-evidence-not-live
artifact-commit-failed
```

## Exactly-once rule

A `CaptureId` may settle once. Retries must return the retained terminal result or allocate a new generation; they must not silently bind new pixels to old metadata.

## Boundary

Proposed interaction contract only. No command implementation changed.
