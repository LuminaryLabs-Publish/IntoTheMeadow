# Known Gaps

**Updated:** `2026-07-16T15-38-27-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-failure-classification-bounded-diagnostic-projection-authority-audited`

## Summary

The bounded gap is browser failure classification, retention and safe projection. Boot, runtime and editor failure evidence is split across direct DOM mutation and an unbounded public error array.

## Intent

Record every missing identity, classification, storage, redaction, recovery and proof boundary required for safe failure handling.

## Checklist

- [x] Record all current failure sources and public projections.
- [x] Record missing taxonomy, health and retry semantics.
- [x] Record missing bounded retention and deduplication.
- [x] Record missing redaction, recovery and deployment proof.
- [ ] Implement and prove later.

## Classification gaps

```txt
ErrorId: absent
CorrelationId: absent
stable public failure codes: absent
failure source registry: absent
operation taxonomy: absent
severity policy: absent
host health state: absent
retryability policy: absent
terminality policy: absent
```

## Diagnostic storage gaps

```txt
internal/public record split: absent
explicit buffer capacity: absent
eviction policy: absent
duplicate grouping: absent
occurrence counters: absent
fatal-record retention rule: absent
bounded snapshot size: absent
record retirement result: absent
```

## Projection and redaction gaps

```txt
raw boot stack/message HUD projection: present
raw runtime fatal stack/message HUD projection: present
raw browser filename/location projection: present
raw capability action/message projection: present
public error-envelope schema: absent
stack/path/provider URL redaction: absent
raw argument redaction: absent
consistent GameHost/editor health projection: absent
safe user action guidance: absent
FirstSafeFailureFrameAck: absent
```

## Recovery gaps

```txt
fault generation: absent
recovery command: absent
recovery strategy registry: absent
expected-generation admission: absent
retry/reload/replace/terminal classification: absent
predecessor preservation result: absent
recovered-frame acknowledgement: absent
```

## Proof gaps

```txt
provider import failure fixture: absent
render-plan rejection fixture: absent
renderer exception fixture: absent
browser error/rejection fixture: absent
editor capability failure fixture: absent
redaction leakage fixture: absent
duplicate storm fixture: absent
capacity/eviction fixture: absent
recovery fixture: absent
source/artifact/Pages envelope parity: absent
```

## Preserved unresolved gaps

```txt
authored content graph integrity
static module release/cache coherence
runtime renderer identity
accessible semantic projection
audio event projection
shader capability admission
editor command settlement
post-process execution
browser startup readiness
runtime reset and replay
DSK dependency admission
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
web-host retirement
workspace containment
external provider parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
atomic save and migration
```

## Completion boundary

Failure handling is not proven until source, artifact and Pages classify the same injected failures, public surfaces contain only accepted redacted envelopes, internal storage remains bounded under storms, recovery rejects stale generations and the visible failure state acknowledges `FirstSafeFailureFrameAck`.