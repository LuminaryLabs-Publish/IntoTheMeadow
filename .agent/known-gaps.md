# Known Gaps

**Updated:** `2026-07-14T15-38-28-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-startup-readiness-first-frame-authority-audited`

## Summary

The current bounded gap is browser startup truth. Construction completion is treated as readiness before one frame validates, while first-frame failure cannot revoke already published public capabilities or produce complete rollback evidence.

## Plan ledger

**Goal:** record every missing identity, lifecycle rule, adoption barrier, and proof required for trustworthy browser startup.

- [x] Record boot identity and provider-admission gaps.
- [x] Record public publication and loading-state gaps.
- [x] Record frame, failure, rollback, and stale-attempt gaps.
- [x] Record validation gaps and preserve predecessor audits.
- [ ] Implement and prove the authority later.

## Identity gaps

```txt
BrowserStartupCommand schema: absent
BootAttemptId: absent
DocumentGeneration: absent
StartupPolicyRevision: absent
provider fingerprint: absent
candidate participant manifest: absent
accepted StartupRevision: absent
```

## Publication gaps

```txt
private GameHost candidate: absent
private editor bridge candidate: absent
atomic public-global adoption: absent
loading-to-frame correlation: absent
pre-ready mutation policy: absent
pre-ready capture policy: absent
Ready state and reason: absent
```

## Frame gaps

```txt
initial tick revision: absent
render-plan fingerprint: absent
renderer resource generation: absent
submitted first-frame ID: absent
visible first-frame ID: absent
FirstVisibleMeadowFrameAck: absent
```

## Failure and retirement gaps

```txt
typed BrowserStartupFailureResult: absent
failed stage identity: absent
idempotent failure handling: absent
stale or superseded completion rejection: absent
editor listener retirement receipt: absent
renderer resource retirement receipt: absent
enhancer invalidation receipt: absent
public-global revocation receipt: absent
candidate RAF retirement receipt: absent
complete rollback receipt: absent
```

## Validation gaps

```txt
provider import/export failure fixture: absent
DSK validation failure fixture: absent
first plan-validation failure fixture: absent
first renderer-submission failure fixture: absent
early tick/reset/capture fixture: absent
loading readiness fixture: absent
cancel/retry/supersession fixture: absent
listener/global/GPU retirement fixture: absent
first visible frame fixture: absent
source/build/Pages parity fixture: absent
```

## Preserved unresolved gaps

```txt
runtime reset and replay authority
DSK executable capability composition
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability admission
web-host retirement
workspace containment and atomic artifacts
provider-source parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
```

## Completion boundary

Startup is not proven until one admitted boot attempt privately prepares every participant, validates one exact frame, atomically publishes Ready capabilities, and completely retires every failed or superseded candidate.