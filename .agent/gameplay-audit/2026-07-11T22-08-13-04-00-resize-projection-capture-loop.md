# Resize, Projection and Capture Loop

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Goal

Trace how a browser viewport change reaches the visible meadow, camera projection, diagnostics and editor capture.

## Current loop

```txt
browser layout or zoom changes
  -> canvas CSS width and height change
  -> no explicit resize command is emitted
  -> next RAF advances game state first
  -> render plan is enhanced
  -> renderer.render calls resize
  -> live DPR and CSS dimensions are sampled
  -> canvas drawing-buffer dimensions mutate
  -> GL viewport and camera projection use requested values
  -> outline pass draws
  -> color pass draws
  -> renderer snapshot publishes without surface dimensions
  -> GameHost stores the snapshot
  -> later editor viewport or capture commands read current browser values
```

## Gameplay effect

The game is currently a static exploration shell, but viewport changes still affect player-facing composition:

```txt
camera aspect changes
  -> horizontal and vertical framing change
  -> path, focal tree and grass occupy different screen regions
  -> objective and interaction targets would be projected through the new surface
  -> capture and diagnostics cannot prove which surface revision was shown
```

Future movement, picking and objective UI will depend on the same committed surface. A resize that is not revisioned can make screen-space interaction and visible-frame evidence disagree even if the world state is unchanged.

## Current absence

```txt
no surface command ID
no resize generation
no surface revision
no paused/hidden surface policy
no pixel-budget result
no fallback result
no first frame on new surface receipt
no capture freshness requirement
no browser/headless surface equivalence rule
```

## Required gameplay-safe loop

```txt
viewport observation
  -> admitted ResizeCommand
  -> bounded RenderSurfacePlan
  -> actual drawing-buffer readback
  -> committed surface revision
  -> camera projection derived from committed dimensions
  -> render one frame
  -> publish visible-frame surface acknowledgement
  -> permit interaction projection and capture for that revision
```

## Required assertions

```txt
world state does not advance merely because resize work retries
camera aspect matches actual committed drawing-buffer dimensions
rapid resize does not publish intermediate stale surfaces as ready
hidden/zero-size states preserve or explicitly suspend the prior surface
future input/picking commands cite the same surface revision
capture is rejected or marked stale until the new surface has a visible frame
```
