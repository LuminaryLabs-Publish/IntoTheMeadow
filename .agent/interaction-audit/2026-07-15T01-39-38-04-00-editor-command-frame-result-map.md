# Interaction Audit: Editor Command and Frame Result Map

**Timestamp:** `2026-07-15T01-39-38-04-00`

## Summary

Browser editor commands currently return generic capability success or failure. They do not return command identity, accepted runtime revision, render attempt, frame identity, capture binding, duplicate classification, or stale-work rejection.

## Plan ledger

**Goal:** define a complete command/result surface for editor mutation, capture, comparison, rejection, and retirement.

- [x] Inventory browser mutation and observation capabilities.
- [x] Compare browser and Node command shapes.
- [x] Identify missing result identities and statuses.
- [x] Define command, frame and capture result boundaries.
- [ ] Implement the command protocol later.

## Command map

```txt
runtime.tick
  command: EditorMutationCommand(kind=tick)
  result: EditorMutationResult

runtime.reset
  command: EditorMutationCommand(kind=reset)
  result: EditorMutationResult

renderer.capture
  command: EditorCaptureCommand(expectedVisibleFrameRevision)
  result: EditorCaptureResult

renderer.compare
  command: EditorCompareCommand(leftCaptureId, rightCaptureId)
  result: EditorCompareResult

host pause/resume/retire
  command: EditorHostLifecycleCommand
  result: EditorHostLifecycleResult
```

## Required statuses

```txt
accepted
completed-headless
completed-visible
rejected-stale
rejected-duplicate
rejected-concurrent
rejected-capability-mismatch
failed-mutation
failed-render
failed-capture
retired
superseded
```

## Required mutation result

```txt
EditorMutationResult {
  editorCommandId
  commandSurface
  capabilityManifestRevision
  hostGeneration
  mutationKind
  previousRuntimeRevision
  acceptedRuntimeRevision
  schedulerLeaseId
  renderAttemptId
  renderPlanRevision
  rendererRevision
  visibleFrameRevision
  status
  receipts
  errors
}
```

## Admission rules

- A command must cite the expected host generation and runtime revision.
- A visible mutation must acquire the RAF lease before changing state.
- A headless mutation must explicitly disclaim a visible-frame result.
- Capture must cite an acknowledged visible frame.
- Comparison must cite immutable captures, not ambient `lastCapture` state alone.
- Duplicate command IDs return the existing terminal result.
- Retired, stale, or superseded work cannot mutate public state.

## Boundary

No editor command API changed. This file defines the missing result contract only.
