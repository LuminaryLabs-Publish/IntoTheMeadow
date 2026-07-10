# Editor Proof Audit: Headless Editor GameHost Proof Readback

## Current editor bridge

`installIntoTheMeadowEditorBridge()` exposes these useful commands:

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

## Gap

The editor bridge proves command reachability, but not source-backed proof rows. Editor observations should read the same render, grass, gameplay, and objective proof rows as GameHost.

## Needed rows

```txt
editor capability row
runtime status proof row
render proof observation row
grass parity observation row
action/objective observation row
capture metadata row
viewport metadata row
error observation row
```

## Next safe gate

Add `headless-editor-proof-ledger` after render/grass/action rows exist, then extend `npm run check` to include the proof fixture scripts.
