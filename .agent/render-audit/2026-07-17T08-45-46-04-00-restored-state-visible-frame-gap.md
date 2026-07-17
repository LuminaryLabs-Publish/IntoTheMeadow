# Render Audit: Restored State and Visible Frame Gap

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer continuously presents the current in-memory plan, but no restore transaction exists to bind persisted state, rebuilt render inputs and the first matching canvas frame.

## Intent

Require a restored-state generation to reach the render surface before restore completion is reported.

## Current visible path

```txt
RAF
  -> game.tick
  -> game.getRenderPlan
  -> planEnhancer.enhance
  -> renderer.render
  -> canvas
```

## Missing restored-state path

```txt
slot read: absent
save migration result: absent
restored runtime revision: absent
render-plan rebuild/invalidation receipt: absent
matching renderer frame identity: absent
FirstRestoredStateFrameAck: absent
```

## Required convergence

```txt
RestoreApplyResult
  -> replace accepted runtime state exactly once
  -> invalidate state-dependent render caches when required
  -> build the matching render plan
  -> commit one renderer frame
  -> publish FirstRestoredStateFrameAck
```

The acknowledgement should bind save slot, save digest, schema version, migration result, runtime generation, state revision, plan topology key, viewport revision and renderer frame.

## Risk boundary

The current product has no implemented persistence path, so no stale restored frame was reproduced. This audit records the proof required before persistence can be considered visibly complete.