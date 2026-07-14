# Interaction Audit: Browser Observation Command and Result Map

**Timestamp:** `2026-07-13T22-40-52-04-00`

## Summary

`editor:browser` currently throws or prints success. It has no stable command identity, participant results, degraded status, stale-attempt classification or cleanup outcome.

## Plan ledger

**Goal:** make each operator request return one typed result that explains server, browser, page, frame, artifacts and retirement.

- [x] Map current command admission.
- [x] Map current success and throw paths.
- [x] Identify participant results.
- [x] Define terminal statuses.
- [ ] Implement the result contract later.

## Current map

```txt
npm run editor:browser
  -> process success text
  -> or thrown Error
```

## Required map

```txt
BrowserObservationCommand
  -> CommandAdmissionResult
  -> ServerAdmissionResult
  -> BrowserSessionAdmissionResult
  -> RouteReadinessResult
  -> RendererFrameAdmissionResult
  -> ArtifactCaptureResult[]
  -> ArtifactPromotionResult
  -> ProcessRetirementResult
  -> BrowserObservationResult
```

## Required result

```txt
BrowserObservationResult {
  commandId
  attemptId
  status
  reason
  repositoryRevision
  providerFingerprint
  browserFingerprint
  serverGeneration
  browserSessionGeneration
  pageGeneration
  rendererFrameId
  artifactManifestId
  artifactHashes
  serverReceipt
  browserReceipt
  pageReceipt
  frameReceipt
  retirementReceipt
  warnings
  errors
}
```

## Terminal statuses

```txt
Completed
Degraded
Unavailable
Rejected
TimedOut
Failed
Cancelled
Stale
Superseded
Partial
RetirementFailed
```

## Boundary

No command-line behavior changed.