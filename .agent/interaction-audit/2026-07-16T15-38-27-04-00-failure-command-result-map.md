# Interaction Audit: Failure Command and Result Map

**Timestamp:** `2026-07-16T15-38-27-04-00`

## Evidence sources

```txt
boot promise rejection
render-plan contract exception
renderer exception
RAF callback exception
window error event
window unhandledrejection event
editor capability exception
```

## Current outputs

```txt
boot/runtime failure -> direct DOM text mutation
browser failure -> append raw record
capability failure -> return { ok:false, status:"failed", action, errors:[raw entry] }
unknown capability -> return { ok:false, status:"unavailable", action }
```

## Required commands

```txt
BrowserFailureAdmissionCommand {
  source
  operation
  releaseRevision
  routeRevision
  runtimeRevision
  rendererRevision
  editorRevision
  capabilityId?
  originalCause
  observedAt
}

FailureProjectionCommand {
  errorId
  correlationId
  documentRevision
  presentationRevision
}

FailureRecoveryCommand {
  errorId
  expectedRuntimeRevision
  expectedRendererRevision
  requestedStrategy
}
```

## Required results

```txt
BrowserFailureAdmissionResult {
  errorId
  correlationId
  publicCode
  severity
  retryability
  healthState
  duplicateOf?
  internalRecordRevision
  publicEnvelope
  status
}

FailureRecoveryResult {
  errorId
  strategy
  predecessorRevision
  successorRevision?
  status
  reason
}
```

## Settlement rules

- Raw causes, stacks, module URLs, filenames and locations remain internal by default.
- Exact duplicates reuse or reference the accepted result.
- The bounded store evicts by explicit policy and preserves aggregate counters.
- A recovery attempt cannot execute against retired generations.
- HUD, GameHost and editor surfaces project the same accepted public code and health state.
- A safe visible result is acknowledged by `FirstSafeFailureFrameAck`.