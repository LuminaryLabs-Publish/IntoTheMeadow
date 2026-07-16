# Next Steps

**Updated:** `2026-07-16T15-38-27-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-failure-classification-bounded-diagnostic-projection-authority-audited`

## Summary

Converge boot, frame/render, browser-global and editor capability failures through one typed authority. Keep raw evidence bounded and internal; publish stable redacted envelopes with health, retry and correlation semantics.

## Intent

Create the smallest reliable path from an observed failure to one accepted public result, one bounded internal record and an explicit recovery decision.

## Checklist

### Classification and identity

- [ ] Define `ErrorId`, `CorrelationId`, stable public codes and source/operation registries.
- [ ] Define severity, health-state, retryability and terminality policies.
- [ ] Classify provider, composition, render-plan, renderer, browser and editor failures.
- [ ] Reject command/result evidence from retired runtime, renderer or editor generations.

### Internal evidence

- [ ] Define an internal diagnostic record separate from public output.
- [ ] Set explicit buffer capacity, eviction and fatal-record retention rules.
- [ ] Collapse exact duplicate storms while preserving counts and first/last timestamps.
- [ ] Bound snapshot payload size.

### Public projection

- [ ] Define a redacted public failure envelope.
- [ ] Replace raw boot and fatal HUD text with accepted safe messages.
- [ ] Replace raw editor capability error arrays with stable public results.
- [ ] Publish consistent health state through GameHost and editor diagnostics.
- [ ] Prevent stack, absolute path, provider URL and raw argument leakage.

### Recovery

- [ ] Define `FailureRecoveryCommand` and `FailureRecoveryResult`.
- [ ] Distinguish retry, reload, provider replacement and terminal outcomes.
- [ ] Require expected runtime/renderer/editor revisions.
- [ ] Preserve predecessor evidence when recovery fails.

### Evidence

- [ ] Add boot/provider/render/browser/editor failure-injection fixtures.
- [ ] Add redaction and path-leakage fixtures.
- [ ] Add duplicate-storm, capacity and eviction fixtures.
- [ ] Add stale-generation and recovery fixtures.
- [ ] Compare source, artifact and Pages public envelopes.
- [ ] Publish `FirstSafeFailureFrameAck`.

## Required result

```txt
BrowserFailureAdmissionResult {
  errorId
  correlationId
  publicCode
  source
  operation
  severity
  healthState
  retryability
  duplicateOf
  internalRecordRevision
  publicEnvelope
  status
}
```

## Preserved dependencies

Content-graph integrity, release/cache coherence, renderer identity, accessibility, audio, shader admission, editor mutation settlement, post-processing, startup readiness, reset/replay, DSK admission, observation provenance, cache coherence, viewport, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.