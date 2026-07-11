# Editor Tick and Capture Commit Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Current editor capabilities

```txt
runtime.status
runtime.getState
runtime.getSnapshot
runtime.tick
runtime.reset
scene.getRenderPlan
scene.getStatistics
renderer.getSnapshot
renderer.getEnhancerSnapshot
renderer.capture
browser.getViewport
browser.getErrors
```

## Authority gaps

```txt
runtime.tick mutates without rendering
runtime.reset mutates without rendering
scene.getRenderPlan may read/enhance outside the RAF commit path
renderer.getSnapshot returns the last renderer result only
renderer.capture reads current canvas bytes and attaches a separate renderer snapshot
snapshot() combines runtime and renderer without a common frame id
```

## Required editor contract

Add:

```txt
runtime.requestFrame
runtime.getCommittedFrame
runtime.getFrameJournal
runtime.getFailedFrameAttempts
renderer.captureCommittedFrame
```

Each command result should include:

```txt
requestSequence
status
reason
previousFrameId
committedFrameId
stateFingerprint
planFingerprint
renderFingerprint
```

## Capture rule

A capture is valid proof only when:

```txt
canvas dimensions match the committed row
renderer snapshot frameId matches the committed row
capture metadata repeats that frameId
no later frame began before readback completed, or capture uses an explicit serialization boundary
```

## Error observation

Capability errors and browser errors should reference the frame request sequence and phase when available.
