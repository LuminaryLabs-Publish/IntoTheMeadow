# Render Audit: Pre-Ready Public Frame Gap

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

The loading indicator is hidden and public render readback is exposed before the first enhanced render plan passes validation and before the renderer submits a visible frame.

## Plan ledger

**Goal:** bind visible readiness to one validated renderer frame rather than host construction.

- [x] Trace loading projection.
- [x] Trace render-plan validation.
- [x] Trace renderer snapshot and canvas capture publication.
- [x] Trace first-frame failure handling.
- [ ] Implement first-frame admission and proof later.

## Current sequence

```txt
renderer created
  -> GameHost exposes renderer snapshot
  -> editor bridge exposes renderer.capture
  -> loading hidden
  -> RAF scheduled
  -> plan enhanced and validated
  -> renderer.render submits frame
```

Before the final two steps, editor capture can return the canvas dimensions and a data URL even when no accepted meadow frame exists. `getRenderPlan()` can also synthesize an enhanced plan independently of a submitted frame.

## Missing frame identity

```txt
BootAttemptId
RenderCandidateGeneration
RenderPlanFingerprint
RendererResourceGeneration
SubmittedFrameId
VisibleFrameId
BrowserStartupRevision
FirstVisibleMeadowFrameAck
```

## Required rule

The browser may publish Ready, hide loading, expose capture as authoritative, and adopt public render snapshots only after one frame cites the accepted startup revision and validated plan fingerprint.

## Failure rule

A failed first frame must remain a startup failure, not an active host with a stopped loop. Candidate renderer resources, public snapshots, capture authority, and globals must be retired or never published.

## Boundary

No browser frame was executed or captured during this documentation pass.