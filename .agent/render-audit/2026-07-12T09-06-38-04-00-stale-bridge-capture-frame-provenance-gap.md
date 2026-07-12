# Render Audit: Stale Bridge Capture and Frame Provenance Gap

**Generated:** `2026-07-12T09-06-38-04-00`

## Finding

`renderer.capture` reads the current canvas dimensions, calls `canvas.toDataURL()` and attaches the latest renderer snapshot. The result carries no bridge generation, runtime session, frame ID, render revision, surface revision or capture command ID.

A predecessor bridge retained by a caller can remain invokable after a successor bridge overwrites `globalThis.NexusEditorEnvironment`. Because the predecessor still closes over the same canvas and old `gameHost`, a capture can combine current canvas pixels with predecessor readback state.

## Current path

```txt
bridge capability invoke
  -> renderer.capture
  -> read canvas width/height
  -> canvas.toDataURL
  -> read gameHost.getRenderSnapshot
  -> return unversioned capture object
```

## Missing evidence

```txt
capture command ID
bridge ID and generation
runtime session ID
host generation
frame ID
render revision
surface revision
canvas pixel generation
readback/pixel parity result
stale bridge rejection
```

## Required proof

A capture result must be admitted against the current bridge and runtime generations, cite one committed visible frame and surface revision, and reject a predecessor bridge or mixed pixel/readback observation.
