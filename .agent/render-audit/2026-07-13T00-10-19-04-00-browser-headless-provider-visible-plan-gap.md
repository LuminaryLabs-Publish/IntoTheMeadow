# Browser Headless Provider Visible Plan Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

The deployed browser frame is derived from the pinned external provider, while headless captures and deterministic tests are derived from the local fallback. The renderer contract normalizes both, but the visible frame does not expose which provider generation or plan fingerprint produced it.

## Plan ledger

**Goal:** make every rendered or captured plan attributable to one admitted provider source.

- [x] Trace browser provider to visible WebGL frame.
- [x] Trace headless fallback to SVG/JSON capture.
- [x] Record missing source lineage and cross-surface digest.
- [x] Preserve WebGL context recovery as a separate concern.
- [ ] Add visible provider-frame receipts later.

## Current gap

```txt
browser:
  external 0.1.0 -> enhanced plan -> WebGL frame

headless:
  local-source-plan-v1 -> enhanced plan -> mesh metrics/SVG

shared:
  no provider generation
  no provider fingerprint
  no comparable plan digest
  no visible/captured frame receipt
```

## Required render evidence

```txt
providerSourceId
providerGeneration
providerVersion
providerCommit
sourcePlanVersion
sourcePlanFingerprint
enhancedTopologyKey
renderSnapshotId
captureId
visibleFrameAckId
```

## Completion boundary

Matching descriptor counts are insufficient. A valid proof compares declared semantics and ties the browser frame and headless capture to explicit source profiles.
