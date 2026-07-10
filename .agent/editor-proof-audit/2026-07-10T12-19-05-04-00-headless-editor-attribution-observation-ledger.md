# Editor Proof Audit: Headless Editor Attribution Observation Ledger

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current editor bridge

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

## Current proof gap

The bridge proves access to runtime, scene, renderer, capture, viewport, and errors. It does not yet prove source-owned render, grass, gameplay, objective, or action attribution rows.

## Required observation row

```txt
HeadlessEditorProofObservationRow {
  commandId
  action
  status
  observedProofRows
  missingProofRows
  legacyShapePreserved
  reason
}
```

## Recommendation

Keep the bridge command surface stable. Add proof observation rows to what commands can read so editor smokes assert source-backed proof instead of only reachability.
