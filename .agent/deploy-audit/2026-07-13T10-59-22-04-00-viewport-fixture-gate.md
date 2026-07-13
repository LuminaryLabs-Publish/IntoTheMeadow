# Deploy Audit: Viewport Fixture Gate

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

The current Node checks validate source and renderer contracts but do not prove browser host measurement, DPR transitions, pixel-budget behavior, viewport rollback, readback parity or capture correlation. Production build and Pages output need the same executable viewport matrix as source.

## Plan ledger

**Goal:** define the minimum source, build and deployed-origin evidence required before viewport behavior can be called reliable.

- [x] Record declared package checks.
- [x] Separate static proof from browser proof.
- [x] Define viewport fixture cases.
- [x] Define required artifacts and assertions.
- [ ] Execute after runtime implementation.

## Existing declared checks

```txt
static-smoke
dsk-registry-smoke
render-plan-smoke
renderer-v2-smoke
deterministic-scene-smoke
headless-editor-environment-smoke
headless-editor-command-smoke
headless-editor-loop-smoke
```

These do not establish real layout, DPR, GPU allocation, browser canvas clearing, visual-frame acknowledgement or deployed-origin parity.

## Required source-browser fixtures

```txt
initial positive host measurement
CSS resize wider, taller and aspect-changing
fractional DPR
DPR increase and decrease
browser zoom transition
zero-size host
zero-size restore
hidden and detached canvas
rapid resize coalescing
stale and duplicate measurement rejection
pixel-budget downscale
GPU dimension-limit rejection
backing mutation followed by injected render failure
rollback or explicit surface-loss classification
viewport readback parity
capture before first frame ack
capture after first frame ack
host pause and resume
host fatal and retirement
```

## Required assertions

```txt
one viewport revision per accepted transition
zero mutation for rejected, duplicate and stale candidates
zero-size never falls back to full-window allocation
all participants use identical backing dimensions and aspect
pixel count never exceeds admitted budget
failed commit publishes terminal status
predecessor is restored or surface loss is explicit
renderer snapshot contains viewport revision
GameHost and editor readback match committed viewport
capture references the matching visible frame
no duplicate RAF or observer ownership is introduced
```

## Artifact requirements

```txt
fixture input manifest
browser and viewport metadata
sampled and effective DPR
GPU limits
pixel budget
ViewportCommitResult JSON
renderer snapshot JSON
GameHost/editor viewport readback JSON
before/after screenshots
capture result JSON
console and page errors
build commit SHA
built-output file hash
Pages URL and deployed commit SHA
```

## Gate order

```txt
npm run check
  -> source browser viewport fixture
  -> production build
  -> built-output viewport fixture
  -> GitHub Pages deployment
  -> deployed-origin viewport fixture
  -> artifact review
  -> only then readiness claim
```

## Failure policy

Any mismatch between CSS box, effective DPR, backing dimensions, WebGL viewport, camera aspect, renderer snapshot, readback, capture or visible frame blocks viewport readiness.

## Validation boundary

No package command, browser fixture, build, workflow, Pages deployment, screenshot comparison or artifact review was executed in this documentation turn.