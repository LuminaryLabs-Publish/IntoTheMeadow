# Gameplay Audit: Resize, Render and Capture Loop

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

IntoTheMeadow is currently a non-interactive environment proof, but viewport changes still alter the player's visible world. The game tick, render-plan time, canvas size, camera aspect, WebGL viewport, diagnostics and editor capture advance through separate ownership paths with no shared transition result.

## Plan ledger

**Goal:** describe how a browser layout transition reaches the visible meadow and where gameplay-facing observation can become incoherent.

- [x] Trace game tick to render plan.
- [x] Trace render plan to viewport and camera.
- [x] Trace diagnostics and editor capture.
- [x] Record stopped/fatal behavior.
- [x] Preserve playable progression as separate future work.
- [ ] Prove viewport transitions in a real browser later.

## Active loop

```txt
RAF
  -> increment immutable game frame
  -> attach wall-clock render time
  -> enhance static meadow render plan
  -> renderer samples layout and DPR
  -> renderer resizes backing store
  -> camera aspect follows backing dimensions
  -> meadow draws
  -> renderer snapshot updates
  -> optional debug HUD reads game/plan/render data
  -> successor RAF requested
```

## Observation loop

```txt
editor browser.getViewport
  -> reads browser layout and canvas dimensions

editor renderer.getSnapshot
  -> reads last successful renderer metadata

editor renderer.capture
  -> encodes current canvas pixels
  -> attaches last renderer snapshot
```

These observations can occur between layout change, backing-store mutation, failed draw, successful draw and snapshot replacement.

## Gameplay-facing consequences

```txt
field of view distortion
  backing aspect and intended CSS aspect can disagree during a mixed transition

visible interruption
  assigning canvas width/height clears the surface before successor drawing succeeds

capture ambiguity
  an editor screenshot can be labeled completed without a matching viewport/frame revision

stopped-host staleness
  layout changes are not adopted while the RAF loop is stopped

resource shock
  a large backing allocation can consume the frame budget before meadow presentation resumes
```

## Bounded ownership

Viewport authority should not own future player movement, story or objective state. It should provide one committed surface revision that those domains and the camera can consume.

```txt
future input/movement
  -> simulation state
  -> render plan
  -> committed viewport revision
  -> camera projection
  -> visible frame
```

## Required gameplay-visible result

```txt
ViewportCommitResult
  -> frame required
  -> renderer consumes exact revision
  -> debug HUD and editor readback expose exact revision
  -> FirstViewportFrameAck confirms the meadow was presented
```

## Retained gameplay priorities

```txt
player and input DSK implementation
camera rig ownership
interaction targets
story beats and objectives
audio lifecycle
save and migration
independent replay
camera-bound grass visibility and LOD
```

## Validation boundary

No gameplay behavior changed. No browser resize, camera-aspect comparison, screenshot comparison, stopped-host transition, or performance measurement was executed.