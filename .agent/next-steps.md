# Next Steps

**Updated:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-editor-capability-admission-authority-central-reconciled`

## Summary

Implement editor capability admission together with the immediately preceding web-host lifecycle authority. Mutating editor commands should not remain a second unsequenced gameplay driver, and host stop/fatal should not leave those commands active.

## Plan ledger

**Goal:** introduce one small authority that classifies capabilities, binds mutations to scheduler/state generations, retires the bridge with the host, and proves the first matching frame.

### Environment and capability identity

- [ ] Add `EditorEnvironmentId` and `EditorEnvironmentGeneration`.
- [ ] Add capability-registry and capability-policy revisions.
- [ ] Classify each capability as observation, mutation, capture, lifecycle, or unavailable.
- [ ] Remove raw `game` mutation from the supported public GameHost contract.
- [ ] Allocate one command ID and duplicate policy per invocation.

### Mutation admission

- [ ] Add `EditorCapabilityCommand` and `EditorCapabilityResult`.
- [ ] Require expected state and render revisions for mutation commands.
- [ ] Validate `dt`, `time`, reset options, and bounded argument payloads.
- [ ] Acquire one exclusive scheduler lease before tick/reset.
- [ ] Execute mutation only at an admitted simulation boundary.
- [ ] Reject stale, duplicate, busy, invalid, unavailable, or retired commands with zero mutation.
- [ ] Publish state revision before/after and lease disposition.

### Host lifecycle integration

- [ ] Implement the preceding `web-host-lifecycle-retirement-authority-domain`.
- [ ] Separate pause/resume from terminal retirement.
- [ ] Retain and cancel the active RAF ID.
- [ ] Disable mutation capabilities while paused unless explicitly permitted.
- [ ] Compose `editorBridge.dispose()` and renderer disposal into terminal retirement.
- [ ] Revoke `GameHost` and `NexusEditorEnvironment` by generation.
- [ ] Retire predecessor listeners before bridge replacement.

### Render and capture correlation

- [ ] Add state, render-plan, render submission, and canvas-frame revisions.
- [ ] Mark accepted user-visible editor mutations as requiring a render refresh.
- [ ] Publish `EditorVisibleFrameAck` for the first matching frame.
- [ ] Make correlated capture wait, return not-ready, or explicitly identify predecessor pixels.
- [ ] Include command/state/render/frame identities in capture evidence.

### Error and observation policy

- [ ] Bound error entries and total retained bytes.
- [ ] Scope errors to environment generation.
- [ ] Add acknowledgement cursor and overflow result.
- [ ] Redact or bound message, stack, filename, and payload fields.
- [ ] Define retention across pause, resume, replacement, and retirement.

### Proof

- [ ] Observation capability performs zero mutation.
- [ ] Tick commits exactly once under RAF concurrency.
- [ ] Reset commits exactly once and produces a matching frame.
- [ ] Duplicate and stale commands are suppressed.
- [ ] Stop/fatal reject later mutations.
- [ ] Bridge replacement retires predecessor listeners.
- [ ] Capture correlation distinguishes predecessor and successor frames.
- [ ] Error journal respects count and byte limits.
- [ ] `npm run check`, browser source smoke, production build, built-output smoke, and Pages smoke.

## Required result

```txt
EditorCapabilityResult {
  commandId
  environmentId
  environmentGeneration
  capabilityId
  capabilityClass
  status
  reason
  capabilityRegistryRevision
  policyRevision
  schedulerGeneration
  stateRevisionBefore
  stateRevisionAfter
  renderRevisionBefore
  renderRevisionAfter
  visibleFrameRequired
  visibleFrameAckId?
  observationId
}
```

## Dependency order

```txt
web-host lifecycle generation and RAF ownership
  -> editor environment generation
  -> capability classification and policy
  -> scheduler mutation lease
  -> state transition result
  -> render correlation and visible frame
  -> capture and bounded observations
```

## Preserved dependencies

Workspace containment, provider parity, WebGL recovery, DSK runtime consumption, playable progression, grass visibility, audio lifecycle, save/migration, and replay remain separate bounded work.
