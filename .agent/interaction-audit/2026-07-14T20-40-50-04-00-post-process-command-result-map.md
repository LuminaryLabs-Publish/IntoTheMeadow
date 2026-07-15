# Interaction Audit: Post-Process Command and Result Map

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

There is no command/result boundary between post-process intent and renderer execution. The renderer receives the whole plan and returns a generic snapshot.

## Plan ledger

**Goal:** define typed interactions for pass-graph admission, execution, fallback, failure, and frame acknowledgement.

- [x] Record current implicit interaction.
- [x] Define required commands and results.
- [x] Define stale and failure handling.
- [ ] Implement the contracts later.

## Current interaction

```txt
renderer.render(renderPlan)
  -> validates geometry contract
  -> draws inline frame
  -> returns renderer snapshot
```

## Required interaction map

```txt
PostProcessFrameCommand
  -> PostProcessGraphValidationResult
  -> RendererCapabilityAdmissionResult
  -> PostProcessProfileAdmissionResult
  -> RenderTargetPreparationResult
  -> PostProcessPassExecutionResult[]
  -> PostProcessFrameResult
  -> FirstVisiblePostProcessFrameAck
```

## Rejection classes

```txt
invalid graph
unsupported mandatory pass
resource allocation failure
stale renderer generation
stale viewport generation
pass execution failure
composite failure
superseded frame
visible-frame timeout
```

## Idempotency and ordering

Every command must bind `RenderAttemptId`, source-plan fingerprint, enhanced-plan fingerprint, renderer generation, viewport generation, and profile revision. Duplicate or stale results must not replace an accepted frame.

## Boundary

No browser input or runtime API changed.