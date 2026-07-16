# Current Audit: Browser Failure Classification and Bounded Diagnostic Projection

**Updated:** `2026-07-16T15-38-27-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-failure-classification-bounded-diagnostic-projection-authority-audited`  
**Immediate predecessor:** `authored-content-graph-referential-integrity-authority-central-reconciled`

## Summary

Boot rejection, runtime frame failure and editor/global browser failure evidence are not admitted through one authority. Raw stack, message, filename and location details can reach visible or public diagnostic surfaces, and the editor error array has no explicit capacity, retention or deduplication policy.

## Intent

Publish one stable, safe and actionable failure result while preserving bounded internal evidence for debugging.

## Checklist

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Inspect boot, host, GameHost, editor bridge, diagnostics and smoke surfaces.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped browser-failure audit family.
- [x] Change documentation only on `main`.
- [ ] Implement and prove the authority later.

## Main finding

```txt
boot raw stack/message HUD projection: present
runtime fatal raw stack/message HUD projection: present
browser filename/line/column capture: present
capability raw action/message capture: present
public complete error-array projection: present
explicit error-buffer capacity: absent

stable public code: absent
severity and host health state: absent
retryability and terminality: absent
error/correlation identity: absent
internal/public diagnostic split: absent
redaction policy: absent
deduplication and eviction policy: absent
recovery command/result: absent
FirstSafeFailureFrameAck: absent
```

## Current validation gap

Existing smoke suites exercise static composition, DSK registration, render plans, deterministic scene output and editor capabilities. They do not inject browser/provider/render failures or prove error classification, redaction, bounded retention, recovery and source/build/Pages parity.

## Required parent domain

`meadow-browser-failure-classification-bounded-diagnostic-projection-authority-domain`

## Required transaction

```txt
BrowserFailureAdmissionCommand
  -> classify source, operation, code, severity and retryability
  -> allocate ErrorId and CorrelationId
  -> retain one bounded internal record
  -> publish one redacted public envelope
  -> deduplicate repeats and settle host health
  -> publish BrowserFailureAdmissionResult
  -> project safe HUD/editor diagnostics
  -> acknowledge FirstSafeFailureFrameAck

FailureRecoveryCommand
  -> validate expected generations and retry policy
  -> replace affected resources or reject explicitly
  -> publish FailureRecoveryResult
```

## Boundary

Documentation only. No runtime, renderer, editor, package, test, workflow or deployment behavior changed.