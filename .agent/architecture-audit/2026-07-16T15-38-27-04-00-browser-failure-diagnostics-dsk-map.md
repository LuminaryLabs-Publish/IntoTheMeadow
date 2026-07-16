# Architecture Audit: Browser Failure Diagnostics DSK Map

**Timestamp:** `2026-07-16T15-38-27-04-00`  
**Status:** `browser-failure-classification-bounded-diagnostic-projection-authority-audited`

## Existing ownership

```txt
boot-game.js
  -> browser startup rejection projection

web-host-dsk / web-host.js
  -> provider loading
  -> game and renderer composition
  -> RAF lifecycle
  -> runtime fatal projection

meadow-diagnostics-dsk
  -> DSK and render-plan validation summary

editor bridge
  -> global error and rejection listeners
  -> capability invocation error capture
  -> browser.getErrors and snapshot projection

GameHost
  -> global runtime, snapshot and diagnostics access
```

## Ownership problem

The failure paths do not converge through one authority. Boot and runtime failures write raw stack/message text directly to the visible HUD. The editor bridge separately stores raw browser and capability records in an unbounded array. None of these surfaces shares stable codes, health state, retryability, correlation, redaction, retention or recovery semantics.

## Required parent domain

`meadow-browser-failure-classification-bounded-diagnostic-projection-authority-domain`

## Required DSK boundary

```txt
failure evidence adapters
  -> startup rejection adapter
  -> frame/render exception adapter
  -> browser error adapter
  -> unhandled rejection adapter
  -> editor capability exception adapter

failure authority
  -> source and operation classification
  -> code, severity and retryability policy
  -> correlation and deduplication
  -> internal diagnostic record
  -> bounded retention
  -> redacted public envelope
  -> host health state

projection adapters
  -> boot loading surface
  -> fatal HUD surface
  -> editor bridge result
  -> GameHost diagnostics
  -> browser/deployment fixtures
```

## Command/result map

```txt
BrowserFailureAdmissionCommand
  -> BrowserFailureAdmissionResult
  -> HostHealthTransitionResult
  -> PublicFailureProjectionResult
  -> FirstSafeFailureFrameAck

FailureRecoveryCommand
  -> FailureRecoveryResult
  -> replacement runtime/renderer/editor generation or terminal refusal
```

## Planned surfaces

```txt
meadow-browser-failure-classification-bounded-diagnostic-projection-authority-domain
failure-source-registry-kit
failure-operation-classification-kit
failure-code-taxonomy-kit
failure-severity-policy-kit
failure-retryability-policy-kit
failure-correlation-id-kit
public-failure-envelope-kit
internal-diagnostic-record-kit
diagnostic-redaction-kit
bounded-error-buffer-kit
failure-deduplication-kit
host-health-state-kit
boot-failure-projection-kit
runtime-fatal-projection-kit
editor-capability-failure-projection-kit
browser-global-failure-projection-kit
failure-recovery-command-kit
browser-failure-fixture-kit
first-safe-failure-frame-ack-kit
```

## Preserved domains

All 44 existing kit surfaces and offered services remain unchanged. Content-graph integrity, release/cache coherence, renderer identity, accessibility, audio, editor mutation, startup, reset/replay, viewport, WebGL recovery, frame scheduling, progression and grass visibility remain separate authorities.