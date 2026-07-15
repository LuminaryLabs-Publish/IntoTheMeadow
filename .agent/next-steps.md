# Next Steps

**Updated:** `2026-07-15T01-39-38-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `editor-mutation-visible-frame-settlement-authority-audited`

## Summary

Make editor mutation a settled command rather than a direct call into the live game. A command must either remain explicitly headless or produce one matching browser frame before capture, comparison, or the next mutation is admitted.

## Plan ledger

**Goal:** create the smallest reliable path from one editor command to one state revision, one render result, and one matching observable frame.

### Identity and capability parity

- [ ] Add immutable `EditorCommandId`, `HostGeneration`, `RuntimeRevision`, `RenderAttemptId`, and `FrameRevision`.
- [ ] Publish versioned browser and Node capability manifests.
- [ ] Define one argument and result schema for `runtime.tick`, `runtime.reset`, `renderer.capture`, and `renderer.compare`.
- [ ] Reject unsupported capability semantics instead of sharing one protocol label with divergent behavior.

### Scheduler and mutation admission

- [ ] Add a browser RAF lease that can be suspended, stepped, resumed, retired, and receipted.
- [ ] Admit exactly one mutation against an expected runtime revision.
- [ ] Prevent the autonomous RAF from adding a second tick before the editor command is visibly settled.
- [ ] Reject duplicate, stale, predecessor, superseded, and concurrent editor commands.

### Render and capture settlement

- [ ] Rebuild and validate the render plan after every visible mutation.
- [ ] Render the accepted state revision before returning a visible command result.
- [ ] Bind `renderer.capture` to an acknowledged `FrameRevision`.
- [ ] Reject captures whose canvas, renderer snapshot, render plan, and state revisions do not match.
- [ ] Publish `FirstVisibleEditorMutationFrameAck`.

### Reset convergence

- [ ] Reset game state, editor time, enhancer cache, renderer-dependent state, and capture lineage together.
- [ ] Define whether reset is headless or visible.
- [ ] Preserve the predecessor frame until the reset candidate renders successfully.
- [ ] Retire stale post-reset captures and comparisons.

### Fixtures

- [ ] Add browser tick-once, reset, capture-after-tick, capture-after-reset, and RAF-race fixtures.
- [ ] Add browser/Node capability and result-schema parity fixtures.
- [ ] Add stale-frame, duplicate-command, failed-render, and resume-policy fixtures.
- [ ] Capture source, built-output, and Pages frames tied to the same command and frame IDs.

## Required result

```txt
EditorMutationResult {
  editorCommandId
  capabilityManifestRevision
  hostGeneration
  mutationKind
  previousRuntimeRevision
  acceptedRuntimeRevision
  renderAttemptId
  renderPlanRevision
  rendererRevision
  submittedFrameRevision
  visibleFrameRevision
  captureId
  status
  receipts
}
```

## Preserved dependencies

Post-process execution, startup readiness, reset/replay, DSK capability admission, observation provenance, cache coherence, viewport authority, editor lifecycle, host retirement, workspace containment, provider parity, WebGL recovery, scheduling, progression, grass visibility, audio lifecycle, and save/migration remain separate bounded work.
