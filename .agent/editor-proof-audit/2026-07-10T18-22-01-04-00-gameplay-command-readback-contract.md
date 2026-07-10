# Gameplay Command Readback Contract

**Timestamp:** `2026-07-10T18-22-01-04-00`

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

The bridge can advance time and read state, but it cannot issue `path-progress` or `inspect`, query target preflight, read command results, or prove objective completion.

## Required additive capabilities

```txt
gameplay.dispatch
gameplay.getTargets
gameplay.preflight
gameplay.getProgression
gameplay.getJournal
gameplay.getObservation
gameplay.replay
```

## Command response contract

```txt
{
  ok,
  status: completed | rejected | no-op | failed,
  action: gameplay.dispatch,
  data: {
    result,
    state,
    progression,
    observation
  }
}
```

## Proof rule

A completed editor invocation is not sufficient. The response must include the gameplay result status/reason and the committed state fingerprint. Browser and editor commands must use the same dispatcher and produce equivalent rows.

## Capture rule

`renderer.capture` should add the latest gameplay commit id and state fingerprint to its metadata without embedding mutable game objects or changing the image payload.

## Fixture gate

A headless/editor fixture must dispatch the two authored actions, inspect the journal, verify both objectives, capture the readback, reset, replay the command list, and compare fingerprints.