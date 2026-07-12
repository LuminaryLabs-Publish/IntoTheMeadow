# Render Surface Resolution Fixture Gate

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Current proof

The current browser observation uses one configuration:

```txt
window size: 1440 x 900
forced device scale factor: 1
virtual time budget: 9000 ms
proof: title, editor marker, gpu marker and screenshot byte count
```

It does not test resize, DPR variation, capability limits, drawing-buffer readback, fallback, stale resize rejection or capture/frame surface correlation.

## Required static proof

```txt
render-surface state, command and result schemas exist
renderer snapshot exposes committed dimensions and surface revision
browser viewport and capture expose surface/frame freshness
hard-coded resize mutation is routed through the authority
pixel-budget and capability policies are declared
```

## Required DOM-free fixtures

```txt
npm run fixture:render-resolution-policy
npm run fixture:render-surface-capabilities
npm run fixture:render-surface-budget-fallback
npm run fixture:render-surface-stale-rejection
npm run fixture:render-surface-allocation-failure
```

Assertions:

```txt
finite dimensions and DPR normalize deterministically
requested pixels never exceed the admitted budget
capability limits select the documented fallback or explicit failure
newer resize commands supersede older work
stale session, context generation and surface revision reject
actual drawing-buffer readback governs the committed result
failed candidates do not publish a new surface revision
```

## Required browser fixtures

```txt
npm run smoke:render-surface-resize
npm run smoke:render-surface-dpr
npm run smoke:render-surface-hidden-zero
npm run smoke:render-surface-capture-correlation
npm run smoke:render-surface-context-loss
```

Browser matrix:

```txt
320 x 240 at DPR 1
1440 x 900 at DPR 1
1920 x 1080 at DPR 1.25
2560 x 1440 at DPR 2
3840 x 2160 at requested DPR 2 and 3
rapid resize sequence
portrait / landscape orientation sequence
hidden or zero-layout transition
context loss during resize
```

## Required Pages proof

```txt
serve the deployed route
observe initial committed surface revision
resize the viewport
wait for the next visible-frame surface acknowledgement
capture the canvas
assert viewport, renderer, capture and frame cite the same revision
assert actual dimensions remain within policy and WebGL limits
```

## Deployment blocker

Do not claim responsive rendering because CSS fills the window or because one 1440 by 900 screenshot exists. Deployment proof requires bounded actual drawing-buffer dimensions and one correlated surface revision across projection, renderer state, capture and visible frame.

## Validation status

```txt
runtime source changed: no
package scripts changed: no
existing checks run: no
render-surface fixtures available: no
browser resize smoke run: no
Pages surface smoke run: no
```
